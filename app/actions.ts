'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/utils/supabase'
import { MAX_RONDAS } from './constants'

export async function unirseSala(formData: FormData) {
    const pin = (formData.get('pin-sala') as string).toUpperCase()
    const nickname = formData.get('nickname') as string

    const { data: sala, error } = await supabase
        .from('Sala')
        .select('id')
        .eq('codigo', pin)
        .single()

    if (error || !sala) {
        return { error: 'El código de la sala no existe' }
    }

    const { data: jugador, error: insertError } = await supabase
        .from('Jugador')
        .insert({ sala_id: sala.id, nickname })
        .select('id')
        .single()

    if (insertError || !jugador) {
        throw insertError ?? new Error('Error al crear jugador')
    }

    const cookieStore = await cookies()
    cookieStore.set('jugador_id', jugador.id, { path: '/' })

    redirect(`/sala/${pin}`)
}

export async function crearSala(formData: FormData) {
    await supabase.rpc('limpiar_salas_vacias')

    const nicknameHost = formData.get('nickname_host') as string
    const ALFABETO = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'

    function generarPin(): string {
        let pin = ''
        for (let i = 0; i < 5; i++) {
            pin += ALFABETO[Math.floor(Math.random() * ALFABETO.length)]
        }
        return pin
    }

    let pin = generarPin()
    for (;;) {
        const { data: existente } = await supabase
            .from('Sala')
            .select('id')
            .eq('codigo', pin)
            .single()
        if (!existente) break
        pin = generarPin()
    }

    const { data: sala, error: salaError } = await supabase
        .from('Sala')
        .insert({ codigo: pin, status: 'esperando' })
        .select('id')
        .single()

    if (salaError || !sala) {
        console.error("❌ ERROR DE SUPABASE:", salaError);
        return;
    }

    const { data: jugador, error: insertError } = await supabase
        .from('Jugador')
        .insert({ sala_id: sala.id, nickname: nicknameHost })
        .select('id')
        .single()

    if (insertError || !jugador) {
        console.error("❌ ERROR AL INSERTAR JUGADOR:", insertError);
        return;
    }

    const cookieStore = await cookies()
    cookieStore.set('host_sala', pin, { path: '/' })
    cookieStore.set('jugador_id', jugador.id, { path: '/' })

    redirect(`/sala/${pin}`)
}

export async function enviarRespuesta(jugadorId: string, respuesta: string, salaId: string) {
    const { error: updateError } = await supabase
        .from('Jugador')
        .update({ respuesta_actual: respuesta })
        .eq('id', jugadorId)

    if (updateError) {
        console.error('❌ ERROR AL GUARDAR RESPUESTA:', updateError)
        return
    }

    const { data: jugadores, error: selectError } = await supabase
        .from('Jugador')
        .select('respuesta_actual')
        .eq('sala_id', salaId)

    if (selectError) {
        console.error('❌ ERROR AL VERIFICAR RESPUESTAS:', selectError)
        return
    }

    const todosRespondieron = jugadores.every(
        (j) => j.respuesta_actual != null && j.respuesta_actual !== '',
    )

    if (todosRespondieron) {
        const { error: faseError } = await supabase
            .from('Sala')
            .update({ fase: 'votando' })
            .eq('id', salaId)

        if (faseError) {
            console.error('❌ ERROR AL CAMBIAR FASE:', faseError)
        }
    }
}

