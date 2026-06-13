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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] px-4">
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-6 text-center shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <h1 className="font-typewriter text-2xl font-bold tracking-widest text-neutral-700 uppercase">Resultados</h1>

        <div className="w-full rounded-lg border border-neutral-500 bg-black/5 px-5 py-5 shadow-inner">
          <p className="font-typewriter text-xl font-bold text-neutral-800">
            El impostor era: <span className="text-red-600">{impostor?.nickname ?? 'desconocido'}</span>
          </p>
          <div className="mt-3">
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
          <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">Su pregunta secreta era:</p>
          <p className="mt-2 font-typewriter text-lg font-semibold text-neutral-800 break-words text-balance text-center md:text-xl">
            {datosSala.pregunta_impostor}
          </p>
        </div>

        <div className="w-full">
          <p className="mb-3 font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
            Desglose de Votos
          </p>
          <div className="flex flex-col gap-2">
            {jugadores.map((j) => {
              const votoNickname = j.voto_actual ? nicknamePorId(j.voto_actual) : '—'
              return (
                <div
                  key={j.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 text-left shadow-inner transition-all duration-200 hover:brightness-110"
                >
                  <span className="font-typewriter font-medium text-neutral-800">{j.nickname}</span>
                  <span className="font-typewriter text-sm text-neutral-600">
                    ➡️ votó por: <span className="font-semibold text-neutral-800">{votoNickname}</span>
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
            {esUltimaRonda ? '🏆 Ver Podio Final' : `Siguiente Ronda (Ronda ${datosSala.ronda_actual} de ${MAX_RONDAS})`}
          </button>
        )}
      </div>
    </main>
  )
}
