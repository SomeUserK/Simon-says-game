# Juego de Patrón de Memoria en React

## Descripción:

Desarrolla una aplicación en React que implemente el juego "Patrón de Memoria" (similar al clásico juego "Simon Says"). El objetivo del juego es que los jugadores memoricen y repitan un patrón de colores que se muestra en secuencia. Cada vez que el jugador repite correctamente el patrón, se agrega un nuevo paso, haciendo el juego progresivamente más desafiante. Si el jugador comete un error, el juego termina y se muestra la puntuación obtenida.

## Características Sugeridas:

1. **Interfaz de Usuario:**

   - Diseña una interfaz de usuario simple y clara con un minimo de cuatro botones de colores diferentes (pueden ser círculos, cuadrados o figuras).
   - Cada botón debe iluminarse cuando forme parte de la secuencia mostrada o cuando el jugador lo seleccione.
   - Muestra la puntuación actual en la interfaz para que el jugador pueda ver su progreso.

2. **Lógica del Juego:**

   - Al iniciar el juego, genera una secuencia de botones que se ilumina en un orden aleatorio.
   - El jugador debe hacer clic en los botones siguiendo el mismo orden que se mostró en la secuencia.
   - Si el jugador acierta, se agrega un nuevo paso al patrón y se repite el proceso.
   - Si el jugador se equivoca, el juego termina y muestra la puntuación final.

3. **Nivel de Dificultad Progresiva:**

   - Cada vez que el jugador acierta el patrón, la secuencia aumenta en dificultad añadiendo un nuevo paso.
   - (Opcional) Puedes implementar modos de juego con diferentes niveles de dificultad, como aumentar la velocidad en que se muestra la secuencia.

4. **Reinicio del Juego:**

   - Al finalizar cada partida (cuando el jugador comete un error), muestra un botón de "Reiniciar" o "Intentar de nuevo".
   - (Opcional) Muestra también la puntuación más alta obtenida en la sesión actual.

5. **Manejo de Estado con React:**

   - Utiliza `useState` y `useEffect` para gestionar el estado del juego: la secuencia de colores, el patrón actual, la puntuación, y si el juego está en curso o ha terminado.
   - Usa `useEffect` para controlar la animación o visualización de la secuencia de colores cuando sea el turno del juego de mostrar el patrón.

6. **Diseño Responsivo:**

   - Asegúrate de que el juego sea responsivo y se vea bien tanto en pantallas de escritorio como en dispositivos móviles (minimo de 280px), ajustando el diseño con CSS según el tamaño de la pantalla.

7. **Documentación y Comentarios:**
   - Documenta el código de manera clara, explicando la lógica detrás del juego y cómo se gestiona el estado en React.

## Características Extras (Opcional):

1. **Sonidos:**

   - Implementa efectos sonoros para cada botón. Cuando el juego muestra el patrón o el jugador hace clic en un botón, se reproduce un sonido diferente por cada color.
   - Puedes usar la biblioteca <a href="https://www.npmjs.com/package/use-sound" target="_blank">**use-sound**</a> o el objeto `Audio` de JavaScript para reproducir los sonidos.

2. **Temas Personalizados:**

   - Permite al jugador seleccionar diferentes esquemas de color para los botones, lo que añadirá una capa de personalización estética al juego.

3. **Modo Cronómetro:**

   - Agrega un cronómetro para que los jugadores deban repetir la secuencia en un tiempo limitado, añadiendo presión al juego.

4. **Tabla de Líderes Local:**
   - Guarda la puntuación más alta del jugador en el almacenamiento local del navegador y muestra una tabla de líderes con las mejores puntuaciones.