export async function enviarVoto(miJugadorId: string, idVotado: string, salaId: string) {
    const { error: updateError } = await supabase
        .from('Jugador')
        .update({ voto_actual: idVotado })
        .eq('id', miJugadorId)

    if (updateError) {
        console.error('❌ ERROR AL GUARDAR VOTO:', updateError)
        return
    }

    const { data: jugadores, error: selectError } = await supabase
        .from('Jugador')
        .select('id, voto_actual')
        .eq('sala_id', salaId)

    if (selectError) {
        console.error('❌ ERROR AL VERIFICAR VOTOS:', selectError)
        return
    }

    const todosVotaron = jugadores.every((j) => j.voto_actual != null)

    if (!todosVotaron) return

    const { data: sala } = await supabase
        .from('Sala')
        .select('impostor_id')
        .eq('id', salaId)
        .single()

    if (!sala) return

    const conteoVotos: Record<string, number> = {}
    jugadores.forEach((j) => {
        if (j.voto_actual) {
            conteoVotos[j.voto_actual] = (conteoVotos[j.voto_actual] || 0) + 1
        }
    })

    let idMasVotado = ''
    let maxVotos = 0
    for (const [id, count] of Object.entries(conteoVotos)) {
        if (count > maxVotos) {
            maxVotos = count
            idMasVotado = id
        }
    }

    const idsConMax = Object.entries(conteoVotos)
        .filter(([, count]) => count === maxVotos)
        .map(([id]) => id)
    const hayEmpate = idsConMax.length > 1

    const impostorAtrapado = !hayEmpate && idMasVotado === sala.impostor_id

    if (impostorAtrapado) {
        const { data: votantes } = await supabase
            .from('Jugador')
            .select('id, puntos')
            .eq('voto_actual', sala.impostor_id)
            .eq('sala_id', salaId)

        for (const v of votantes ?? []) {
            await supabase
                .from('Jugador')
                .update({ puntos: (v.puntos ?? 0) + 100 })
                .eq('id', v.id)
        }
    } else {
        const { data: impostor } = await supabase
            .from('Jugador')
            .select('puntos')
            .eq('id', sala.impostor_id)
            .single()

        if (impostor) {
            await supabase
                .from('Jugador')
                .update({ puntos: (impostor.puntos ?? 0) + 200 })
                .eq('id', sala.impostor_id)
        }
    }

    const { error: faseError } = await supabase
        .from('Sala')
        .update({ fase: 'resultados' })
        .eq('id', salaId)

    if (faseError) {
        console.error('❌ ERROR AL CAMBIAR FASE:', faseError)
    }
}

export async function siguienteRonda(salaId: string, pin: string) {
    const { data: sala, error: salaError } = await supabase
        .from('Sala')
        .select('id, preguntas_usadas, ronda_actual')
        .eq('id', salaId)
        .single()

    if (salaError) {
        console.error(salaError);
        return;
    }

    if (!sala) return

    if (sala.ronda_actual >= MAX_RONDAS) {
        await supabase
            .from('Sala')
            .update({ fase: 'podio', status: 'finalizado' })
            .eq('id', salaId)

        await supabase
            .from('Jugador')
            .update({ respuesta_actual: null, voto_actual: null })
            .eq('sala_id', salaId)

        return
    }

    const { error: clearError } = await supabase
        .from('Jugador')
        .update({ respuesta_actual: null, voto_actual: null })
        .eq('sala_id', salaId)

    if (clearError) {
        console.error('❌ ERROR AL LIMPIAR JUGADORES:', clearError)
        return
    }

    const preguntasUsadas: string[] = sala.preguntas_usadas ?? []

    const { data: jugadores, error: jugError } = await supabase
        .from('Jugador')
        .select('id')
        .eq('sala_id', sala.id)

    if (jugError || !jugadores || jugadores.length === 0) {
        console.error('❌ ERROR AL OBTENER JUGADORES:', jugError)
        return
    }

    const impostor = jugadores[Math.floor(Math.random() * jugadores.length)]

    let pregQuery = supabase.from('Preguntas').select('*')

    if (preguntasUsadas.length > 0) {
        pregQuery = pregQuery.not('id', 'in', `(${preguntasUsadas.join(',')})`)
    }

    const { data: preguntas, error: pregError } = await pregQuery

    if (pregError) {
        console.error('❌ ERROR AL OBTENER PREGUNTAS:', pregError)
        return
    }

    if (!preguntas || preguntas.length === 0) {
        throw new Error('¡Se acabaron las preguntas para esta partida!')
    }

    const elegida = preguntas[Math.floor(Math.random() * preguntas.length)]

    const nuevasUsadas = [...preguntasUsadas, elegida.id]
    const nuevaRonda = (sala.ronda_actual ?? 0) + 1

    const { error: updateError } = await supabase
        .from('Sala')
        .update({
            fase: 'escribiendo',
            impostor_id: impostor.id,
            pregunta_real: elegida.pregunta_real,
            pregunta_impostor: elegida.pregunta_impostor,
            preguntas_usadas: nuevasUsadas,
            ronda_actual: nuevaRonda,
        })
        .eq('id', salaId)

    if (updateError) {
        console.error('❌ ERROR AL ACTUALIZAR SALA:', updateError)
    }
}

