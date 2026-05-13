export default function KPIcards({ totalRegistros, capacidadTotal, tiposUnicos, municipiosUnicos }) {
  const items = [
    { label: "Registros", value: totalRegistros },
    { label: "Capacidad Total", value: Number(capacidadTotal).toLocaleString() },
    { label: "Tipos Únicos", value: tiposUnicos },
    { label: "Municipios", value: municipiosUnicos },
  ]
  return (
    <div className="kpi-grid">
      {items.map((item, i) => (
        <div className="kpi" key={i}>
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  )
}
