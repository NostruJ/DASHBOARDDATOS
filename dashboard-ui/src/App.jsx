import { useEffect, useState, useCallback } from 'react'
import { getResumen, getDatos, getFiltros } from './api/bigquery'
import KPIcards from './components/KPIcards'
import BarChartTipos from './components/BarChartTipos'
import PieChartTenencia from './components/PieChartTenencia'
import TopCapacidades from './components/TopCapacidades'
import BarChartCaja from './components/BarChartCaja'
import DataTable from './components/DataTable'

function Skeleton({ height }) {
  return <div className="skeleton" style={{ height: height || 300 }} />
}

function Filters({ options, onChange, loading }) {
  return (
    <div className="filters">
      <select onChange={e => onChange('tipo', e.target.value)} defaultValue="">
        <option value="">Todos los tipos</option>
        {options.tipos?.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select onChange={e => onChange('tenencia', e.target.value)} defaultValue="">
        <option value="">Todas las tenencias</option>
        {options.tenencias?.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select onChange={e => onChange('caja', e.target.value)} defaultValue="">
        <option value="">Todas las cajas</option>
        {options.cajas?.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {loading && <span className="badge-loading">Actualizando...</span>}
    </div>
  )
}

function App() {
  const [resumen, setResumen] = useState(null)
  const [filtrosOptions, setFiltrosOptions] = useState({ tipos: [], tenencias: [], cajas: [] })
  const [datos, setDatos] = useState([])
  const [filtros, setFiltros] = useState({})
  const [loading, setLoading] = useState(false)

  const cargarTodo = useCallback((f) => {
    setLoading(true)
    getResumen(f).then(setResumen).catch(() => {})
    getDatos(500, 0, f).then(setDatos).catch(() => {})
    setTimeout(() => setLoading(false), 300)
  }, [])

  useEffect(() => {
    getFiltros().then(setFiltrosOptions).catch(() => {})
    cargarTodo({})
  }, [cargarTodo])

  const handleFilter = (key, val) => {
    const next = { ...filtros }
    if (val) next[key] = val
    else delete next[key]
    setFiltros(next)
    cargarTodo(next)
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard Infraestructura</h1>
        <p>Datos de infraestructura — Google BigQuery</p>
      </header>

      <Filters options={filtrosOptions} onChange={handleFilter} loading={loading} />

      {resumen ? (
        <>
          <KPIcards
            totalRegistros={resumen.total_registros.total}
            capacidadTotal={resumen.capacidad_total.total}
            tiposUnicos={resumen.tipos_unicos.total}
            municipiosUnicos={resumen.municipios_unicos.total}
          />

          <div className="card">
            <BarChartTipos data={resumen.por_tipo} />
          </div>

          <div className="grid-2">
            <div className="card"><PieChartTenencia data={resumen.por_tenencia} /></div>
            <div className="card"><TopCapacidades data={resumen.capacidad_por_tipo} /></div>
          </div>

          <div className="card">
            <BarChartCaja data={resumen.por_caja} />
          </div>

          <div className="card">
            <DataTable data={datos} />
          </div>
        </>
      ) : (
        <>
          <div className="kpi-grid">
            {[1, 2, 3, 4].map(i => <div key={i} className="kpi"><Skeleton height={60} /></div>)}
          </div>
          <Skeleton height={300} />
        </>
      )}
    </div>
  )
}

export default App
