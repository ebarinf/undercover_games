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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] px-4">
      <div
        className="flex w-full max-w-md flex-col items-center gap-8 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-6 text-center shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <h1 className="font-typewriter text-3xl font-bold text-neutral-800 md:text-4xl">
          🏆 ¡FIN DE LA PARTIDA! 🏆
        </h1>

        <div className="flex w-full flex-col gap-3">
          {jugadoresOrdenados.map((j, i) => {
            const esPrimero = i === 0
            return (
              <div
                key={j.id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 shadow-inner transition-all duration-200 hover:brightness-110 ${
                  esPrimero
                    ? 'border-yellow-600 bg-yellow-500/10 shadow-lg shadow-yellow-600/20'
                    : 'border-neutral-500 bg-black/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {esPrimero && <span className="text-2xl">👑</span>}
                  <span className={`font-typewriter font-semibold ${esPrimero ? 'text-yellow-700' : 'text-neutral-800'}`}>
                    {j.nickname}
                  </span>
                </div>
                <span className="font-typewriter text-sm text-neutral-600">{j.puntos} pts</span>
              </div>
            )
          })}
        </div>

        {isHost && (
          <button
            onClick={() => reiniciarPartida(salaId)}
            className="w-full cursor-pointer rounded-lg bg-[#5b6a38] px-6 py-4 font-typewriter text-lg font-bold text-[#f4ebd0] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95 md:text-xl"
          >
            🔄 Jugar de Nuevo (Volver al Lobby)
          </button>
        )}
      </div>
    </main>
  )
}
