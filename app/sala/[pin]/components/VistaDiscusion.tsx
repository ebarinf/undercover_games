import React from 'react'
import { forzarTransicion } from '@/app/actions'
import type { Jugador, DatosSala } from '../types'
import EstampaTinta from './EstampaTinta'
import { useServerCountdown } from '../hooks/useServerCountdown'

type Props = {
  datosSala: DatosSala
  jugadores: Jugador[]
}

export default function VistaDiscusion({ datosSala, jugadores }: Props) {
  const timerKey = `${datosSala.ronda_actual}-${datosSala.fase}`
  const tiempoRestante = useServerCountdown(datosSala.timer_started_at, datosSala.timer_duration_seconds, timerKey)
  const transicionRef = React.useRef(false)

  React.useEffect(() => {
    console.log('[VistaDiscusion] auto-advance check:', { tiempoRestante, transicionRef: transicionRef.current })
    if (tiempoRestante !== 0 || transicionRef.current) return
    transicionRef.current = true
    console.log('[VistaDiscusion] AUTO-AVANCE por timer expirado')
    forzarTransicion(datosSala.id)
  }, [tiempoRestante, datosSala.id])

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
          <div className="flex w-full items-center justify-between">
            <p className="font-typewriter text-sm tracking-widest text-neutral-600 uppercase">
              RONDA {datosSala.ronda_actual} — DISCUSIÓN
            </p>
            <EstampaTinta label="DISCUSIÓN" segundos={tiempoRestante} />
          </div>

          <p className="w-full break-words text-balance text-center font-typewriter text-xl font-bold tracking-normal text-neutral-900 md:text-2xl">
            {datosSala.pregunta_real}
          </p>

          <div className="flex w-full flex-col gap-3">
            {jugadores.map((j) => (
              <div
                key={j.id}
                className="rounded-lg border border-neutral-500 bg-black/5 px-4 py-3 shadow-inner transition-[filter] duration-200 hover:brightness-110"
              >
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
              </div>
            ))}
          </div>

          <p className="text-center font-typewriter text-sm tracking-widest text-yellow-700/70 uppercase">
            ⏳ Discusión en curso — Votación disponible en {tiempoRestante}s
          </p>
        </div>
      </div>
    </main>
  )
}
