# Obrador 180 graus – MVP Web  
**Versión actual:** `v0.7 – Demo online en producción (Render + Vercel + Cloudinary)`

Proyecto MVP desarrollado con stack **MERN (MongoDB, Express, React, Node.js)**  
Objetivo: **reposicionar Obrador 180 graus como pastelería artesanal** y recuperar su clientela fiel mediante una presencia digital clara, estética y funcional.

---

## 🧭 Objetivos generales

- Mostrar catálogo de productos reales con fotos, precios y descripciones.  
- Permitir encargos directos vía **WhatsApp Business**.  
- Facilitar la gestión del catálogo desde un **panel administrativo sencillo** (sin conocimientos técnicos).  
- Simplificar mantenimiento y minimizar costes de hosting.  
- Desplegar una versión pública funcional en menos de 4 semanas.

---

## 🗂️ Estructura del proyecto

```bash
obrador180/
├── frontend/   # React + Vite (UI pública y panel admin)
├── backend/    # Node + Express (API + conexión Mongo)
├── docs/       # Documentación, bitácoras y resúmenes de desarrollo
├── design/     # Wireframes, paleta y referencias visuales
└── README.md
````

---

##  Stack técnico

 **Frontend:** React + Vite
 **Backend:** Node.js + Express
 **Base de datos:** MongoDB Atlas
 **Hosting:**

  * Frontend → [Vercel](https://vercel.com) *(free tier)*
  * Backend → [Render](https://render.com) *(free tier)*
 **Imágenes:** [Cloudinary](https://cloudinary.com) *(preset unsigned → `obrador_products`)*
 **Mensajería:** enlace directo a WhatsApp Business (`wa.me`)

---

## 🧩 Estado actual – Versión v0.7

El proyecto alcanza la **fase de demo online pública**, con backend y frontend desplegados, integración total de Cloudinary y panel administrativo operativo desde la web.

### ✅ Logros del Bloque 3 (Día 6)

 **Backend** operativo en **Render**, conectado a **MongoDB Atlas**, con CORS, rate-limit y `adminAuth`.
 **Frontend** operativo en **Vercel** con **SPA rewrites** y conexión estable a la API.
 **Integración Cloudinary** para subida de imágenes sin autenticación (unsigned preset).
 **WhatsApp CTA funcional**, con número y mensaje dinámico definidos en variables de entorno.
 **Panel administrativo completo**: creación, edición, baja lógica y restauración.
 **Versionado unificado:** entorno `v0.7-demo` reflejado en UI y documentación.
 **Deploy reproducible** documentado en `docs/resumenDeploy.md`.

El sistema permite ya **gestionar completamente el catálogo desde producción** y realizar demostraciones en vivo.

---

## 🚀 Scripts básicos

### Frontend

```bash
cd frontend
npm run dev      # entorno local
npm run build    # compilar versión producción
```

### Backend

```bash
cd backend
npm run dev      # servidor local en puerto 4000
npm start        # ejecución en producción
```

---

## 🌐 URLs de producción

| Componente            | URL                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| 🧱 Backend (API)      | [https://obrador180.onrender.com](https://obrador180.onrender.com)                               |
| 🌍 Frontend (público) | [https://obrador180.vercel.app](https://obrador180.vercel.app)                                   |
| 🔑 Backoffice (admin) | [https://obrador180.vercel.app/admin?k=luna2025](https://obrador180.vercel.app/admin?k=****) |

---

## 📅 Plan de desarrollo

| Bloque | Foco principal                          | Entregable / Estado                    |
| ------ | --------------------------------------- | -------------------------------------- |
| 1️⃣    | Setup técnico + arquitectura MERN       | ✅ Repositorios locales operativos      |
| 2️⃣    | Catálogo real + productos con imágenes  | ✅ Catálogo público navegable           |
| 3️⃣    | Back-office (CRUD + conexión DB)        | ✅ CRUD administrativo conectado (v0.6) |
| 4️⃣    | Deploy fullstack (Render + Vercel + QA) | ✅ Demo online estable (v0.7)           |
| 5️⃣    | Dashboard + métricas básicas            | 🕐 En preparación (v0.8)               |

---

## 👥 Roles

* **Dev / PM:** Alejandro
* **PO / QA:** Pyttu
* **Cliente:** Obrador 180 graus (Vilanova i la Geltrú)

---

## 📄 Documentación de progreso

* `docs/resumenDia3.md` → Finalización Frontend (v0.5)
* `docs/resumenDia4.md` → Integración Catálogo-Backend
* `docs/resumenDia5.md` → Back-office CRUD completo (v0.6)
* `docs/resumenDeploy.md` → Deploy completo Render + Vercel (v0.7)

---

## 🔖 Próxima versión

**Objetivo v0.8 – “Dashboard & Auth”**

* Login simple basado en JWT o clave admin persistente.
* Dashboard con estadísticas básicas (productos activos, pedidos simulados).
* Helper `authHeader()` para entorno local.
* Mejoras visuales y footer informativo.

---

## 🧾 Licencia

Proyecto interno sin licencia pública.
© 2025 – Alejandro.