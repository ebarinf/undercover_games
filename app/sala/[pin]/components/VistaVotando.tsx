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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-lg tracking-widest text-gray-500 uppercase">¡Hora de Votar!</p>
        <p className="w-full text-xl font-bold tracking-normal text-indigo-400 break-all md:text-2xl">
          {datosSala.pregunta_real}
        </p>
        {haVotado ? (
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm tracking-widest text-gray-500 uppercase">
              Jugadores ({jugadores.length})
            </p>
            <div className="flex flex-col gap-1.5">
              {jugadores.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                      j.voto_actual
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-800 text-gray-500'
                    }`}
                >
                  <span>{j.voto_actual ? '✅' : '⏳'}</span>
                  <span className="font-medium">{j.nickname}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {jugadores.map((j) => (
              <div
                key={j.id}
                className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 transition-all duration-200 hover:brightness-110"
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
                    className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95"
                  >
                    Votar por {j.nickname}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
