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
    <main
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "image-set(url('/madera-oscura.webp') type('image/webp'), url('/madera-oscura.jpg') type('image/jpeg'))",
      }}
    >
      <div
        className="relative w-full max-w-md rounded-lg border border-neutral-700 shadow-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px), image-set(url('/textura-manila.webp') type('image/webp'), url('/textura-manila.jpg') type('image/jpeg'))",
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
          <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
            NÚMERO DE EXPEDIENTE
          </p>
          <p className="w-full break-words text-balance text-center font-typewriter text-5xl font-bold tracking-normal text-neutral-900 md:text-7xl lg:text-8xl">
            {pin}
          </p>

          <div className="w-full">
            {loading ? (
              <p className="text-center font-typewriter text-base text-neutral-500">Cargando agentes...</p>
            ) : jugadores.length === 0 ? (
              <p className="text-center font-typewriter text-base text-neutral-500">Esperando agentes...</p>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-center font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
                  AGENTES ASIGNADOS ({jugadores.length})
                </p>
                <ul className="flex flex-wrap justify-center gap-2">
                  {jugadores.map((j) => (
                    <li
                      key={j.id}
                      className="rounded-full bg-neutral-800/10 px-4 py-1.5 font-typewriter text-sm text-neutral-700 transition-[filter] duration-200 hover:brightness-110"
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
              className="w-full cursor-pointer rounded-lg bg-[#5b6a38] px-6 py-4 font-typewriter text-lg font-bold text-[#f4ebd0] shadow-md transition-[filter,transform] duration-200 hover:brightness-110 active:scale-95 md:text-xl"
            >
              EMPEZAR PARTIDA
            </button>
          ) : (
            <p className="text-center font-typewriter text-base text-neutral-500">
              Esperando a que el anfitrión inicie la partida...
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
