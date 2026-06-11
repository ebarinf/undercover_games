import React from 'react'
import type { Jugador, DatosSala } from '../types'

type Props = {
  datosSala: DatosSala
  jugadores: Jugador[]
  miJugadorId: string | null
  haVotado: boolean
  onVotar: (jugadorId: string) => void
}

export default function VistaVotando({ datosSala, jugadores, miJugadorId, haVotado, onVotar }: Props) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-lg tracking-widest text-gray-500 uppercase">¡Hora de Votar!</p>
        <p className="w-full text-xl font-bold tracking-normal text-indigo-400 break-all md:text-2xl">
          {datosSala.pregunta_real}
        </p>
        <div className="flex w-full flex-col gap-3">
          {jugadores.map((j) => (
            <div
              key={j.id}
              className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 px-4 py-3"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold text-white">{j.nickname}</span>
                {j.respuesta_actual && (
                  <span className="text-sm text-gray-400">&quot;{j.respuesta_actual}&quot;</span>
                )}
              </div>
              {j.id !== miJugadorId && !haVotado && (
                <button
                  onClick={() => onVotar(j.id)}
                  className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-400 active:scale-95"
                >
                  Votar por {j.nickname}
                </button>
              )}
            </div>
          ))}
        </div>
        {haVotado && (
          <p className="animate-pulse text-lg font-semibold text-green-400">
            Esperando los votos de los demás...
          </p>
        )}
      </div>
    </main>
  )
}
