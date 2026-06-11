export type Jugador = {
  id: string
  nickname: string
  sala_id: string
  puntos: number
  respuesta_actual?: string | null
  voto_actual?: string | null
}

export type DatosSala = {
  id: string
  codigo: string
  status: string
  fase: string
  impostor_id: string
  pregunta_real: string
  pregunta_impostor: string
  preguntas_usadas: string[]
  ronda_actual: number
}
