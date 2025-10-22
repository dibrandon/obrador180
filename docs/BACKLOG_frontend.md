# 🎨 Backlog Frontend – Obrador 180 graus MVP

> Plan detallado para el desarrollo de la **interfaz web artesanal** del proyecto.  
> Sin frameworks visuales (no Tailwind, no Bootstrap). Solo CSS.  
> Enfoque **mobile-first** con Flexbox y CSS variables.  
> Objetivo: crear una experiencia estética, funcional y coherente con la identidad del obrador.

---

## 🧭 Epic 1 – Configuración base del frontend

### 🎯 Meta
Tener un entorno React + Vite funcional y listo para desarrollo modular.

### ✅ Tareas
- [x] Crear proyecto con `npm create vite@latest` (React + JS)
- [x] Configurar `vite.config.js` (host dinámico + open automático)
- [ ] Estructurar carpetas:
```bash

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── assets/
├── public/
└── package.json

```
- [ ] Crear `src/services/api.js` → fetch de `/products`
- [ ] Configurar `index.css` como importador de estilos base (`reset`, `tokens`, `base`, `layout`)
- [ ] Verificar build local (`npm run build` + `npm run preview`)

### 🧠 Notas
- Mantener estructura simple y legible (sin alias complicados).
- Las rutas se manejarán con React Router recién en versión 0.4 (si aplica).

### 🎯 Criterio de finalización
El proyecto inicia con `npm run dev` sin errores y muestra una plantilla base con estilos importados.

---

## 🎨 Epic 2 – Sistema de diseño CSS

### 🎯 Meta
Definir un sistema de estilos escalable y coherente: tipografía, color, espaciado, sombras y consistencia visual.

