'use client'

import { useFormStatus } from 'react-dom'

export function CreateRoomButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm text-gray-500 underline transition-colors hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Creando...' : '¿Eres el anfitrión? Crear nueva sala'}
    </button>
  )
}
