'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#5b6a38] px-4 py-3 font-typewriter font-bold tracking-wider text-white transition-all duration-150 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  )
}
