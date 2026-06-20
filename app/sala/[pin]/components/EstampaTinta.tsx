import React from 'react'

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-0.5', 'rotate-0.5', '-rotate-1.5']

function hashRotation(label: string): string {
  let hash = 0
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash)
  }
  return ROTATIONS[Math.abs(hash) % ROTATIONS.length]
}

export default function EstampaTinta({ label, segundos }: { label: string; segundos: number }) {
  const rotation = hashRotation(label)

  return (
    <div className={`inline-flex ${rotation} select-none`}>
      <div className="rounded-lg border-2 border-red-600/50 bg-red-600/10 px-3 py-1 shadow-[inset_0_0_10px_rgba(220,38,38,0.06)]">
        <div className="flex flex-col items-center">
          <span className="font-typewriter text-[9px] font-bold tracking-[0.2em] text-red-600/70 uppercase blur-[0.3px]">
            {label}
          </span>
          <span className="font-typewriter text-2xl font-bold tracking-wider text-red-600/85 blur-[0.3px] -mt-0.5">
            {segundos}
          </span>
        </div>
      </div>
    </div>
  )
}
