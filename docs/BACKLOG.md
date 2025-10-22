# 📋 Backlog General – Proyecto Obrador 180 graus MVP

> Documento maestro del proyecto. Resume la visión, los objetivos, las áreas de trabajo y los entregables esperados del MVP.  
> Los detalles técnicos y tareas específicas se encuentran en los backlogs dedicados de **backend** y **frontend**.

---

## 🧭 Visión General

**Objetivo:**  
Reforzar la identidad artesanal del obrador mediante una plataforma web moderna, simple y visualmente coherente, que permita mostrar el catálogo real de productos y recibir encargos por WhatsApp.

**Enfoque:**  
- Arquitectura **MERN** (MongoDB, Express, React, Node.js)  
- Sin frameworks visuales (CSS artesanal, mobile-first con Flexbox)  
- MVP funcional en 4 semanas (de octubre a noviembre 2025)  
- Entregable: versión pública navegable y autogestionable

---

## 🎯 Objetivos del MVP

| Categoría      | Meta principal |
|----------------|----------------|
| Comunicación   | Reposicionar la marca como obrador artesanal, con narrativa visual coherente |
| Funcionalidad  | Permitir que un cliente vea el catálogo y encargue un pastel directamente por WhatsApp |
| Tecnología     | Construir un MVP totalmente custom sin WordPress ni frameworks externos |
| Mantenimiento  | Garantizar bajo costo, seguridad básica y facilidad de actualización |
| Escalabilidad  | Dejar base lista para versión 2.0 (pedidos online y administración) |

---

## ⚙️ Estructura General del Proyecto

```bash
obrador180/
├── frontend/ # UI pública (React + Vite + CSS artesanal)
├── backend/ # API + lógica + conexión MongoDB
├── docs/ # Documentación, resúmenes y bitácoras
├── design/ # Paleta, tipografías, referencias visuales
└── README.md
```


---

## 🧩 Epics Globales

### 1️⃣ **Arquitectura y Setup**
> Crear entorno de desarrollo, repositorio y bases del proyecto.
- [x] Inicializar repositorio y estructura de carpetas
- [x] Configurar control de versiones (Git + GitHub)
- [x] Crear entorno MERN (frontend y backend funcionales)
- [x] Configurar `.env` y variables de entorno seguras
- [ ] Verificar conexión local completa (API ↔ DB ↔ UI)

---

### 2️⃣ **Backend API & Lógica**
> Ver detalles en `BACKLOG_BACKEND.md`
- [x] Express server con rutas `/health`, `/products`
- [x] Modelo `Product` y seed inicial
- [ ] Validaciones, manejo de errores y middlewares
- [ ] Endpoint `/orders` (reserva futura)
- [ ] Configuración de deploy (Render)
- [ ] Documentación API (Swagger o Markdown simple)

---

### 3️⃣ **Frontend UI & Experiencia**
> Ver detalles en `BACKLOG_FRONTEND.md`
- [x] Configuración Vite + React (sin Tailwind)
- [ ] Sistema CSS artesanal (Flexbox, mobile-first)
- [ ] Render dinámico de productos
- [ ] Botón de encargo por WhatsApp
- [ ] Home + Contacto + Identidad visual coherente
- [ ] Deploy frontend (Vercel)

---

### 4️⃣ **Infraestructura y Deploy**
> Conectar todas las piezas en entornos reales.
- [x] Crear cluster MongoDB Atlas (Free Tier)
- [ ] Configurar Render para backend (free tier)
- [ ] Configurar Vercel para frontend (free tier)
- [ ] Probar comunicación en producción
- [ ] Conectar dominio del cliente (fase final)
- [ ] Verificar tiempo de carga y SSL activo

---

### 5️⃣ **Documentación y QA**
> Registrar el proceso y asegurar calidad básica.
- [x] README general actualizado
- [x] Backlog general (este documento)
- [x] Backlog frontend
- [x] Backlog backend
- [ ] Manual básico para el cliente (uso y mantenimiento)
- [ ] QA final (flujo completo en móvil y desktop)
- [ ] Capturas y presentación final del MVP

---

## 🚀 Hitos del Proyecto

| Fase | Objetivo | Fecha estimada | Entregable |
|------|-----------|----------------|-------------|
| Semana 1 | Setup técnico + seed de productos | 22–26 oct 2025 | API conectada + Mongo online |
| Semana 2 | Catálogo visible + WhatsApp funcional | 27 oct – 1 nov | Frontend conectado y operativo |
| Semana 3 | Identidad visual + secciones | 2–8 nov | Home, catálogo estilizado, contacto |
| Semana 4 | Deploy + QA final | 9–18 nov | MVP público y documentación completa |

---

## 📄 Roles

| Rol | Persona | Función |
|-----|----------|----------|
| 👨‍💻 Dev principal | Alejandro | Desarrollo MERN, arquitectura y documentación |
| 🧪 QA / PO | Pyttu | Revisión de experiencia y textos |
| 🍰 Cliente | Obrador 180 graus (Vilanova i la Geltrú) | Validación visual y contenido real |

---

## 🧱 Estado global del proyecto

**Versión:** MVP v0.3  
**Avance estimado:** ~20%  
**Última actualización:** 22 de octubre 2025  
