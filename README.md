# Obrador 180 graus – MVP Web

Proyecto MVP desarrollado con stack **MERN (MongoDB, Express, React, Node.js)**  
Objetivo: **reposicionar Obrador 180 graus como pastelería artesanal** y recuperar su clientela fiel mediante una presencia digital clara, estética y funcional.

---

## 🧭 Objetivos

- Mostrar catálogo de pasteles con fotos y descripciones reales.  
- Permitir encargos directos vía **WhatsApp Business**.  
- Simplificar mantenimiento y minimizar costes de hosting.  
- Desplegar una versión pública funcional en menos de 4 semanas.

---

## 🗂️ Estructura del proyecto
```bash
obrador180/
├── frontend/   # React + Vite (UI pública)
├── backend/    # Node + Express (API + conexión Mongo)
├── docs/       # Documentación, planes y notas
├── design/     # Wireframes, colores, referencias visuales
└── README.md

```
---

## ⚙️ Stack Técnico

- **Frontend:** React + Vite + TailwindCSS (opcional)  
- **Backend:** Node.js + Express  
- **Base de datos:** MongoDB Atlas  
- **Hosting:**  
  - Frontend → [Vercel](https://vercel.com) *(free tier)*  
  - Backend → [Render](https://render.com) *(free tier)*  
- **Imágenes:** [Cloudinary](https://cloudinary.com) *(free tier)*  
- **Mensajería:** enlace directo a WhatsApp Business (`wa.me`)

---

## Scripts básicos

### Frontend

```bash
cd frontend
npm run dev      # entorno local
npm run build    # compilar versión producción

### Backend

```bash
cd backend
npm run dev      # servidor local en puerto 4000
```

---

## 🧩 Plan de desarrollo

| Semana | Foco principal                     | Entregable                                 |
| ------ | ---------------------------------- | ------------------------------------------ |
| 1      | Setup técnico + arquitectura MERN  | Servidores locales corriendo + repo activo |
| 2      | Catálogo y productos reales        | Catálogo navegable con botón WhatsApp      |
| 3      | Estilo visual + identidad de marca | Home + Sobre nosotros + Contacto           |
| 4      | Deploy y QA final                  | MVP público en Vercel + Render             |

---

## 👥 Roles

- **Dev:** Alejandro
- **PO / QA:** Pyttu
- **Cliente:** Obrador 180 graus *(Vilanova i la Geltrú)*

---

## 🧾 Estado actual (cierre de Semana 1)

- ✅ Repositorio estructurado y versionado.
- ✅ Frontend funcional con Vite, host dinámico y apertura automática.
- ✅ Backend Express operativo con `/health` y `/products`.
- ✅ Conexión estable con MongoDB Atlas.
- ✅ Seed de productos (3 pasteles de ejemplo).
- ✅ Documentación de proceso (`docs/bitacora_semana1.md`).

Próximo paso → Mostrar catálogo real en frontend con botón de **encargo por WhatsApp**.

---

## 📄 Licencia

Proyecto interno sin licencia pública (por ahora).
© 2025 – Alejandro.
