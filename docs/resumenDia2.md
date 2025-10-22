# 🧭 Resumen Día 2 – Organización y backlog estratégico

## 📊 Resumen rápido

| Área              | Estado | Comentario                                                  |
| ----------------- | ------ | ----------------------------------------------------------- |
| Documentación     | ✅      | Reorganizada y expandida en tres backlogs específicos       |
| Backend (API)     | ✅      | Backlog técnico completo, corregidos ejemplos y fences MD   |
| Frontend (UI)     | ✅      | Backlog ampliado con diseño artesanal y sistema CSS base    |
| Planificación     | ✅      | Estructura de epics globales y tareas detalladas por área   |
| Desarrollo código | 🔜      | Pausado temporalmente para consolidar planificación         |
| Próximo paso      | 🔜      | Crear sistema de estilos (`reset.css`, `tokens.css`, etc.)  |

---

## 🗂️ Estructura documental actualizada

Durante esta jornada se invirtió el tiempo en **ordenar y consolidar la arquitectura documental del proyecto**.  
El objetivo fue dejar listo el terreno para avanzar sin improvisación, sabiendo exactamente qué toca en cada frente.

Nuevos documentos creados y actualizados:

```bash

docs/
├── BACKLOG_GENERAL.md      # visión global del MVP
├── BACKLOG_BACKEND.md      # tareas técnicas del servidor y la base de datos
├── BACKLOG_FRONTEND.md     # tareas de UI, diseño artesanal y CSS base
├── resumenDia1.md
└── resumenDia2.md

```

### Esta división permite visualizar el proyecto como tres planos coordinados:

1. **General:** dirección y objetivos.
2. **Backend:** motor lógico y conexión a datos.
3. **Frontend:** experiencia visual y emocional del usuario.

---

## 🧩 Principales avances conceptuales

### 🔹 1. Clarificación de epics
Cada backlog se reescribió por *épicas temáticas* (setup, productos, diseño, WhatsApp, deploy, documentación).  
Esto permite medir avances y dependencias de forma más realista.

### 🔹 2. Correcciones técnicas
En el backlog de backend se detectó y corrigió un error de formato (triple backticks sin cerrar) que rompía el render.  
Ahora los ejemplos de código (`Product.js`, `routes/products.js`) están perfectamente formateados y legibles.

### 🔹 3. Ampliación del enfoque de diseño
Se estableció que **no se usarán frameworks de CSS** (ni Tailwind ni Bootstrap).  
El proyecto apostará por un sistema **artesanal mobile-first con Flexbox**,  
incluyendo variables globales de color, tipografía y espaciado (tokens CSS).

### 🔹 4. Planificación de identidad visual
Se definió la necesidad de un documento complementario `design_palette.md`  
donde quedarán registrados los colores, fuentes y componentes visuales del obrador.

---

## ⏳ Reflexión y uso del tiempo

> Día dedicado íntegramente a organización y planificación estratégica.

Aunque no hubo avances de código visibles, el trabajo de hoy sienta las bases de un desarrollo coherente y sostenible.  
Se invirtieron las horas en ordenar, escribir, revisar y pensar el flujo de trabajo futuro  
una inversión clave para evitar caos en fases posteriores.

---

## 🧱 Próximos pasos

- Iniciar implementación del **sistema CSS base**:  
  `reset.css`, `tokens.css`, `base.css`, `layout.css`.
- Crear primer componente visual `ProductCard`.
- Integrar fetch real de `/products` en el frontend.
- Documentar avances y primeras capturas visuales en `resumenDia3.md`.
