# 📋 Backlog general – Obrador 180 graus MVP

> Registro de todas las tareas planificadas del proyecto, sin distinguir por día.  
> Cada ítem se marca como completado cuando se alcanza su versión estable.  
> Los avances concretos se documentan en `/docs/resumenDiaX.md`.

---

## 🧭 Estrategia general

- [x] Definir objetivos del MVP  
- [x] Establecer estructura del repositorio (`frontend`, `backend`, `docs`, `design`)  
- [x] Configurar control de versiones y README base  
- [x] Crear entorno MERN local (Vite + Express + MongoDB Atlas)

---

## ⚙️ Backend (API / Lógica)

- [x] Configurar servidor Express básico (`/health`, `/`)  
- [x] Integrar CORS y dotenv  
- [x] Conexión segura con MongoDB Atlas  
- [x] Crear modelo `Product` (name, description, price, image)  
- [x] Implementar rutas `/products` (GET/POST)  
- [x] Script de seed con productos de ejemplo  
- [ ] Añadir validaciones de campos y manejo de errores refinado  
- [ ] Endpoint `/orders` (reserva de producto, fase 2)  
- [ ] Control de logs / middleware de errores  
- [ ] Pruebas básicas con Postman / Jest (opcional)  
- [ ] Preparar configuración para Render (deploy backend)

---

## 🎨 Frontend (UI / Experiencia)

- [x] Configurar entorno React + Vite  
- [x] Ajustar `vite.config.js` con host dinámico y apertura automática  
- [x] Crear servicio `api.js` para consumir `/products`  
- [x] Crear componente `ProductCard`  
- [x] Mostrar productos en grilla desde API  
- [x] Agregar botón “Encargar por WhatsApp” (funcional con mensaje dinámico)  
- [ ] Agregar navegación básica (Inicio / Catálogo / Contacto)  
- [ ] Implementar estilos coherentes con la identidad del obrador (paleta fría, tipografía artesanal)  
- [ ] Añadir modo responsive completo  
- [ ] Integrar favicon, metadatos y SEO básico  
- [ ] Preparar build para Vercel

---

## ☁️ Infraestructura y despliegue

- [x] Crear cluster MongoDB Atlas (M0 Free Tier)  
- [x] Configurar `.env` con URI segura  
- [ ] Crear cuenta y despliegue inicial en Render (backend)  
- [ ] Crear cuenta y despliegue en Vercel (frontend)  
- [ ] Conectar dominio propio del cliente  
- [ ] Validar performance y tiempos de carga  

---

## 🧾 Documentación

- [x] README.md actualizado con objetivos y stack  
- [x] `resumenDia1.md` (registro del trabajo realizado)  
- [x] Bitácora en PDF (`Bitacora_Obrador180_Semana1.pdf`)  
- [ ] `resumenDia2.md`  
- [ ] `BACKLOG.md` (este documento)  
- [ ] Manual simple de uso para cliente (fase final)  
- [ ] Guía de mantenimiento técnico  

---

## 🚀 Próximos pasos (alta prioridad)

- [ ] Integrar frontend con backend desplegado (Render + Vercel)  
- [ ] Validar flujo de WhatsApp desde móvil  
- [ ] Diseño visual final (Home + Contacto)  
- [ ] Redacción de textos comerciales (PO/QA)  
- [ ] Testing QA general y revisión de contenido  

---

## 🧱 Estado del proyecto

**Versión:** MVP v0.2  
**Avance estimado:** 40 %  
**Última actualización:** Octubre 2025  

---
