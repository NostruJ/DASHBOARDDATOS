import { Bar } from 'react-chartjs-2'
import { Chart as C, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { COLORS, truncar } from '../constants'
C.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function TopCapacidades({ data }) {
  return (
    <Bar data={{
      labels: data.map(d => truncar(d.Tipo_Infraestructura, 40)),
      datasets: [{
        label: 'Capacidad Total',
        data: data.map(d => d.total_capacidad),
        backgroundColor: data.map((_, i) => COLORS[i % COLORS.length]),
      }]
    }} options={{
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: { display: true, text: 'Capacidad Total por Tipo (Top 10)', font: { size: 14 } },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => Number(ctx.raw).toLocaleString(),
            afterLabel: (ctx) => {
              const full = data[ctx.dataIndex].Tipo_Infraestructura
              return full.length > 40 ? full : ''
            }
          }
        }
      },
      scales: { x: { beginAtZero: true } }
    }} />
  )
}
