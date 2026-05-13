import { Bar } from 'react-chartjs-2'
import { Chart as C, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { COLORS } from '../constants'
C.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChartCaja({ data }) {
  return (
    <Bar data={{
      labels: data.map(d => d.Caja_de_Compensacion),
      datasets: [{
        label: 'Registros',
        data: data.map(d => d.count),
        backgroundColor: COLORS.slice(0, data.length),
      }]
    }} options={{
      responsive: true,
      plugins: {
        title: { display: true, text: 'Registros por Caja de Compensación', font: { size: 14 } },
        legend: { display: false },
      },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
    }} />
  )
}
