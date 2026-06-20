import React from 'react'

export function useServerCountdown(
  timerStartedAt: string | null | undefined,
  timerDurationSeconds: number | null | undefined,
  phaseKey: string | number,
): number {
  const [tiempoRestante, setTiempoRestante] = React.useState(-1)

  React.useEffect(() => {
    if (!timerStartedAt || !timerDurationSeconds) {
      console.warn(
        '[useServerCountdown] timer_started_at o timer_duration_seconds ausentes/null.',
        { timerStartedAt, timerDurationSeconds, phaseKey },
        '-> Las columnas no existen en la tabla Sala o no se escribieron correctamente.',
      )
      return
    }

    const startedAt = new Date(timerStartedAt).getTime()
    const duracion = timerDurationSeconds

    console.log('[useServerCountdown] INICIO', {
      timerStartedAt,
      timerDurationSeconds: duracion,
      startedAt,
      phaseKey,
    })

    const update = () => {
      const now = Date.now()
      const elapsedSec = (now - startedAt) / 1000
      const restante = Math.max(0, duracion - Math.floor(elapsedSec))
      console.log('[useServerCountdown] TICK', {
        now,
        elapsedSec,
        restante,
        duracion,
      })
      setTiempoRestante(restante)
    }

    update()
    const interval = setInterval(update, 1000)
    return () => {
      clearInterval(interval)
      console.log('[useServerCountdown] CLEANUP', { phaseKey })
    }
  }, [timerStartedAt, timerDurationSeconds, phaseKey])

  return tiempoRestante
}
