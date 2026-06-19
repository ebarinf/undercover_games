import React from 'react'
import type { Jugador, DatosSala } from '../types'
import { MAX_RONDAS } from '@/app/constants'

type Props = {
  datosSala: DatosSala
  jugadores: Jugador[]
  isHost: boolean
  pin: string
  onSiguienteRonda: () => void
}

export default function VistaResultados({ datosSala, jugadores, isHost, pin, onSiguienteRonda }: Props) {
  const impostor = jugadores.find((j) => j.id === datosSala.impostor_id)
  const esUltimaRonda = datosSala.ronda_actual >= MAX_RONDAS

  const conteoVotos: Record<string, number> = {}
  jugadores.forEach((j) => {
    if (j.voto_actual) {
      conteoVotos[j.voto_actual] = (conteoVotos[j.voto_actual] || 0) + 1
    }
  })

  const maxVotos = Math.max(0, ...Object.values(conteoVotos))
  const masVotados = Object.entries(conteoVotos)
    .filter(([, count]) => count === maxVotos)
    .map(([id]) => id)

  const impostorAtrapado = masVotados.length === 1 && masVotados[0] === impostor?.id

  function nicknamePorId(id: string) {
    return jugadores.find((j) => j.id === id)?.nickname ?? '???'
  }

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

        <div className="flex flex-col items-center gap-5 px-5 pb-6 pt-14">
          <h1 className="text-center font-typewriter text-2xl font-bold tracking-widest text-neutral-700 uppercase">
            INFORME DE RONDA {datosSala.ronda_actual}
          </h1>

          <div className="w-full rounded-lg border border-neutral-500 bg-black/5 px-5 py-5 shadow-inner">
            <p className="text-center font-typewriter text-xl font-bold text-neutral-800">
              El impostor era:{' '}
              <span className="text-red-600">{impostor?.nickname ?? 'desconocido'}</span>
            </p>
            <div className="mt-3 text-center">
              {impostorAtrapado ? (
                <span className="inline-block rounded-full bg-green-700/15 px-5 py-2 font-typewriter text-lg font-bold text-green-700">
                  🚨 ¡FUE ATRAPADO! 🚨
                </span>
              ) : (
                <span className="inline-block rounded-full bg-red-600/15 px-5 py-2 font-typewriter text-lg font-bold text-red-600">
                  😈 ¡LOGRÓ ESCAPAR! 😈
                </span>
              )}
            </div>
          </div>

          <div className="w-full rounded-lg border border-neutral-500 bg-black/5 px-4 py-4 shadow-inner transition-all duration-200 hover:brightness-110">
            <p className="text-center font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
              Su pregunta secreta era:
            </p>
            <p className="mt-2 break-words text-balance text-center font-typewriter text-lg font-semibold text-neutral-800 md:text-xl">
              {datosSala.pregunta_impostor}
            </p>
          </div>

          <div className="w-full">
            <p className="mb-3 text-center font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
              DESGLOSE DE VOTOS
            </p>
            <div className="flex flex-col gap-2">
              {jugadores.map((j) => {
                const votoNickname = j.voto_actual ? nicknamePorId(j.voto_actual) : '—'
                return (
                  <div
                    key={j.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 text-left shadow-inner transition-all duration-200 hover:brightness-110"
                  >
                    <span className="font-typewriter font-medium text-neutral-800">
                      {j.nickname}
                    </span>
                    <span className="font-typewriter text-sm text-neutral-600">
                      ➡️ votó por:{' '}
                      <span className="font-semibold text-neutral-800">{votoNickname}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {isHost && (
            <button
              onClick={onSiguienteRonda}
              className="w-full cursor-pointer rounded-lg bg-[#5b6a38] px-6 py-4 font-typewriter text-lg font-bold text-[#f4ebd0] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95 md:text-xl"
            >
              {esUltimaRonda
                ? '🏆 VER PODIO FINAL'
                : `SIGUIENTE RONDA (${datosSala.ronda_actual} de ${MAX_RONDAS})`}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
