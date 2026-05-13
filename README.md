# Dashboard Infraestructura

Dashboard web para visualizar datos de infraestructura desde Google BigQuery usando gráficas interactivas.

## Tecnologias

- **Backend:** Python + FastAPI
- **Frontend:** React + Vite + Chart.js

## Estructura del proyecto

| Carpeta | Que contiene |
|---------|-------------|
| `base/` | Archivos originales del proyecto (CSV, conexion Python) |
| `dashboard-api/` | Backend: conecta a BigQuery y expone los datos como API |
| `dashboard-ui/` | Frontend: muestra los datos en graficas y tabla |

## Requisitos

- Python 3.9+
- Node.js 18+

## Configuracion inicial

Este proyecto se conecta a Google BigQuery mediante una service account.
Antes de ejecutar, debes configurar la variable de entorno con la ruta a tu archivo JSON de credenciales:

```powershell
setx GOOGLE_APPLICATION_CREDENTIALS "C:\Users\TU_USUARIO\.google\credentials\mapaibague-94fefa456fd7.json"
```

Reemplaza `TU_USUARIO` con tu nombre de usuario y **cierra y vuelve a abrir la terminal** para que el cambio surta efecto.

## Como ejecutar

### 1. Backend (terminal 1)

```bash
cd dashboard-api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend (terminal 2)

```bash
cd dashboard-ui
npm install
npm run dev
```

Abrir `http://localhost:5173` en el navegador.

## Endpoints de la API

| Ruta | Que devuelve |
|------|-------------|
| `GET /api/datos` | Datos completos de la tabla (con filtros opcionales) |
| `GET /api/resumen` | Conteos y agregaciones para las graficas |
| `GET /api/filtros` | Lista de valores disponibles para los filtros |