export async function iniciarPartida(pin: string) {
    const { data: sala, error: salaError } = await supabase
        .from('Sala')
        .select('id, preguntas_usadas')
        .eq('codigo', pin)
        .single()

    if (salaError || !sala) {
        console.error('❌ SALA NO ENCONTRADA:', salaError)
        return
    }

    const preguntasUsadas: string[] = sala.preguntas_usadas ?? []

    const { data: jugadores, error: jugError } = await supabase
        .from('Jugador')
        .select('id')
        .eq('sala_id', sala.id)

    if (jugError || !jugadores || jugadores.length === 0) {
        console.error('❌ ERROR AL OBTENER JUGADORES:', jugError)
        return
    }

    const impostor = jugadores[Math.floor(Math.random() * jugadores.length)]

    let pregQuery = supabase.from('Preguntas').select('*')

    if (preguntasUsadas.length > 0) {
        pregQuery = pregQuery.not('id', 'in', `(${preguntasUsadas.join(',')})`)
    }

    const { data: preguntas, error: pregError } = await pregQuery

    if (pregError) {
        console.error('❌ ERROR AL OBTENER PREGUNTAS:', pregError)
        return
    }

    if (!preguntas || preguntas.length === 0) {
        throw new Error('¡Se acabaron las preguntas para esta partida!')
    }

    const elegida = preguntas[Math.floor(Math.random() * preguntas.length)]

    const nuevasUsadas = [...preguntasUsadas, elegida.id]

    const { error: updateError } = await supabase
        .from('Sala')
        .update({
            status: 'jugando',
            fase: 'escribiendo',
            impostor_id: impostor.id,
            pregunta_real: elegida.pregunta_real,
            pregunta_impostor: elegida.pregunta_impostor,
            preguntas_usadas: nuevasUsadas,
            ronda_actual: 1,
        })
        .eq('codigo', pin)

    if (updateError) {
        console.error('❌ ERROR AL ACTUALIZAR SALA:', updateError)
    }
}

export async function reiniciarPartida(salaId: string) {
    const { error: errorSala } = await supabase
        .from('Sala')
        .update({
            fase: 'esperando',
            status: 'esperando',
            ronda_actual: 0,
            preguntas_usadas: null,
            impostor_id: null,
            pregunta_real: null,
            pregunta_impostor: null,
        })
        .eq('id', salaId)

    if (errorSala) {
        console.error('❌ ERROR AL REINICIAR SALA:', errorSala)
        return
    }

    const { error: errorJugadores } = await supabase
        .from('Jugador')
        .update({ puntos: 0, respuesta_actual: null, voto_actual: null })
        .eq('sala_id', salaId)

    if (errorJugadores) {
        console.error('❌ ERROR AL REINICIAR JUGADORES:', errorJugadores)
    }
}

export async function resetearSala(pin: string) {
    const { data: sala } = await supabase
        .from('Sala')
        .select('id')
        .eq('codigo', pin)
        .single()

    if (!sala) return

    await supabase
        .from('Sala')
        .update({
            status: 'esperando',
            fase: 'esperando',
            impostor_id: null,
            pregunta_real: null,
            pregunta_impostor: null,
            preguntas_usadas: [],
            ronda_actual: 0,
        })
        .eq('id', sala.id)

    await supabase
        .from('Jugador')
        .update({ puntos: 0, respuesta_actual: null, voto_actual: null })
        .eq('sala_id', sala.id)
}
