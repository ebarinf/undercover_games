'use client'

import React from 'react'
import { unirseSala, crearSala } from './actions'

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'unirse' | 'iniciar'>('unirse')
  const [errorSala, setErrorSala] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)
  const [modalAbierto, setModalAbierto] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorSala(null)
    setPending(true)
    const formData = new FormData(e.currentTarget)

    try {
      if (activeTab === 'unirse') {
        const result = await unirseSala(formData)
        if (result && 'error' in result) {
          setErrorSala(result.error)
        }
      } else {
        formData.set('nickname_host', formData.get('nickname') as string)
        await crearSala(formData)
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-cover bg-center p-4 lg:p-8"
      style={{
        backgroundImage: "image-set(url('/madera-oscura.webp') type('image/webp'), url('/madera-oscura.jpg') type('image/jpeg'))",
      }}
    >

        {modalAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div
              className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-lg border border-neutral-700 bg-[#ede6cd] p-6 shadow-2xl"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #80808018 1px, transparent 1px), linear-gradient(to bottom, #80808018 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 font-mono text-xs text-neutral-100 transition-[filter,transform] hover:brightness-110 active:scale-95"
              >
                X
              </button>

              <h2 className="mb-5 break-words text-balance text-center font-typewriter text-lg font-bold tracking-wide text-neutral-900">
                REGLAS DE OPERACIÓN — CÓDIGO: INFILTRADO
              </h2>

              <div className="flex flex-col gap-4 font-typewriter text-sm leading-relaxed text-neutral-800">
                <p className="break-words text-balance">
                  <strong>OBJETIVO:</strong> Este es un juego de infiltración diseñado para ser jugado
                  con amigos cara a cara. Cada agente debe usar su propio dispositivo móvil.
                </p>
                <p className="break-words text-balance">
                  <strong>CREACIÓN:</strong> Un agente debe actuar como Anfitrión y seleccionar CREAR
                  SALA. Esto generará un CÓDIGO DE SALA único.
                </p>
                <p className="break-words text-balance">
                  <strong>CONEXIÓN:</strong> Los demás agentes deben ingresar el CÓDIGO DE SALA
                  compartido y un NICKNAME en la pantalla principal para unirse a la frecuencia.
                </p>
                <p className="break-words text-balance">
                  <strong>DESARROLLO DE LA RONDA:</strong> Se enviará una pregunta secreta a todos los
                  agentes. Sin embargo, un agente (EL INPOSTOR) recibirá una pregunta ligeramente
                  diferente. Todos deben escribir respuestas que protejan su identidad.
                </p>
                <p className="break-words text-balance">
                  <strong>VOTACIÓN:</strong> Después de leer las respuestas, los agentes deben votar por
                  quién creen que es el impostor. Tu objetivo es descubrirlo... o engañar a todos si tú
                  eres el infiltrado.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="mt-5 w-full rounded-lg bg-[#5b6a38] px-4 py-2.5 font-typewriter text-xs font-bold tracking-widest text-neutral-100 shadow-md transition-[filter,transform] duration-150 hover:brightness-110 active:scale-95"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="relative w-full rounded-lg border border-neutral-700 shadow-2xl lg:max-w-175"
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
            loading="lazy"
            className="pointer-events-none absolute left-0 -top-11 z-10 w-full select-none lg:-top-22"
          />


          <div className="px-5 pb-6 pt-14">
            <h1 className="mb-4 break-words text-balance text-center font-typewriter text-2xl font-bold tracking-wide text-neutral-900">
              INGRESO DE AGENTES
            </h1>

            <div className="relative flex rounded-full border-2 border-[#5b6a38] bg-[#5b6a38] mb-6">
              <div
                className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-[#f4ebd0] shadow-inner transition-transform duration-200 ease-in-out will-change-transform ${
                  activeTab === 'unirse' ? 'translate-x-0' : 'translate-x-full'
                }`}
              />

              <input
                type="radio"
                id="unirse"
                name="tab"
                className="sr-only"
                checked={activeTab === 'unirse'}
                onChange={() => setActiveTab('unirse')}
              />
              <input
                type="radio"
                id="iniciar"
                name="tab"
                className="sr-only"
                checked={activeTab === 'iniciar'}
                onChange={() => setActiveTab('iniciar')}
              />

              <label
                htmlFor="unirse"
                className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 text-center font-typewriter text-sm tracking-wider transition-colors duration-300 ${
                  activeTab === 'unirse' ? 'text-neutral-900' : 'text-neutral-100'
                }`}
              >
                UNIRSE A MISIÓN
              </label>
              <label
                htmlFor="iniciar"
                className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 text-center font-typewriter text-sm tracking-wider transition-colors duration-300 ${
                  activeTab === 'iniciar' ? 'text-neutral-900' : 'text-neutral-100'
                }`}
              >
                INICIAR OPERATIVO
              </label>
            </div>

            <div className="flex flex-col gap-4">
              {activeTab === 'unirse' && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="pin-sala"
                    className="font-typewriter text-md font-bold tracking-wider text-neutral-700"
                  >
                    CÓDIGO DE ACCESO (PIN)
                  </label>
                  <input
                    id="pin-sala"
                    name="pin-sala"
                    type="text"
                    required
                    placeholder="EJ: 123456"
                    className="rounded-md border border-neutral-600 bg-neutral-800/5 px-3 py-2 font-mono text-md uppercase text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-[border-color,box-shadow] duration-150 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
                  />
                  {errorSala && (
                    <p className="font-typewriter text-xs text-red-600">{errorSala}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="nickname"
                  className="font-typewriter text-md font-bold tracking-wider text-neutral-700"
                >
                  APODO DE AGENTE (NICKNAME)
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="rounded-md border border-neutral-600 bg-neutral-800/5 px-3 py-2 font-mono text-md text-neutral-800 placeholder-neutral-500 shadow-inner outline-none transition-[border-color,box-shadow] duration-150 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-5 w-full rounded-lg bg-[#5b6a38] px-4 py-3 font-typewriter text-md tracking-widest text-neutral-100 shadow-md transition-[filter,transform] duration-150 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {activeTab === 'unirse'
                ? pending
                  ? 'INGRESANDO...'
                  : 'INGRESAR A MISIÓN'
                : pending
                  ? 'CREANDO...'
                  : 'CREAR SALA'}
            </button>

            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="mt-4 w-full rounded-lg bg-[#5b6a38] px-4 py-2.5 font-typewriter text-lg tracking-widest text-neutral-100 shadow-md transition-[filter,transform] duration-150 hover:brightness-110 active:scale-95"
            >
              ¿CÓMO JUGAR?
            </button>
          </div>
        </form>
    </main>
  )
}
