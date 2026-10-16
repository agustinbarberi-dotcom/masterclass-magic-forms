# Roadmap

## Hecho
- El opt-in lleva directamente a la página de gracias, sin pasar por preguntas, y mantiene el envío del registro en segundo plano.
- Intercambiar las dos fotos de la landing: la primera (hero) es la de Maca de bata blanca con el certificado; la última (Quién soy) es el retrato de estudio.
- Centrar su cara tanto en la foto grande del hero como en el círculo chico de celular (recortes hechos desde la foto original, con la posición del rostro detectada automáticamente y verificada sobre la página).
- Píxel de Meta instalado (ID 1729816064767279, en `src/lib/event-config.ts`): PageView en cada página, Lead al registrarse y LeadCalificado cuando las 4 respuestas dan prioridad ALTA. No hace falta crear otro píxel ni una variable de entorno.
- Subir el primer botón "Reservar mi lugar" para que se vea sin hacer scroll: se achicó el aire del hero (sup, foto chica, títulos, línea de fecha) y el botón quedó a ~590 px en la ventana de la usuaria y a ~610 px en celular.
- En celular, la línea de fecha/hora/Online/Cupos limitados cortaba palabras a la mitad: ahora cada dato queda en una sola línea y la fila se quiebre limpia en dos. En pantalla ancha sigue en una línea.

## Pendiente
- Foto chica en el encabezado, al costado del nombre "Macasoul" (pedido antes, nunca aplicado). Bloqueado: confirmar si todavía la quiere ahí o si alcanza con que sea la primera foto de la página.
- Links de contacto todavía sin conectar en `src/lib/event-config.ts` (Instagram, WhatsApp de contacto).
