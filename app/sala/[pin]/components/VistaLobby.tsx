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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-sm tracking-widest text-gray-500 uppercase">PIN de la sala:</p>
        <p className="w-full text-5xl font-bold tracking-normal text-indigo-400 break-all md:text-7xl lg:text-8xl">
          {pin}
        </p>

        <div className="w-full">
          {loading ? (
            <p className="text-base text-gray-500">Cargando jugadores...</p>
          ) : jugadores.length === 0 ? (
            <p className="text-base text-gray-500">Esperando jugadores...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-widest text-gray-500 uppercase">
                Jugadores ({jugadores.length})
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {jugadores.map((j) => (
                  <li
                    key={j.id}
                    className="rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 transition-all duration-200 hover:brightness-110"
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
            className="w-full cursor-pointer rounded-xl bg-green-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:brightness-110 hover:bg-green-400 active:scale-95 md:text-xl"
          >
            ¡Iniciar Partida!
          </button>
        ) : (
          <p className="text-base text-gray-500">Esperando a que el anfitrión inicie la partida...</p>
        )}
      </div>
    </main>
  )
}
