# Plan de diseño Frontend – Obrador 180 graus

Versión: v0.9-pre  
Rama principal de diseño: `feature/frontend-redesing`
Perfecto, vamos a dejar esto ordenado como si fuera el “guion maestro” del frontend Odilio-Vogue™ 😄
Sin código, solo mapa mental + épicas claras.

---

## 0️⃣ Contexto: qué queremos conseguir

**Meta:** pasar de *MVP funcional* a *MVP que parece web de pastelería boutique real*, siguiendo el estilo que definimos:

* Fondo crema suave, nada de rosa chillón.
* Tipografía mezcla **serif elegante + sans limpia**.
* Hero claro: qué somos, dónde estamos, cómo se encarga.
* Cartas con fotos bien recortadas, botón de WhatsApp protagonista.
* Navbar pegado arriba en scroll, simple, sin cosas “techie”.
* Todo **mobile-first**, sin sustos raros en móvil.

Y todo eso sin cargarnos nada del backend / admin: solo **piel pública**.

---

## 1️⃣ Dónde estamos hoy (resumen rápido)

Ya tenemos:

* ✅ `o-shell`, `o-main`, `o-section` y footer montados.
* ✅ Paleta y tokens en `tokens.css` con colores “obrador” razonables.
* ✅ Hero con título, párrafo, meta y CTA “Ver carta”.
* ✅ Cards de producto con foto, nombre, descripción, precio y botón de WhatsApp.
* ✅ Grid responsive con densidades (`compact / cozy / roomy`) a nivel CSS.
* ✅ Branch separada `feature/frontend-redesing` para poder romper sin miedo.

Por pulir / arreglar:

* ⏳ Navbar: sticky + centrado + espaciados + comportamiento de links.
* ⏳ Densidad: toggle roto, no hay control visible ni estado claro.
* ⏳ Falta sección **“Nosotros”**.
* ⏳ Textos aún “técnicos” en algunos sitios, no tan pastelería real.
* ⏳ Backoffice no está alineado visualmente con el nuevo estilo (de momento lo dejamos en “más funcional que bonito”).

---

## 2️⃣ Objetivo visual final (“Odilio Vogue style”)

Queremos que la home pública transmita:

1. **Arriba del todo:**

   * Barra limpia, con logo/título + 2–3 enlaces (Inicio, Carta, Nosotros).
   * Siempre visible al hacer scroll (sticky), sin romper estética móvil.

2. **Hero:**

   * Título claro: *Pastelería artesanal de Vilanova*
   * Subtexto que suene humano: ingredientes nobles, encargos personalizados.
   * Un único botón bien gordo: *Ver carta* que te baja a `#carta`.

3. **Carta:**

   * Cards aireadas, fotos bonitas, precio claro y botón de encargo.
   * Densidad configurable (2–4 columnas en desktop, 1–2 en móvil según modo).

4. **Nosotros:**

   * Una sección corta que cuente quiénes son, dónde están, cómo trabajan.
   * CTA secundario: un enlace al WhatsApp o a Google Maps.

5. **Footer:**

   * Discreto, con año, nombre del obrador y versión.

---

## 3️⃣ Épicas que quedan por delante (BIEN detalladas)

### ÉPICA 1 – Sistema visual sólido (tokens + layout)

**Objetivo:** dejar la base visual blindada para no seguir parchando.

**Estado actual:**

* Tokens: definidos (fondos, texto, cta, bordes, radios, etc.).
* Layout base: `o-shell`, `o-main`, `o-section`, `o-footer` implementados.

**Acciones (sin código, pero claras):**

1. **Revisar tokens vs diseño real:**

   * Alinear colores de fondo y texto a lo que se ve en pantalla (el “blanco crema Vogue”, no rosa).
   * Definir bien qué variable se usa en:

     * fondo general de página,
     * fondo de secciones,
     * fondo de cards.

2. **Congelar tipografías:**

   * Confirmar que los estilos del hero y header usan **serif** solo donde aporta (marca/títulos) y **sans** en textos largos.
   * Evitar que el admin y la parte pública se pisen fuentes.

3. **Limpiar restos legacy:**

   * Eliminar classes viejas que ya no usemos (`.header`, `.brand` viejas, toggles muertos).
   * Dejar sólo las clases que forman parte de la maqueta actual.

👉 Resultado: un CSS de base donde cada variable tiene un propósito, sin basura ni duplicados. Esto reduce sorpresas más adelante.

---

### ÉPICA 2 – Navbar “de revista”: sticky, usable y limpio

**Objetivo:** header que se siente app/web seria, no demo.

**Estado actual:**

* Header con `o-header` y `HeaderNav`.
* No está sticky y el layout en móvil se ve comprimido/pegado.
* Links funcionan, pero UX y alineación no convencen.

**Acciones:**

1. **Sticky bien resuelto:**

   * Hacer que la barra se quede arriba al scrollear (sin parpadeos ni solaparse con el hero).
   * Asegurar que en móvil no tapa contenido relevante (margen superior adecuado o padding en la sección hero).

2. **Alineación y espaciado:**

   * Centrar visualmente el contenido: que el bloque marca+nav no se pegue a la izquierda.
   * Ajustar paddings horizontales para que respire en escritorio y móvil.

3. **Marca única y consistente:**

   * Decidir un solo tratamiento de “Obrador 180 graus” (el que más te gusta) y usarlo tanto en:

     * la marca del header,
     * opcionalmente en el hero, pero sin duplicar texto raro.
   * Asegurar que al hacer click en la marca vas a `#top` (inicio) siempre.

