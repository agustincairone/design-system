// Guía: "Reglas" = las decisiones del sistema en un solo lugar. Toda app nueva las sigue.

const RULES: { title: string; items: string[] }[] = [
  {
    title: "Colores",
    items: [
      "Sólo colores del sistema: un token o un paso de la escala (stone para los grises). Nunca un color a mano ni uno intermedio.",
      "Cada app tiene un solo color de acento. outfit-tracker usa neutro (negro en claro, blanco en oscuro). El rojo es sólo para borrar y errores.",
      "Bordes, divisores e inputs son siempre del mismo color: stone-200 en claro y stone-800 en oscuro.",
      "Un solo negro transparente: overlay, el fondo detrás de las hojas.",
      "El color blanco (puntitos, círculos de color) lleva siempre un borde gris de 1px. En oscuro, también el negro.",
    ],
  },
  {
    title: "Modo oscuro",
    items: [
      "Mamushka: cada capa que va encima es un paso más clara. Página 950, tarjeta 900, adentro 800 (inset, tile), encima 700 (raised), encima 600 (raised-2).",
      "Nunca poner algo más oscuro encima de algo más claro.",
      "Si un fondo de adentro coincide con el color del divisor y no se ve, se usa el color de la tarjeta.",
      "Lo elegido (fichas, círculos de color) se marca con borde blanco en oscuro y con el color de la app en claro.",
    ],
  },
  {
    title: "Fleje",
    items: [
      "Toda app arranca con el fleje: nombre, nombre en japonés (color de la app), un número general de puntitos y su etiqueta en mayúsculas, alineados con el nombre (número arriba, etiqueta abajo).",
      "En el celular, nombre y japonés van a la izquierda; números y etiquetas a la derecha.",
      "Margen de página igual en todas las apps: 20px arriba y 16px a los costados, así el fleje queda siempre en el mismo lugar.",
      "Debajo del fleje va una línea de puntos redondos de 2px que lo separa del resto de la app: stone-800 en oscuro (como los divisores) y stone-300 en claro, porque va sobre el fondo de la página.",
      "El nombre y el japonés nunca se cortan. La fecha y hora va en una línea de 25px si hay lugar, y en dos renglones de 20px (fecha arriba, hora abajo) si el fleje es angosto, con la etiqueta a la altura del japonés. El número general puede ser la fecha y hora en vivo (17/11 — 14:32:07): el día y la hora en el color del texto; la barra, el mes, el guion y los \":\" en stone-600 en oscuro y stone-500 en claro.",
      "Cada sección lleva su título con un dato a la derecha: etiqueta en mayúsculas y número de puntitos (un ícono, como el clima, va del tamaño del número). Cada sección con un dato distinto; si no hay uno útil, va sin dato.",
    ],
  },
  {
    title: "Cajas",
    items: [
      "Tres tamaños: L (sobre la página, blanca), M (adentro de otra caja, gris) y S (fichas). Siempre los mismos radios y rellenos.",
      "Las cajas no tienen borde: se separan sólo por el color de fondo.",
      "8px de separación entre cajas.",
      "Nada de adornos: ni barras de color al costado ni títulos en mayúsculas.",
    ],
  },
  {
    title: "Texto",
    items: [
      "Letra Geist. La letra de puntitos (Doto) es sólo para números: el del fleje y el dato de cada sección.",
      "Tamaños de letra sólo de la escala: 13, 15, 18, 20 y 26px (y los títulos grandes). El texto base es de 15px, el chico de 13px y los montos importantes de 26px. En las apps nunca se escribe un tamaño a mano: siempre la clase del DS. Si algo tiene que ser más grande, se sube un paso entero, nunca 1px.",
      "Negro = el color del texto del DS (foreground): stone-900 en claro y casi blanco en oscuro. Nunca #000000.",
      "El título de las cajas (Deuda total, Total del mes, Gastos fijos) va en negro, en 15px y medium (500); el monto abajo, en 26px.",
      "Labels de los inputs: gris, del mismo tamaño que el input (15px) y a 6px arriba.",
      "Dos etiquetas chicas: en mayúsculas (LOOP) y simple (outfit). Cada app usa una.",
      "Inputs con letra de 15px siempre. Cada app lleva maximum-scale=1 en index.html para que el iPhone no haga zoom.",
    ],
  },
  {
    title: "Controles",
    items: [
      "Botones de 40px de alto con letra de 15px. Uno solo con el color de la app por pantalla.",
      "Al apretar un botón no se mueve: sólo cambia el color.",
      "Todos los botones van en el tamaño normal. El chico sólo cuando el lugar lo pide (un botoncito de ícono). No hay botón grande.",
      "Botón de solo texto (Link): siempre subrayado, del color de la app y en el tamaño normal (15px).",
      "Cancelar tiene dos opciones: con borde rojo o suave (gris con texto rojo). El botón deshabilitado va en grises.",
      "Agregar algo nuevo = botón punteado con texto gris.",
      "Elegir entre 2 o 3 opciones = píldora. En un formulario, la píldora ocupa todo el ancho (fill). Más de 3 = tab de ancho completo, pegado arriba de la caja; si cada pestaña tiene un total, va en un segundo renglón chico.",
      "Pestaña elegida: texto del color de la app y una raya de 3px abajo, más gruesa que la línea divisoria de 1px. Sin relleno. Todas las pestañas miden lo mismo en todas las apps.",
      "Botón de volver: el chico redondo con borde (28px). Flechas para cambiar de mes o período: las chicas redondas rellenas de blanco (variante card; en modo oscuro, del color de las cajas), así se distinguen del volver. El mes en 15px y el año en gris.",
      "Elegir varias opciones = casillas (Checkbox) con su texto, cada una en su caja S, una abajo de la otra con 8px entre cajas. Toda la caja se puede tocar.",
      "Filas que se abren: el detalle aparece abajo en una caja M; si adentro hay otra fila que se abre, su detalle va en blanco.",
      "Campo con emoji: el emoji va a la izquierda en un botón redondo con borde, del mismo alto que el campo.",
      "Chips con cruz: al pasar el mouse sólo se pinta el fondo de gris. La cruz es del color del texto.",
      "El puntito es siempre de 4px. En la barra de abajo va sobre el borde inferior, cortado a la mitad, y los íconos van centrados.",
    ],
  },
  {
    title: "Ventanas",
    items: [
      "Todas las ventanas salen desde abajo (no hay ventana centrada ni panel lateral).",
      "No hay menús desplegables: las opciones de algo (el ⋮ de una fila, configurar un grupo) abren una hoja desde abajo con sus botones.",
      "Flotan con 16px de aire a los costados y abajo, ocupando el ancho que queda.",
      "Título de 18px con peso 500, con una línea divisoria de lado a lado debajo. La cruz es un botón redondo gris sin borde.",
      "Acordeón flotante: caja con título, \"¿Qué es esto?\" (abre una hoja con la explicación) y chevron al final. Al abrirlo crece hacia arriba desde donde está, sobre la página, con el fondo desenfocado como las hojas.",
    ],
  },
]

export function Rules() {
  return (
    <div className="grid gap-box-gap md:grid-cols-2">
      {RULES.map((g) => (
        <div key={g.title} className="rounded-box-l bg-card p-box-l">
          <p className="mb-3 text-lg font-medium">{g.title}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {g.items.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="dot mt-[7px] shrink-0 bg-foreground" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
