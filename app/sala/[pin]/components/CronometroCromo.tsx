import React from 'react'

export default function CronometroCromo({ segundos }: { segundos: number }) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  const display = `${m}:${s.toString().padStart(2, '0')}`

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-neutral-400 bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-200 px-2 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),0_1px_1px_rgba(255,255,255,0.3)]">
      <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-700">{display}</span>
    </div>
  )
}
