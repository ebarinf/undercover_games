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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] px-4">
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-6 text-center shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <p className="font-typewriter text-lg tracking-widest text-neutral-600 uppercase">¡Hora de Votar!</p>
        <p className="w-full font-typewriter text-xl font-bold tracking-normal text-neutral-900 break-words text-balance text-center md:text-2xl">
          {datosSala.pregunta_real}
        </p>
        {haVotado ? (
          <div className="flex w-full flex-col gap-2">
            <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
              Jugadores ({jugadores.length})
            </p>
            <div className="flex flex-col gap-1.5">
              {jugadores.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 font-typewriter text-sm transition-all duration-200 ${
                      j.voto_actual
                        ? 'bg-neutral-800/10 text-neutral-700'
                        : 'bg-black/5 text-neutral-500'
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
                className="flex items-center justify-between rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 shadow-inner transition-all duration-200 hover:brightness-110"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-typewriter font-semibold text-neutral-800">{j.nickname}</span>
                  {j.respuesta_actual && (
                    <span className="font-typewriter text-sm text-neutral-600">&quot;{j.respuesta_actual}&quot;</span>
                  )}
                </div>
                {j.id !== miJugadorId && !haVotado && (
                  <button
                    onClick={() => onVotar(j.id)}
                    className="cursor-pointer rounded-md bg-[#5b6a38] px-4 py-2 font-typewriter text-sm font-bold text-[#f4ebd0] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
                  >
                    Votar
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
