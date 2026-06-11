# Contexto del Proyecto: Juego tipo Kahoot / Modo Impostor

## Stack Tecnológico

- Frontend & Backend: Next.js 14+ (App Router).
- Estilos: Tailwind CSS.
- Base de Datos: PostgreSQL (Supabase).
- Tiempo Real: Supabase Realtime (WebSockets).

## Reglas de Arquitectura

1. TODO el código de backend se maneja mediante Server Actions (no usar /api routes a menos que sea estrictamente necesario para webhooks externos).
2. Los componentes que usen WebSockets o estado (useState/useEffect) deben llevar "use client" en la línea 1.
3. El estado de la sesión (ej. saber quién es el anfitrión o qué jugador es) se maneja con Cookies.
4. Diseño Mobile-First: La interfaz debe estar optimizada principalmente para pantallas de teléfonos celulares (usando Tailwind de manera responsiva)

## Esquema de Base de Datos Principal

- Sala (id, codigo, anfitrion_id, status)
- Jugador (id, sala_id, nickname, score)
- Ronda (id, sala_id, pregunta_id, impostor_id, status)
