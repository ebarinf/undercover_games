import React from 'react'
import type { Jugador } from '../types'

type Props = {
  pin: string
  loading: boolean
  jugadores: Jugador[]
  isHost: boolean
  onIniciarPartida: () => void
}

export default function VistaLobby({ pin, loading, jugadores, isHost, onIniciarPartida }: Props) {
  return (
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] px-4">
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-6 text-center shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">PIN de la sala:</p>
        <p className="w-full font-typewriter text-5xl font-bold tracking-normal text-neutral-900 break-words text-balance md:text-7xl lg:text-8xl">
          {pin}
        </p>

        <div className="w-full">
          {loading ? (
            <p className="font-typewriter text-base text-neutral-500">Cargando jugadores...</p>
          ) : jugadores.length === 0 ? (
            <p className="font-typewriter text-base text-neutral-500">Esperando jugadores...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
                Jugadores ({jugadores.length})
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {jugadores.map((j) => (
                  <li
                    key={j.id}
                    className="rounded-full bg-neutral-800/10 px-4 py-1.5 font-typewriter text-sm text-neutral-700 transition-all duration-200 hover:brightness-110"
                  >
                    {j.nickname}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {isHost ? (
          <button
            onClick={onIniciarPartida}
            className="w-full cursor-pointer rounded-lg bg-[#5b6a38] px-6 py-4 font-typewriter text-lg font-bold text-[#f4ebd0] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95 md:text-xl"
          >
            ¡Iniciar Partida!
          </button>
        ) : (
          <p className="font-typewriter text-base text-neutral-500">Esperando a que el anfitrión inicie la partida...</p>
        )}
      </div>
    </main>
  )
}
