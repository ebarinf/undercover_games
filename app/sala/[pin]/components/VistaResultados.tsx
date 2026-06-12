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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <h1 className="text-2xl font-bold tracking-widest text-gray-300 uppercase">Resultados</h1>

        <div className="w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-5">
          <p className="text-xl font-bold text-white">
            El impostor era: <span className="text-red-400">{impostor?.nickname ?? 'desconocido'}</span>
          </p>
          <div className="mt-3">
            {impostorAtrapado ? (
              <span className="inline-block rounded-full bg-green-500/20 px-5 py-2 text-lg font-bold text-green-400">
                🚨 ¡FUE ATRAPADO! 🚨
              </span>
            ) : (
              <span className="inline-block rounded-full bg-red-500/20 px-5 py-2 text-lg font-bold text-red-400">
                😈 ¡LOGRÓ ESCAPAR! 😈
              </span>
            )}
          </div>
        </div>

        <div className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-4 transition-all duration-200 hover:brightness-110">
          <p className="text-sm tracking-widest text-gray-500 uppercase">Su pregunta secreta era:</p>
          <p className="mt-2 text-lg font-semibold text-indigo-400 break-words text-balance text-center md:text-xl">
            {datosSala.pregunta_impostor}
          </p>
        </div>

        <div className="w-full">
          <p className="mb-3 text-sm tracking-widest text-gray-500 uppercase">
            Desglose de Votos
          </p>
          <div className="flex flex-col gap-2">
            {jugadores.map((j) => {
              const votoNickname = j.voto_actual ? nicknamePorId(j.voto_actual) : '—'
              return (
                <div
                  key={j.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-left transition-all duration-200 hover:brightness-110"
                >
                  <span className="font-medium text-white">{j.nickname}</span>
                  <span className="text-sm text-gray-400">
                    ➡️ votó por: <span className="font-semibold text-indigo-300">{votoNickname}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {isHost && (
          <button
            onClick={onSiguienteRonda}
            className="w-full cursor-pointer rounded-xl bg-green-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:brightness-110 hover:bg-green-400 active:scale-95 md:text-xl"
          >
            {esUltimaRonda ? '🏆 Ver Podio Final' : `Siguiente Ronda (Ronda ${datosSala.ronda_actual} de ${MAX_RONDAS})`}
          </button>
        )}
      </div>
    </main>
  )
}
