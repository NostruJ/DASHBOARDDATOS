export const COLORS = [
  '#FF1744', '#00E676', '#FFEA00', '#2979FF', '#FF9100',
  '#D500F9', '#00BCD4', '#FF4081', '#76FF03', '#651FFF',
  '#FFD740', '#00E5FF',
]

export function truncar(texto, max = 40) {
  return texto.length > max ? texto.slice(0, max) + '...' : texto
}
