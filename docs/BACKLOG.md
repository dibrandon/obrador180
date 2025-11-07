# 📋 Backlog General – Proyecto Obrador 180 graus MVP  
**Versión actual:** `v0.6 – Back-office funcional conectado`  
**Última actualización:** 7 de noviembre de 2025  
**Avance estimado:** ~65 %

> Documento maestro del proyecto. Resume la visión, los objetivos, las áreas de trabajo y los entregables esperados del MVP.  
> Los detalles técnicos y tareas específicas se encuentran en los backlogs dedicados de **backend** y **frontend**.

---

## 🧭 Visión General

**Objetivo:**  
Reforzar la identidad artesanal del obrador mediante una plataforma web moderna, simple y visualmente coherente, que permita mostrar el catálogo real de productos y recibir encargos por WhatsApp.

**Enfoque:**  
- Arquitectura **MERN** (MongoDB, Express, React, Node.js)  
- CSS artesanal, mobile-first, sin frameworks externos  
- MVP funcional en 4 semanas (octubre–noviembre 2025)  
- Entregable: versión pública navegable y autogestionable

---

## 🎯 Objetivos del MVP

| Categoría      | Meta principal |
|----------------|----------------|
| Comunicación   | Reposicionar la marca como obrador artesanal con narrativa visual coherente |
| Funcionalidad  | Permitir que un cliente vea el catálogo y encargue un pastel directamente por WhatsApp |
| Tecnología     | Construir un MVP totalmente custom sin WordPress ni plantillas externas |
| Mantenimiento  | Garantizar bajo costo, seguridad básica y facilidad de actualización |
| Escalabilidad  | Dejar base lista para versión 2.0 (pedidos online y dashboard de ventas) |

---

## ⚙️ Estructura General del Proyecto

```bash
obrador180/
├── frontend/   # UI pública + panel admin (React + Vite)
├── backend/    # API + lógica + conexión MongoDB
├── docs/       # Documentación, resúmenes y bitácoras
├── design/     # Paleta, tipografías, referencias visuales
└── README.md
````

---

## 🧩 Epics Globales

### 1️⃣ **Arquitectura y Setup**

> Crear entorno de desarrollo, repositorio y bases del proyecto.

* [x] Inicializar repositorio y estructura de carpetas
* [x] Configurar control de versiones (Git + GitHub)
* [x] Crear entorno MERN (frontend y backend funcionales)
* [x] Configurar `.env` y variables de entorno seguras
* [x] Verificar conexión local completa (API ↔ DB ↔ UI)

---

### 2️⃣ **Backend API & Lógica**

> Ver detalles en `BACKLOG_BACKEND.md`

* [x] Express server con rutas `/health`, `/products`
* [x] Modelo `Product` y seed inicial
* [x] Middleware `adminAuth` con `ADMIN_KEY`
* [x] Endpoints protegidos (`POST`, `PUT`, `DELETE`, `restore`, `inactive`)
* [x] Validaciones y manejo de errores JSON
* [ ] Endpoint `/orders` (reserva futura)
* [ ] Documentación API (Markdown simple)
* [ ] Configuración de deploy (Render)

---

### 3️⃣ **Frontend UI & Experiencia**

> Ver detalles en `BACKLOG_FRONTEND.md`

* [x] Configuración Vite + React (sin Tailwind)
* [x] Sistema CSS modular (base / layout / tokens / admin)
* [x] Catálogo dinámico conectado al backend
* [x] Subida de imágenes a Cloudinary (unsigned preset)
* [x] Panel **AdminForm** → alta de productos
* [x] Panel **AdminList** → edición, baja y restauración
* [ ] Dashboard con métricas básicas (v0.7)
* [ ] Login simple (JWT o clave admin)
* [ ] Home + Contacto + Identidad visual final
* [ ] Deploy frontend (Vercel)

---

### 4️⃣ **Infraestructura y Deploy**

> Conectar todas las piezas en entornos reales.

* [x] Cluster MongoDB Atlas (Free Tier)
* [x] Cloudinary configurado (`obrador_products`, unsigned)
* [ ] Render para backend (free tier)
* [ ] Vercel para frontend (free tier)
* [ ] Comunicación entre entornos (producción)
* [ ] Dominio del cliente conectado
* [ ] Verificación de rendimiento + SSL activo

---

### 5️⃣ **Documentación y QA**

> Registrar el proceso y asegurar calidad básica.

* [x] README general actualizado (v0.6)
* [x] Backlog general (este documento)
* [x] Backlogs frontend y backend actualizados
* [x] Resúmenes de desarrollo (`resumenDia1–5.md`)
* [ ] Manual de uso para el cliente (guía de back-office)
* [ ] QA final (flujo completo en móvil y desktop)
* [ ] Capturas + presentación final del MVP

---

## 🚀 Hitos del Proyecto

| Fase     | Objetivo                              | Fecha estimada | Entregable                           |
| -------- | ------------------------------------- | -------------- | ------------------------------------ |
| Semana 1 | Setup técnico + seed de productos     | 22–26 oct 2025 | API conectada + Mongo online         |
| Semana 2 | Catálogo visible + WhatsApp funcional | 27 oct – 1 nov | Frontend conectado y operativo       |
| Semana 3 | Back-office con CRUD completo         | 2–7 nov        | v0.6 Back-office funcional conectado |
| Semana 4 | Dashboard + Auth + Deploy             | 8–18 nov       | v0.7 Dashboard y autenticación       |

---

## 📄 Roles

| Rol                 | Persona                                  | Función                                       |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| 👨‍💻 Dev principal | Alejandro                                | Desarrollo MERN, arquitectura y documentación |
| 🧪 QA / PO          | Pyttu                                    | Revisión de experiencia y textos              |
| 🍰 Cliente          | Obrador 180 graus (Vilanova i la Geltrú) | Validación visual y contenido real            |

---

## 🧱 Estado global del proyecto

**Versión actual:** `v0.6 – Back-office funcional conectado`
**Avance estimado:** ~65 %
**Última actualización:** 7 de noviembre 2025

🟢 **Backend y panel administrativo operativos.**
🟠 Próximo foco: **Dashboard + autenticación (v0.7)**
🔵 MVP público previsto: **semana del 18 de noviembre 2025**.

```

---