### ✅ Tareas
- [ ] Crear carpeta `src/styles/` con:
```css

reset.css
tokens.css
base.css
layout.css
components/

````
- [ ] **reset.css:** normalize mínimo + box-sizing, márgenes, tipografía base.
- [ ] **tokens.css:** definir variables globales (`:root`):
```css
:root {
  /* Colores base */
  --color-bg: #f9f9f9;
  --color-primary: #3b4b53;
  --color-accent: #9e8266;
  --color-text: #222;
  --color-muted: #666;
  --color-border: #ddd;

  /* Tipografía */
  --font-title: "Cormorant Garamond", serif;
  --font-body: "Lato", sans-serif;

  /* Espaciado */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --radius: 8px;
  --shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
```

* [ ] **base.css:** tipografía, headings, párrafos, enlaces, botones.
* [ ] **layout.css:** contenedores, display flex, secciones con padding.
* [ ] **components/** → hojas específicas por componente (ej: `product-card.css`, `header.css`).
* [ ] Documentar el “kit de colores” en `/docs/design_palette.md`.

### 🧠 Notas

* Mantener todos los colores definidos como variables → nunca hex directo en componentes.
* Usar **paleta fría / sobria**: grises cálidos, beige, azules desaturados, tonos madera suave.
* Inspiración visual: obrador moderno, no pastelería clásica francesa.

### 🎯 Criterio de finalización

Todos los componentes usan variables CSS.
El estilo se percibe coherente, limpio y legible en móvil y desktop.

---

## 📱 Epic 3 – Layout responsive (mobile-first con Flexbox)

### 🎯 Meta

Crear un sistema flexible y responsivo, con base en Flexbox (sin Grid).

### ✅ Tareas

* [ ] Contenedor principal con `max-width: 1200px` y `margin: auto`.
* [ ] Layout mobile por defecto (columnas).
* [ ] Media queries para:

  * `@media (min-width: 480px)` → 2 columnas.
  * `@media (min-width: 768px)` → 3 columnas.
* [ ] Espaciado consistente con variables de `tokens.css`.
* [ ] Evitar saltos bruscos → usar `flex-wrap` y `gap`.
* [ ] Alinear imágenes con `object-fit: cover` + bordes redondeados.
* [ ] Footer fijo o sticky en mobile.

### 🎯 Criterio de finalización

El catálogo se adapta perfectamente de 1 a 3 columnas, sin solaparse.

---

## 🍰 Epic 4 – Componentes principales (UI)

### 🎯 Meta

Construir la interfaz del catálogo y las secciones base del MVP.

### ✅ Tareas

* [ ] Componente `ProductCard.jsx`

  * Renderiza nombre, imagen, descripción y precio.
  * Incluye botón WhatsApp.
* [ ] Página principal `App.jsx` (lista productos)
* [ ] Header (nombre del obrador o logo tipográfico)
* [ ] Footer (datos de contacto / copyright)
* [ ] Página “Sobre nosotros” (texto + imagen)
* [ ] Página “Contacto” (link a WhatsApp + dirección física)
* [ ] Componentes comunes:

  * `Button.jsx`
  * `Container.jsx`
  * `SectionTitle.jsx`
* [ ] Microinteracciones (hover, sombras suaves, transición 0.2s).

### 🎯 Criterio de finalización

La web es navegable, con componentes reutilizables, y mantiene estética artesanal uniforme.

---

## 💬 Epic 5 – Encargos por WhatsApp

### 🎯 Meta

Permitir el envío directo de un mensaje con el nombre del producto seleccionado.

### ✅ Tareas

* [ ] Botón en `ProductCard`: “Encargar por WhatsApp”
* [ ] Usar formato internacional (sin “+”) → `https://wa.me/346XXXXXXXX`
* [ ] Construir mensaje:

  ```js
  const msg = `Hola Obrador 180 graus, quiero encargar este pastel: ${product.name}`;
  ```
* [ ] `window.open()` con `encodeURIComponent(msg)`
* [ ] Probar desde móvil (abre app) y desktop (abre WhatsApp Web).
* [ ] Confirmar que no hay bloqueos CORS o redirección.
* [ ] Añadir icono WhatsApp SVG en botón (verde sobrio, no neón).

### 🎯 Criterio de finalización

El botón abre WhatsApp correctamente con el nombre del pastel, tanto en móvil como en escritorio.

---

## 🖌️ Epic 6 – Identidad visual y coherencia estética

### 🎯 Meta

Definir la identidad visual del sitio y aplicarla de manera consistente.

### ✅ Tareas

* [ ] Documento `design_palette.md` con:

  * Paleta principal (5–6 tonos)
  * Tipografía (Google Fonts)
  * Estilo de botones, enlaces y cards
* [ ] Revisión con PO/QA para coherencia visual.
* [ ] Aplicar favicon personalizado (logo obrador o ícono “180°”)
* [ ] Probar contraste de colores (AAA accesible)
* [ ] Afinar tipografía de títulos (tracking y peso)
* [ ] Definir variantes (light/dark si aplica)
* [ ] Capturas comparativas (antes / después).

### 🎯 Criterio de finalización

El sitio transmite identidad única: moderno, sobrio, artesanal.
Nada recuerda a plantillas genéricas o tonos “rosados de pastelería”.

---

## ☁️ Epic 7 – Despliegue y mantenimiento

### 🎯 Meta

Publicar la web y garantizar que el frontend comunique con el backend en producción.

### ✅ Tareas

* [ ] Crear cuenta en [Vercel](https://vercel.com/)
* [ ] Conectar repo GitHub → proyecto `obrador180-frontend`
* [ ] Configurar variables de entorno si aplica (`VITE_API_URL`)
* [ ] Validar conexión con backend (Render)
* [ ] Activar dominio temporal `.vercel.app`
* [ ] QA visual en móvil y desktop
* [ ] Preparar assets comprimidos (WebP, SVG optimizado)
* [ ] Documentar en README la URL final de producción.

### 🎯 Criterio de finalización

La web se visualiza correctamente online, conecta con la API y mantiene rendimiento estable.

---

## 🧾 Epic 8 – Documentación del frontend

### 🎯 Meta

Dejar instrucciones completas para mantenimiento y evolución.

### ✅ Tareas

* [ ] `README_frontend.md` → instalación, estructura, scripts
* [ ] `design_palette.md` → colores, fuentes, componentes
* [ ] `resumenDia2.md` y `resumenDia3.md` → avances de UI
* [ ] Capturas del diseño final (desktop y mobile)
* [ ] Incluir créditos (autor, QA, cliente)

### 🎯 Criterio de finalización

Cualquier desarrollador puede abrir el repo, entender la estructura y continuar el trabajo sin asistencia.

---

## 🧱 Estado actual del Frontend

**Versión:** `v0.3`
**Avance estimado:** ~20 %
**Última actualización:** 22 de octubre de 2025

---