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
    <main
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/madera-oscura.jpg")' }}
    >
      <div
        className="relative w-full max-w-md rounded-lg border border-neutral-700 shadow-2xl"
        style={{
          backgroundImage:
            'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px), url("/textura-manila.jpg")',
          backgroundSize: '24px 24px, 24px 24px, cover',
          backgroundPosition: '0 0, 0 0, center',
        }}
      >
        <img
          src="/espirales-binder.png"
          alt=""
          className="pointer-events-none absolute left-0 -top-11 z-10 w-full select-none lg:-top-14"
        />

        <div className="flex flex-col items-center gap-6 px-5 pb-6 pt-14">
          <p className="font-typewriter text-lg tracking-widest text-neutral-600 uppercase">
            ¡HORA DE VOTAR!
          </p>

          <p className="w-full break-words text-balance text-center font-typewriter text-xl font-bold tracking-normal text-neutral-900 md:text-2xl">
            {datosSala.pregunta_real}
          </p>

          {haVotado ? (
            <div className="flex w-full flex-col gap-2">
              <p className="text-center font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
                AGENTES ({jugadores.length})
              </p>
              <div className="flex flex-col gap-1.5">
                {jugadores.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-2 rounded-lg border border-neutral-400/50 px-3 py-2 font-typewriter text-sm transition-all duration-200 ${
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
                  className="rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 shadow-inner transition-all duration-200 hover:brightness-110"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-typewriter font-semibold text-neutral-800">
                        {j.nickname}
                      </span>
                      {j.respuesta_actual && (
                        <span className="font-typewriter text-sm text-neutral-600">
                          &ldquo;{j.respuesta_actual}&rdquo;
                        </span>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
