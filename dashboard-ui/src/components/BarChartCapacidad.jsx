import { Bar } from 'react-chartjs-2'
import { Chart as C, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
C.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChartCapacidad({ data }) {
  return (
    <Bar data={{
      labels: data.map(d => d.Tipo_Infraestructura),
      datasets: [{
        label: 'Capacidad Total',
        data: data.map(d => d.total_capacidad),
        backgroundColor: '#4BC0C0',
      }]
    }} options={{
      responsive: true,
      plugins: { title: { display: true, text: 'Capacidad por Tipo (Top 10)' }, legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }} />
  )
}
