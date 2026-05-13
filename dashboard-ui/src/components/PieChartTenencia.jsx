import { Doughnut } from 'react-chartjs-2'
import { Chart as C, ArcElement, Tooltip, Legend } from 'chart.js'
import { COLORS } from '../constants'
C.register(ArcElement, Tooltip, Legend)

export default function PieChartTenencia({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0)
  const top = data.filter(d => (d.count / total) >= 0.01)
  const otros = data.filter(d => (d.count / total) < 0.01)
  const labels = top.map(d => d.Tenencia_Infraestructura)
  const values = top.map(d => d.count)
  if (otros.length) {
    labels.push('Otros')
    values.push(otros.reduce((s, d) => s + d.count, 0))
  }
  return (
    <Doughnut data={{
      labels,
      datasets: [{
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
      }]
    }} options={{
      responsive: true,
      plugins: {
        title: { display: true, text: 'Distribución por Tenencia' },
        legend: { position: 'right', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } }
      }
    }} />
  )
}
