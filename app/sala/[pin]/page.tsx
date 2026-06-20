/* eslint-disable */
'use client'

import React from 'react'
import { supabase } from '@/utils/supabase'
import { iniciarPartida, enviarRespuesta, enviarVoto, siguienteRonda, forzarTransicion } from '@/app/actions'

import type { Jugador, DatosSala } from './types'
import VistaLobby from './components/VistaLobby'
import VistaEscribiendo from './components/VistaEscribiendo'
import VistaDiscusion from './components/VistaDiscusion'
import VistaVotando from './components/VistaVotando'
import VistaResultados from './components/VistaResultados'
import VistaPodio from './components/VistaPodio'

export default function SalaPage({ params }: { params: Promise<{ pin: string }> }) {
  const { pin } = React.use(params)
  const [jugadores, setJugadores] = React.useState<Jugador[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isHost, setIsHost] = React.useState(false)
  const [datosSala, setDatosSala] = React.useState<DatosSala | null>(null)
  const [miJugadorId, setMiJugadorId] = React.useState<string | null>(null)
  const [textoRespuesta, setTextoRespuesta] = React.useState('')
  const [haRespondido, setHaRespondido] = React.useState(false)
  const [haVotado, setHaVotado] = React.useState(false)

  React.useEffect(() => {
    const isHostCookie = document.cookie.includes(`host_sala=${pin}`);
    if (isHostCookie) {
      setIsHost(true);
    }
  }, [pin]);

  React.useEffect(() => {
    const jugadorId = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jugador_id='))
      ?.split('=')[1]
    if (jugadorId) {
      setMiJugadorId(jugadorId)
    }
  }, [])

  React.useEffect(() => {
    if (datosSala?.fase === 'escribiendo') {
      setHaRespondido(false)
      setHaVotado(false)
      setTextoRespuesta('')
    }
  }, [datosSala?.ronda_actual, datosSala?.fase])

  React.useEffect(() => {
    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function init() {
      try {
        const { data: salaData } = await supabase
          .from('Sala')
          .select('*')
          .eq('codigo', pin)
          .single()

        if (isMounted && salaData) {
          setDatosSala(salaData)

          const { data: jugadoresData } = await supabase
            .from('Jugador')
            .select('*')
            .eq('sala_id', salaData.id)

          if (isMounted && jugadoresData) setJugadores(jugadoresData)
        }
      } catch (err) {
        console.error('Error loading sala:', err)
      } finally {
        if (isMounted) setLoading(false)
      }

      // 1. Limpieza radical previa
      supabase.getChannels().forEach((ch) => supabase.removeChannel(ch));

      // 2. Crear canal con nombre estático
      channel = supabase.channel(`sala-${pin}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Jugador' }, (payload) => {
          if (isMounted) setJugadores((prev) => [...prev, payload.new as Jugador]);
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Jugador' }, (payload) => {
          if (isMounted) setJugadores((prev) => prev.map(j => j.id === payload.new.id ? { ...j, ...payload.new as Jugador } : j));
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Sala' }, (payload) => {
          console.log("🔥 REALTIME SALA:", payload.new);
          if (isMounted) {
            setDatosSala((prev) => {
              if (!prev || prev.id !== payload.new.id) return prev;
              return { ...prev, ...payload.new } as DatosSala;
            });
          }
        })
        .subscribe((status) => {
          console.log('📡 Status WebSockets:', status);
        });
    }

    init()

    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [pin])

  async function handleVotar(jugadorId: string) {
    if (!miJugadorId || !datosSala) return
    await enviarVoto(miJugadorId, jugadorId, datosSala.id)
    setHaVotado(true)
  }

  async function handleEnviarRespuesta(overrideAnswer?: string) {
    const answer = overrideAnswer ?? textoRespuesta
    if (!miJugadorId || !datosSala || !answer.trim()) return
    await enviarRespuesta(miJugadorId, answer, datosSala.id)
    setHaRespondido(true)
  }

  if (datosSala?.fase === 'podio' || datosSala?.status === 'finalizado') {
    return (
      <VistaPodio
        jugadores={jugadores}
        isHost={isHost}
        salaId={datosSala.id}
      />
    )
  }

  if (datosSala?.status === 'jugando' && datosSala?.fase === 'discusion') {
    return (
      <VistaDiscusion
        datosSala={datosSala}
        jugadores={jugadores}
      />
    )
  }

  if (datosSala?.status === 'jugando' && datosSala?.fase === 'votando') {
    return (
      <VistaVotando
        datosSala={datosSala}
        jugadores={jugadores}
        miJugadorId={miJugadorId}
        haVotado={haVotado}
        onVotar={handleVotar}
      />
    )
  }

  if (datosSala?.status === 'jugando' && datosSala?.fase === 'resultados') {
    return (
      <VistaResultados
        datosSala={datosSala}
        jugadores={jugadores}
        isHost={isHost}
        pin={pin}
        onSiguienteRonda={() => siguienteRonda(datosSala.id, pin)}
      />
    )
  }

  if (datosSala?.status === 'jugando' && datosSala?.fase === 'escribiendo') {
    return (
      <VistaEscribiendo
        datosSala={datosSala}
        jugadores={jugadores}
        miJugadorId={miJugadorId}
        textoRespuesta={textoRespuesta}
        onTextoRespuestaChange={setTextoRespuesta}
        haRespondido={haRespondido}
        onEnviarRespuesta={handleEnviarRespuesta}
      />
    )
  }

  return (
    <VistaLobby
      pin={pin}
      loading={loading}
      jugadores={jugadores}
      isHost={isHost}
      onIniciarPartida={() => iniciarPartida(pin)}
    />
  )
}
