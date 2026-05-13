import { Bar } from 'react-chartjs-2'
import { Chart as C, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { COLORS, truncar } from '../constants'
C.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChartTipos({ data }) {
  return (
    <Bar data={{
      labels: data.map(d => truncar(d.Tipo_Infraestructura, 45)),
      datasets: [{
        label: 'Cantidad',
        data: data.map(d => d.count),
        backgroundColor: COLORS[0],
      }]
    }} options={{
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: { display: true, text: 'Tipos de Infraestructura (Top 15)', font: { size: 14 } },
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: (ctx) => {
              const full = data[ctx.dataIndex].Tipo_Infraestructura
              return full.length > 45 ? `Nombre completo: ${full}` : ''
            }
          }
        }
      },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } }
    }} />
  )
}
