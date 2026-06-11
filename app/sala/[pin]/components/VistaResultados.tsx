import React from 'react'
import type { Jugador, DatosSala } from '../types'

type Props = {
  datosSala: DatosSala
  jugadores: Jugador[]
  isHost: boolean
  pin: string
  onSiguienteRonda: () => void
}

export default function VistaResultados({ datosSala, jugadores, isHost, pin, onSiguienteRonda }: Props) {
  const impostor = jugadores.find((j) => j.id === datosSala.impostor_id)
  const proxRonda = (datosSala.ronda_actual ?? 0) + 1

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-3xl font-bold text-red-400 md:text-5xl">
          ¡El impostor era {impostor?.nickname ?? 'desconocido'}!
        </p>
        <div className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-4">
          <p className="text-sm tracking-widest text-gray-500 uppercase">Su pregunta secreta era:</p>
          <p className="mt-2 text-lg font-semibold text-indigo-400">
            {datosSala.pregunta_impostor}
          </p>
        </div>
        {isHost && (
          <button
            onClick={onSiguienteRonda}
            className="w-full cursor-pointer rounded-xl bg-green-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400 active:scale-95 md:text-xl"
          >
            Siguiente Ronda (Ronda {proxRonda})
          </button>
        )}
      </div>
    </main>
  )
}
