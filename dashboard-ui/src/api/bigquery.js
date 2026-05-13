import axios from 'axios'

export async function getDatos(limit = 500, offset = 0, filtros = {}) {
  const res = await axios.get('/api/datos', { params: { limit, offset, ...filtros } })
  return res.data
}

export async function getResumen(filtros = {}) {
  const res = await axios.get('/api/resumen', { params: filtros })
  return res.data
}

export async function getFiltros() {
  const res = await axios.get('/api/filtros')
  return res.data
}
