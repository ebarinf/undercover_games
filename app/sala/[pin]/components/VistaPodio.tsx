import React from 'react'
import type { Jugador } from '../types'
import { reiniciarPartida } from '@/app/actions'

type Props = {
  jugadores: Jugador[]
  isHost: boolean
  salaId: string
}

export default function VistaPodio({ jugadores, isHost, salaId }: Props) {
  const jugadoresOrdenados = [...jugadores].sort((a, b) => b.puntos - a.puntos)

  return (
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-bold text-yellow-400 md:text-4xl">
          🏆 ¡FIN DE LA PARTIDA! 🏆
        </h1>

        <div className="flex w-full flex-col gap-3">
          {jugadoresOrdenados.map((j, i) => {
            const esPrimero = i === 0
            return (
              <div
                key={j.id}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 hover:brightness-110 ${
                  esPrimero
                    ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
                    : 'border-gray-700 bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {esPrimero && <span className="text-2xl">👑</span>}
                  <span className={`font-semibold ${esPrimero ? 'text-yellow-300' : 'text-white'}`}>
                    {j.nickname}
                  </span>
                </div>
                <span className="text-sm text-gray-400">{j.puntos} pts</span>
              </div>
            )
          })}
        </div>

        {isHost && (
          <button
            onClick={() => reiniciarPartida(salaId)}
            className="w-full cursor-pointer rounded-xl bg-indigo-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:brightness-110 hover:bg-indigo-400 active:scale-95 md:text-xl"
          >
            🔄 Jugar de Nuevo (Volver al Lobby)
          </button>
        )}
      </div>
    </main>
  )
}
