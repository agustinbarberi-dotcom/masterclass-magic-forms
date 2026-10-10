# Roadmap

## Hecho
- Intercambiar las dos fotos de la landing: la primera (hero) es la de Maca de bata blanca con el certificado; la última (Quién soy) es el retrato de estudio.
- Centrar su cara tanto en la foto grande del hero como en el círculo chico de celular (recortes hechos desde la foto original, con la posición del rostro detectada automáticamente y verificada sobre la página).
- Píxel de Meta instalado (ID 1729816064767279, en `src/lib/event-config.ts`): PageView en cada página, Lead al registrarse y LeadCalificado cuando las 4 respuestas dan prioridad ALTA. No hace falta crear otro píxel ni una variable de entorno.

## Pendiente
- Foto chica en el encabezado, al costado del nombre "Macasoul" (pedido antes, nunca aplicado). Bloqueado: confirmar si todavía la quiere ahí o si alcanza con que sea la primera foto de la página.
- Links de contacto todavía sin conectar en `src/lib/event-config.ts` (Instagram, WhatsApp de contacto).
