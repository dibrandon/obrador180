perfecto — acá tenés el **`README.md` actualizado a la versión v0.6**, reflejando todo lo alcanzado en el Día 5, manteniendo el tono profesional del original, pero con el progreso real del proyecto y la hoja de ruta hacia el próximo bloque.

---

````markdown
# Obrador 180 graus – MVP Web  
**Versión actual:** `v0.6 – Back-office funcional conectado`

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

## ⚙️ Stack técnico

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Base de datos:** MongoDB Atlas
* **Hosting:**

  * Frontend → [Vercel](https://vercel.com) *(free tier)*
  * Backend → [Render](https://render.com) *(free tier)*
* **Imágenes:** [Cloudinary](https://cloudinary.com) *(preset unsigned → `obrador_products`)*
* **Mensajería:** enlace directo a WhatsApp Business (`wa.me`)

---

## 🧩 Estado actual – Versión v0.6

El proyecto alcanza la **fase de back-office funcional conectado**, completando el CRUD administrativo con autenticación básica y flujo completo de imágenes.

### ✅ Logros del Bloque 2 (Día 5)

* **Backend seguro con `adminAuth`** (`ADMIN_KEY` + Basic Auth).
* **Rutas protegidas:**

  * `POST /products` → alta
  * `PUT /products/:id` → edición
  * `DELETE /products/:id` → baja lógica (`isActive =false`)
  * `GET /products/inactive` → listados archivados
  * `PUT /products/:id/restore` → restauración
* **Frontend administrativo** con:

  * `AdminForm` → alta de productos y subida automática a Cloudinary.
  * `AdminList` → edición en línea, baja y restauración.
  * `api.js` → refactor con `handle()` unificado y nuevos helpers.
* **UI renovada:** estilo limpio “roco abuela 90s”, responsivo y con feedback visual.
* **Cloudinary unsigned upload** funcional y probado en entorno real.

El sistema permite ya **gestionar completamente el catálogo sin tocar la base de datos.**

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
```

---

## 📅 Plan de desarrollo

| Bloque | Foco principal                                | Entregable / Estado                   |
| ------ | --------------------------------------------- | ------------------------------------- |
| 1️⃣    | Setup técnico + arquitectura MERN             | ✅ Repositorios locales operativos     |
| 2️⃣    | Catálogo real + productos con imágenes        | ✅ Catálogo público navegable          |
| 3️⃣    | Back-office (alta / edición / baja / restore) | ✅ CRUD administrativo completo (v0.6) |
| 4️⃣    | Autenticación + Dashboard estadístico         | 🕐 En progreso (v0.7)                 |
| 5️⃣    | Deploy y QA final                             | ⏳ Previsto tras v0.7                  |

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

---

## 🔖 Próxima versión

**Objetivo v0.7 – “Dashboard & Auth”**

* Login simple basado en JWT / clave admin.
* Estadísticas básicas: número de productos activos, ventas simuladas.
* Refinamiento UI desktop + móvil.
* Inicio del proceso de deploy dual (Vercel + Render).

---

## 🧾 Licencia

Proyecto interno sin licencia pública.
© 2025 – Alejandro.
