from concurrent.futures import ThreadPoolExecutor, as_completed
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from conexion_bq import cliente

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

TABLA = "mapaibague.PRESENTACION.PRESENTACION"

def escape(val):
    return val.replace("'", "\\'")

def where_clause(tipo, tenencia, caja):
    conds = []
    if tipo: conds.append(f"Tipo_Infraestructura = '{escape(tipo)}'")
    if tenencia: conds.append(f"Tenencia_Infraestructura = '{escape(tenencia)}'")
    if caja: conds.append(f"Caja_de_Compensacion = '{escape(caja)}'")
    return ("WHERE " + " AND ".join(conds)) if conds else ""

def run(sql):
    return [dict(row) for row in cliente.query(sql).result(timeout=60)]

@app.get("/api/datos")
def get_datos(limit: int = 500, offset: int = 0, tipo: str = None, tenencia: str = None, caja: str = None):
    return run(f"SELECT * FROM `{TABLA}` {where_clause(tipo, tenencia, caja)} LIMIT {limit} OFFSET {offset}")

@app.get("/api/resumen")
def get_resumen(tipo: str = None, tenencia: str = None, caja: str = None):
    w = where_clause(tipo, tenencia, caja)
    queries = {
        "stats": f"SELECT COUNT(*) as total, SUM(Capacidad_Infraestructura) as cap_total, COUNT(DISTINCT Tipo_Infraestructura) as tipos, COUNT(DISTINCT Codigo_Municipio) as municipios FROM `{TABLA}` {w}",
        "por_tipo": f"SELECT Tipo_Infraestructura, COUNT(*) as count FROM `{TABLA}` {w} GROUP BY Tipo_Infraestructura ORDER BY count DESC LIMIT 15",
        "por_tenencia": f"SELECT Tenencia_Infraestructura, COUNT(*) as count FROM `{TABLA}` {w} GROUP BY Tenencia_Infraestructura ORDER BY count DESC",
        "capacidad_por_tipo": f"SELECT Tipo_Infraestructura, SUM(Capacidad_Infraestructura) as total_capacidad FROM `{TABLA}` {w} GROUP BY Tipo_Infraestructura ORDER BY total_capacidad DESC LIMIT 10",
        "por_municipio": f"SELECT Codigo_Municipio, COUNT(*) as count FROM `{TABLA}` {w} GROUP BY Codigo_Municipio ORDER BY count DESC LIMIT 10",
        "por_caja": f"SELECT Caja_de_Compensacion, COUNT(*) as count FROM `{TABLA}` {w} GROUP BY Caja_de_Compensacion ORDER BY count DESC",
    }
    resultado = {}
    with ThreadPoolExecutor(max_workers=6) as pool:
        futuros = {pool.submit(run, q): k for k, q in queries.items()}
        for f in as_completed(futuros):
            k = futuros[f]
            rows = f.result()
            if k == "stats":
                s = rows[0]
                resultado["total_registros"] = {"total": s["total"]}
                resultado["capacidad_total"] = {"total": s["cap_total"]}
                resultado["tipos_unicos"] = {"total": s["tipos"]}
                resultado["municipios_unicos"] = {"total": s["municipios"]}
            else:
                resultado[k] = rows
    return resultado

@app.get("/api/filtros")
def get_filtros():
    queries = {
        "tipos": f"SELECT DISTINCT Tipo_Infraestructura FROM `{TABLA}` ORDER BY Tipo_Infraestructura",
        "tenencias": f"SELECT DISTINCT Tenencia_Infraestructura FROM `{TABLA}` ORDER BY Tenencia_Infraestructura",
        "cajas": f"SELECT DISTINCT Caja_de_Compensacion FROM `{TABLA}` ORDER BY Caja_de_Compensacion",
    }
    with ThreadPoolExecutor(max_workers=3) as pool:
        futuros = {pool.submit(run, q): k for k, q in queries.items()}
        resultado = {}
        for f in as_completed(futuros):
            resultado[futuros[f]] = [list(r.values())[0] for r in f.result()]
    return resultado
