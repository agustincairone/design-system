// Guía: qué trajo cada versión del sistema, en simple, de la más nueva a la más vieja.
// Al publicar una versión nueva, se agrega arriba de todo.
export type Version = { v: string; date: string; items: string[] }

export const VERSIONS: Version[] = [
  {
    v: "v0.40.0",
    date: "26/11",
    items: [
      "no-coke pasa al sistema, con su rojo (el mismo de borrar).",
      "Piezas de no-coke: número grande que gira, barra de progreso, fichas de un dato, carrusel de fichas y botón para deslizar.",
    ],
  },
  {
    v: "v0.39.0",
    date: "24/11",
    items: [
      "La hoja puede llevar un botón al lado de la cruz (el micrófono de pay). pay ya usa las hojas y el botón flotante del sistema.",
      "Hojas que miden siempre lo mismo: el caso más alto puede marcar el alto de todas (el aviso de link repetido de bookmarks), y lo que cambia mientras se mira se acomoda sin agrandar la hoja (al dictar un gasto en pay, el micrófono se achica).",
      "Final de página a 8px de la barra de abajo (screen-end-gap), para pantallas donde la caja principal ocupa el alto que sobra (registrar en outfit).",
    ],
  },
  {
    v: "v0.38.0",
    date: "23/11",
    items: ["Pantalla de carga al abrir la app, la misma en todas: un círculo que gira, el nombre de la app y su japonés, en claro y en oscuro. Reemplaza al \"Cargando...\"."],
  },
  {
    v: "v0.37.0",
    date: "23/11",
    items: ["Número que gira al aparecer (efecto tragamonedas): en un segundo frena en el monto real. Lo usan la deuda y el total del mes de pay."],
  },
  {
    v: "v0.36.0",
    date: "22/11",
    items: [
      "Lista que se edita (de bookmarks): cambiar el nombre ahí mismo, borrar, ítems de adentro y + Agregar al final.",
      "La misma lista en una hoja, con Cancelar y Confirmar (los gastos fijos de pay). Si hay cambios sin guardar, pregunta antes de salir.",
      "Filas que se abren con líneas y sangría, como la lista que se edita. Los montos quedan en una misma columna.",
    ],
  },
  {
    v: "v0.35.1",
    date: "22/11",
    items: [
      "Resumen antes de guardar en dos columnas: la imagen chica a la izquierda y todos los datos a la derecha.",
      "Los pasos de una hoja que piden un solo dato quedan centrados.",
    ],
  },
  {
    v: "v0.35.0",
    date: "22/11",
    items: [
      "Piezas de bookmarks: ficha y fila de link, campo de línea, botón de IA, botón flotante y píldora con íconos.",
      "Regla: la app instalable no lleva theme_color en el manifest.",
    ],
  },
  { v: "v0.34.0", date: "22/11", items: ["Las barras del celular toman el color de la página, en claro y en oscuro."] },
  {
    v: "v0.33.0",
    date: "21/11",
    items: [
      "El aviso va siempre abajo al centro.",
      "Hojas con pestañas que miden siempre lo mismo.",
      "Barra de abajo blanca, y de vidrio mientras pasa contenido por detrás.",
      "Campo con sugerencias. Los desplegables se abren siempre abajo y muestran hasta 6 opciones.",
    ],
  },
  {
    v: "v0.32.0",
    date: "21/11",
    items: ["Piezas de wine: buscador, estrellas, ficha alta, datos con puntaje, escala corta, hojas con pasos y filtro."],
  },
  { v: "v0.31.0", date: "20/11", items: ["La letra más chica es la de 11 (sale la de 10)."] },
  { v: "v0.30.0", date: "20/11", items: ["Letra de 11 para las fichas chicas."] },
  { v: "v0.29.0", date: "18/11", items: ["Bordes que se ven igual en claro y en oscuro."] },
  { v: "v0.28.0", date: "18/11", items: ["La guía se ordena por grupos, sin páginas de comparación."] },
  { v: "v0.27.0", date: "18/11", items: ["Chips a 4px uno del otro, letra de 30 y botón de texto rojo para cancelar."] },
  { v: "v0.26.0", date: "18/11", items: ["Letras de 36 y 48 para los números grandes de LOOP."] },
  {
    v: "v0.25.0",
    date: "18/11",
    items: [
      "Escalas de letra y de espacios completas.",
      "Al pasar el mouse, todo se aclara un tono.",
      "Filas que se abren, casillas y menú desplegable más cómodo.",
    ],
  },
  { v: "v0.24.0", date: "18/11", items: ["Texto base de 15 y títulos de hoja de 18."] },
  { v: "v0.23.0", date: "18/11", items: ["Botón blanco, para las flechas que cambian de mes."] },
  {
    v: "v0.22.0",
    date: "17/11",
    items: ["Bordes de los campos que se ven sobre el fondo claro.", "Pestañas con la rayita del color de la app.", "pay vuelve al verde."],
  },
  { v: "v0.21.0", date: "17/11", items: ["El fleje se acomoda en pantallas angostas."] },
  { v: "v0.20.0", date: "17/11", items: ["Fecha en vivo en el fleje, línea de puntitos y acordeón flotante."] },
  { v: "v0.19.0", date: "17/11", items: ["Fleje y títulos de sección.", "Página de Reglas en la guía."] },
  {
    v: "v0.18.0 a v0.18.4",
    date: "17/11",
    items: ["En oscuro, cada capa es un poco más clara que la de abajo.", "Ajustes de la hoja y de la barra de abajo en el celular."],
  },
  { v: "v0.17.0", date: "17/11", items: ["El iPhone ya no hace zoom al tocar un campo."] },
  { v: "v0.16.0", date: "17/11", items: ["Un solo negro transparente detrás de las hojas, y colores de todo bien y de atención.", "No queda ningún color a mano."] },
  { v: "v0.15.0", date: "16/11", items: ["El mismo borde para los campos y los divisores."] },
  { v: "v0.14.0 y v0.14.1", date: "16/11", items: ["outfit pasa a gris neutro.", "Al abrir una hoja, la cruz ya no queda marcada."] },
  { v: "v0.13.0 a v0.13.3", date: "16/11", items: ["Estado vacío y nombre de los campos.", "Aro blanco en oscuro para lo elegido."] },
  { v: "v0.12.0", date: "16/11", items: ["Barra de abajo."] },
  { v: "v0.11.0 a v0.11.2", date: "16/11", items: ["Hojas desde abajo y confirmación."] },
  { v: "v0.10.0", date: "16/11", items: ["Colores y tira de días (de outfit)."] },
  { v: "v0.9.0", date: "16/11", items: ["Fichas con foto."] },
  { v: "v0.8.0", date: "16/11", items: ["Botones de 40px, Cancelar suave y Agregar con borde punteado."] },
  { v: "v0.7.0", date: "16/11", items: ["Botón principal deshabilitado en gris y chip con cruz."] },
  { v: "v0.6.0", date: "16/11", items: ["Pestañas (de outfit)."] },
  { v: "v0.5.0", date: "16/11", items: ["Chips."] },
  { v: "v0.4.0", date: "16/11", items: ["Una sola píldora, en dos tamaños."] },
  { v: "v0.2.0 y v0.3.0", date: "16/11", items: ["Las piezas de outfit, para comparar con las del sistema."] },
  { v: "v0.1.0", date: "15/11", items: ["Primera versión: el sistema como paquete para las apps."] },
]
