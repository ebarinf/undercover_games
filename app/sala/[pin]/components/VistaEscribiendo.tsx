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
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex min-h-dvh items-center justify-center bg-[#2c1d11] px-4">
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-6 text-center shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">Ronda {datosSala.ronda_actual}</p>
          <p className="w-full font-typewriter text-2xl font-bold tracking-normal text-neutral-900 break-words text-balance text-center md:text-3xl">
            {esImpostor ? datosSala.pregunta_impostor : datosSala.pregunta_real}
          </p>
        {haRespondido ? (
          <>
            <p className="animate-pulse font-typewriter text-lg font-semibold text-neutral-700">
              ¡Respuesta enviada! Esperando a los demás jugadores...
            </p>
            <div className="flex w-full flex-col gap-2">
              <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
                Jugadores ({jugadores.length})
              </p>
              <div className="flex flex-col gap-1.5">
                {jugadores.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 font-typewriter text-sm transition-all duration-200 ${
                      j.respuesta_actual
                        ? 'bg-neutral-800/10 text-neutral-700'
                        : 'bg-black/5 text-neutral-500'
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
              className="w-full rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 font-typewriter text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-all duration-200 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
              rows={4}
              placeholder="Escribe tu respuesta..."
              value={textoRespuesta}
              onChange={(e) => onTextoRespuestaChange(e.target.value)}
            />
            <button
              onClick={onEnviarRespuesta}
              className="w-full cursor-pointer rounded-lg bg-[#5b6a38] px-6 py-4 font-typewriter text-lg font-bold text-[#f4ebd0] shadow-md transition-all duration-200 hover:brightness-110 active:scale-95 md:text-xl"
            >
              Enviar respuesta
            </button>
          </>
        )}
      </div>
    </main>
  )
}