4. **Enlaces de navegación claros:**

   * “Inicio” → `#top`
   * “Carta” → `#carta`
   * “Nosotros” → `#nosotros`
   * Ajustar espaciado entre enlaces y estados hover/active (mínimo: cambio de fondo suave y/o color de texto).

5. **Comportamiento en móvil:**

   * Evitar que queden tres pill demasiado pegadas; si hace falta, que pasen a dos filas pero sin romper el layout.
   * Revisar tamaños de letra y padding para dedos gordos de padre medio dormido 😅

👉 Resultado: barra que te acompaña siempre, parece de marca cuidada y no molesta en móvil.

---

### ÉPICA 3 – Carta / catálogo realmente usable

**Objetivo:** que el listado de productos sea fácil de escanear y de encargar, tanto en móvil como en desktop.

**Estado actual:**

* Grid y cards ya funcionan.
* Botón “Encargar por WhatsApp” ok.
* Densidades definidas a nivel CSS, pero el toggle visual está roto / ausente.

**Acciones:**

1. **Revisión visual de cards:**

   * Confirmar que todas las fotos se ven con el mismo ratio, sin “saltitos”.
   * Chequear que el espacio entre cards en distintas densidades no se vuelve ni demasiado apretado ni excesivamente aireado.
   * Ajustar tipografías: título bien fuerte, descripción legible pero secundaria, precio bien visible.

2. **Botón de WhatsApp protagonista:**

   * Ver que el CTA dentro de la card se lee bien, no compite con nada raro (ni colores chillones).
   * Asegurar que el texto es claro y corto: *Encargar por WhatsApp* está bien para MVP.

3. **Densidades como feature real (no solo CSS):**

   * Volver a activar el toggler (el componente que ya tenías) y conectarlo con las clases de densidad (`data-density`).
   * Ver que en móvil:

     * `compact` = más productos a la vista (2 col si cabe), sin romper la legibilidad.
     * `cozy` = vista estándar.
     * `roomy` = foco en foto y texto largo.
   * Decidir si guardas la elección en `localStorage` para que el cliente siempre vea la web como le gusta (lo tenías ideado, es solo respetarlo).

4. **Texto de la sección Carta:**

   * Revisar copy de “Nuestra carta / descripción” para que suene más a obrador real y menos a texto de demo (“Hechos con ingredientes nobles…” va bien, sólo afinar tonos).

👉 Resultado: la carta se siente tienda real, se entiende, y puedes navegarla cómodo en cualquier dispositivo.

---

### ÉPICA 4 – Sección “Nosotros” (storytelling corto pero potente)

**Objetivo:** dar contexto humano: quiénes son, dónde están, por qué confiar.

**Estado actual:**

* Enlaces prevén un `#nosotros` pero la sección no existe todavía.

**Acciones:**

1. **Definir bloque “Nosotros”:**

   * Una sección `o-section` con:

     * Título tipo: *Quiénes somos* / *El obrador*.
     * 1–2 párrafos cortos: historia, enfoque artesanal, ubicación (Vilanova / Sitges).
     * Lista corta o frase sobre tipos de encargos (cumples, eventos, etc.).

2. **CTA secundario:**

   * Un enlace textual o botón más discreto que el del hero:

     * “Escríbenos por WhatsApp para hablar de tu celebración”.
     * Opcional enlace a Maps si en un futuro quieres mostrar dirección.

3. **Opcional visual:**

   * Reservar espacio para una foto futura del obrador o de un pastel (aunque ahora sea solo un bloque de color / placeholder).

4. **Coherencia con el resto:**

   * Reusar las mismas tipografías y colores que el hero, sin inventar una tercera estética.

👉 Resultado: cuando el cliente baja, no solo ve productos, también siente que hay personas detrás.

---

### ÉPICA 5 – Estado “Lista para demo cliente”

**Objetivo:** dejar la parte pública en un estado donde tú puedas decir: *“esto es nuestro MVP de web”* sin pedir perdón.

**Acciones:**

1. **Revisión mobile-first:**

   * Mirar en móvil real (tu teléfono): navbar, hero, carta, botón WhatsApp.
   * Ajustar lo que se sienta incómodo: tamaños de letra, espacios, scroll a anclas.

2. **Accesibilidad mínima:**

   * Comprobar contrastes del texto principal y del CTA.
   * Asegurar que los botones tienen estados hover/focus razonables.

3. **Textos finales:**

   * Ajustar microcopy: títulos, subtítulos, tagline bajo el CTA del hero.
   * Quitar anglicismos o tecnicismos donde no hagan falta.

4. **Limpieza de código / CSS:**

   * Eliminar comentarios de pruebas (`CTA TEST`, etc.).
   * Borrar estilos muertos que ya no se usan en ningún componente.

5. **Docs / captura para README:**

   * Tener claro que versión del diseño es esta (`v0.9-pre` o similar).
   * Preparar 1–2 screenshots bonitas para README y para enseñar al cliente.

👉 Resultado: puedes entrar con el cliente, abrir la web en el móvil, y se ve y siente como “su” pastelería online.

---

### ÉPICA 6 – (Opcional próxima fase) Alinear backoffice con el nuevo look

No es imprescindible para el MVP que vas a enseñar, pero a futuro:

* Llevar la misma paleta/estilo soft al panel admin (sin recargar).
* Unificar botones, tipografías y espaciados básicos.
* Tener la sensación de que admin y público son “la misma marca”.

---