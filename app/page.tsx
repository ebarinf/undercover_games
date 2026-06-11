'use client'

import React from 'react'
import { unirseSala, crearSala } from './actions'
import { SubmitButton } from './submit-button'
import { CreateRoomButton } from './create-room-button'

export default function Home() {
  const [errorSala, setErrorSala] = React.useState<string | null>(null)

  async function handleUnirseSala(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorSala(null)
    const formData = new FormData(e.currentTarget)
    const result = await unirseSala(formData)
    if (result && 'error' in result) {
      setErrorSala(result.error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <form
          onSubmit={handleUnirseSala}
          className="flex w-full flex-col gap-6 rounded-xl bg-gray-900 p-8 shadow-lg"
        >
          <h1 className="text-center text-2xl font-bold">Unirse a la Sala</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="pin-sala" className="text-sm font-medium text-gray-300">
              PIN de la Sala
            </label>
            <input
              id="pin-sala"
              name="pin-sala"
              type="text"
              required
              placeholder="Ej: 123456"
              className="uppercase rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
            />
            {errorSala && (
              <p className="mt-2 text-sm text-red-500">{errorSala}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nickname" className="text-sm font-medium text-gray-300">
              Nickname
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              placeholder="Tu nombre"
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
            />
          </div>

          <SubmitButton />
        </form>

        <form action={crearSala} className="flex w-full flex-col gap-6 rounded-xl bg-gray-900 p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold">Crear Sala</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="nickname_host" className="text-sm font-medium text-gray-300">
              Tu Nickname
            </label>
            <input
              id="nickname_host"
              name="nickname_host"
              type="text"
              required
              placeholder="Tu nombre de anfitrión"
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
            />
          </div>

          <CreateRoomButton />
        </form>
      </div>
    </main>
  )
}
