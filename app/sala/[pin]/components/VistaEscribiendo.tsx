import React from 'react'
import type { Jugador, DatosSala } from '../types'

type Props = {
  datosSala: DatosSala
  jugadores: Jugador[]
  miJugadorId: string | null
  textoRespuesta: string
  onTextoRespuestaChange: (value: string) => void
  haRespondido: boolean
  onEnviarRespuesta: () => void
}

export default function VistaEscribiendo({
  datosSala,
  jugadores,
  miJugadorId,
  textoRespuesta,
  onTextoRespuestaChange,
  haRespondido,
  onEnviarRespuesta,
}: Props) {
  const esImpostor = miJugadorId === datosSala.impostor_id

  return (
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-gray-950 px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-sm tracking-widest text-gray-500 uppercase">Ronda {datosSala.ronda_actual}</p>
        <p className="w-full text-2xl font-bold tracking-normal text-indigo-400 break-all md:text-3xl">
          {esImpostor ? datosSala.pregunta_impostor : datosSala.pregunta_real}
        </p>
        {haRespondido ? (
          <>
            <p className="animate-pulse text-lg font-semibold text-green-400">
              ¡Respuesta enviada! Esperando a los demás jugadores...
            </p>
            <div className="flex w-full flex-col gap-2">
              <p className="text-sm tracking-widest text-gray-500 uppercase">
                Jugadores ({jugadores.length})
              </p>
              <div className="flex flex-col gap-1.5">
                {jugadores.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                      j.respuesta_actual
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    <span>{j.respuesta_actual ? '✅' : '⏳'}</span>
                    <span className="font-medium">{j.nickname}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <textarea
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              rows={4}
              placeholder="Escribe tu respuesta..."
              value={textoRespuesta}
              onChange={(e) => onTextoRespuestaChange(e.target.value)}
            />
            <button
              onClick={onEnviarRespuesta}
              className="w-full cursor-pointer rounded-xl bg-indigo-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:brightness-110 active:scale-95 md:text-xl"
            >
              Enviar respuesta
            </button>
          </>
        )}
      </div>
    </main>
  )
}
