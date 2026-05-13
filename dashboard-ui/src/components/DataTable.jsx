export default function DataTable({ data }) {
  if (!data.length) return null
  const cols = ['Codigo_Municipio', 'Tipo_Infraestructura', 'Tenencia_Infraestructura', 'Capacidad_Infraestructura', 'Caja_de_Compensacion']
  const headers = ['Municipio', 'Tipo', 'Tenencia', 'Capacidad', 'Caja']
  return (
    <div>
      <h3 style={{ marginBottom: 12, fontSize: 16, color: '#1a237e' }}>
        Datos ({data.length} registros)
      </h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.Codigo_Municipio}</td>
                <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={row.Tipo_Infraestructura}>{row.Tipo_Infraestructura}</td>
                <td>{row.Tenencia_Infraestructura}</td>
                <td>{Number(row.Capacidad_Infraestructura).toLocaleString()}</td>
                <td>{row.Caja_de_Compensacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
