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
    <main className="flex min-h-screen items-center justify-center bg-[#2c1d11] p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <form
          onSubmit={handleUnirseSala}
          className="relative flex w-full flex-col gap-5 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-8 shadow-xl"
          style={{
            backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="absolute left-0 top-6 z-20 -translate-x-1/2 bg-neutral-800 w-2 h-6 rounded-sm shadow-md" />
          <div className="absolute left-0 top-20 z-20 -translate-x-1/2 bg-neutral-800 w-2 h-6 rounded-sm shadow-md" />

          <div className="absolute left-4 top-0 z-10 -translate-y-1/2 rounded-t-md border border-neutral-700 border-b-0 bg-[#ede6cd] px-5 py-1.5 font-typewriter text-sm font-bold tracking-wider text-neutral-800 shadow-sm">
            CASO #001
          </div>

          <h1 className="break-words text-balance text-center font-typewriter text-2xl font-bold tracking-wide text-neutral-900">
            Unirse a la Sala
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pin-sala"
              className="font-typewriter text-sm font-semibold tracking-wide text-neutral-700"
            >
              PIN de la Sala
            </label>
            <input
              id="pin-sala"
              name="pin-sala"
              type="text"
              required
              placeholder="Ej: 123456"
              className="uppercase rounded-md border border-neutral-500 bg-black/5 px-4 py-2 font-mono text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-all duration-150 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
            />
            {errorSala && (
              <p className="mt-1 font-typewriter text-sm text-red-600">{errorSala}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="font-typewriter text-sm font-semibold tracking-wide text-neutral-700"
            >
              Nickname
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              placeholder="Tu nombre"
              className="rounded-md border border-neutral-500 bg-black/5 px-4 py-2 font-mono text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-all duration-150 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
            />
          </div>

          <SubmitButton />
        </form>

        <form
          action={crearSala}
          className="relative flex w-full flex-col gap-5 rounded-lg border border-neutral-700 bg-[#f4ebd0] p-8 shadow-xl"
          style={{
            backgroundImage: 'linear-gradient(to right, #80808020 1px, transparent 1px), linear-gradient(to bottom, #80808020 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="absolute left-0 top-6 z-20 -translate-x-1/2 bg-neutral-800 w-2 h-6 rounded-sm shadow-md" />
          <div className="absolute left-0 top-20 z-20 -translate-x-1/2 bg-neutral-800 w-2 h-6 rounded-sm shadow-md" />

          <div className="absolute -right-6 -top-6 z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-800/70 bg-transparent p-2 text-sm font-bold text-red-800/70 mix-blend-multiply rotate-[-15deg]">
            <span className="font-typewriter uppercase tracking-widest">Ronda N</span>
          </div>

          <h1 className="break-words text-balance text-center font-typewriter text-2xl font-bold tracking-wide text-neutral-900">
            Crear Sala
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname_host"
              className="font-typewriter text-sm font-semibold tracking-wide text-neutral-700"
            >
              Tu Nickname
            </label>
            <input
              id="nickname_host"
              name="nickname_host"
              type="text"
              required
              placeholder="Tu nombre de anfitrión"
              className="rounded-md border border-neutral-500 bg-black/5 px-4 py-2 font-mono text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-all duration-150 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
            />
          </div>

          <CreateRoomButton />
        </form>
      </div>
    </main>
  )
}
