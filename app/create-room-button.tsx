'use client'

import { useFormStatus } from 'react-dom'

export function CreateRoomButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md border border-neutral-600 bg-[#ede6cd] px-4 py-3 font-typewriter font-bold tracking-wider text-neutral-800 transition-all duration-150 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Creando...' : '¿Eres el anfitrión? Crear nueva sala'}
    </button>
  )
}
