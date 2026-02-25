# Agencia de Viajes Oeste - Sistema de Gestión con Next.js

Sistema de gestión de solicitudes de viaje desarrollado para el curso **Desarrollo Frontend III** de Duoc UC. Implementa Server-Side Rendering (SSR), Lazy Loading, Skeleton Components y arquitectura MVC en el backend.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?style=flat&logo=express)](https://expressjs.com/)

---

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Funcionalidades](#-funcionalidades)
- [Arquitectura](#-arquitectura)
- [API Reference](#-api-reference)
- [Validaciones](#-validaciones)
- [Códigos HTTP](#-códigos-http-semánticos)
- [Testing](#-testing-y-debugging)
- [Autor](#-autor)

---

##  Características

### **Semana 8 - Formularios y Validación Internacionalizada**

-  **React Hook Form** para gestión de estado de formularios
-  **Validaciones inline** con mensajes contextualizados via `t()`
-  **Re-validación automática** al cambiar idioma (ES/EN)
-  **Radio buttons** para selección de estado de solicitud
-  **Validaciones cruzadas** de fechas y horas (salida/regreso)
-  **Formateo automático** de RUT chileno con guión

---

##  Tecnologías

### **Frontend**
- **Next.js 15.1.4** - Framework React con SSR
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **CSS Puro** - Estilos sin frameworks
- **Dynamic Import** - Code splitting
- **React Server Components** - SSR nativo
- **React Hook Form 7** - Gestión de formularios y validaciones

### **Backend**
- **Node.js** - Runtime de JavaScript
- **Express 4.18** - Framework web minimalista
- **JSON Storage** - Persistencia de datos
- **CORS** - Cross-Origin Resource Sharing
- **Patrón MVC** - Arquitectura escalable

---

## Estructura del Proyecto

```
agencia-viajes-nextjs/
│
├── backend/                          # Servidor Express (Puerto 5000)
│   ├── controllers/
│   │   └── solicitudes.controller.js # Lógica de controladores HTTP
│   ├── services/
│   │   └── solicitudes.service.js    # Lógica de negocio
│   ├── routes/
│   │   └── solicitudes.routes.js     # Definición de rutas API
│   ├── data/
│   │   └── solicitudes.json          # Base de datos JSON
│   ├── server.js                     # Configuración del servidor
│   ├── package.json
│   └── .gitignore
│
└── frontend/                         # Aplicación Next.js (Puerto 3000)
    ├── src/
    │   ├── app/
    │   │   ├── components/           # Componentes reutilizables
    │   │   │   ├── AlertMessage.tsx
    │   │   │   ├── FormularioSkeleton.tsx
    │   │   │   ├── SolicitudList.tsx
    │   │   │   ├── SolicitudListSkeleton.tsx
    │   │   │   └── SolicitudManager.tsx
    │   │   ├── solicitudes/
    │   │   │   ├── FormularioSolicitud.tsx
    │   │   │   ├── page.tsx          # CSR con Suspense
    │   │   │   └── ssr/
    │   │   │       └── page.tsx      # SSR puro (force-dynamic)
    │   │   ├── globals.css           # Estilos globales + animaciones
    │   │   ├── layout.tsx
    │   │   └── page.tsx              # Página de inicio
    │   └── lib/
    │       └── api.ts                # API centralizada (fetch wrapper)
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── .gitignore
```

---

##  Instalación

### **Prerrequisitos**
- Node.js v18 o superior
- npm o yarn

### **1. Clonar el repositorio**

```bash
git clone https://github.com/LeoOlivaresD/agencia-viajes-nextjs.git
cd agencia-viajes-nextjs
```

### **2. Instalar dependencias del Backend**

```bash
cd backend
npm install
```

### **3. Instalar dependencias del Frontend**

```bash
cd frontend
npm install
```

---

## Ejecución

### **Ejecutar ambos servidores (2 terminales)**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
 *Servidor corriendo en: http://localhost:5000*

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
 *Aplicación corriendo en: http://localhost:3000*

---

### **Rutas Disponibles**

| Ruta | Descripción | Tipo |
|------|-------------|------|
| `http://localhost:3000` | Página de inicio | Estática |
| `http://localhost:3000/solicitudes` | Gestión completa (CSR + Suspense) | Client-Side |
| `http://localhost:3000/solicitudes/ssr` | Vista SSR pura | Server-Side |
| `http://localhost:5000/api/solicitudes/all` | Todas las solicitudes | API |

---

##  Funcionalidades

### **1. Gestión de Solicitudes**
-  Crear solicitudes de viaje
-  Listar todas las solicitudes
-  Filtrar por estado
-  Eliminar solicitudes (individual o múltiple)
-  Visualización con tarjetas informativas

### **2. Formulario de Solicitud**

**Campos obligatorios:**
- RUT del cliente (validación flexible)
- Nombre del cliente
- Origen y Destino
- Tipo de viaje (negocios, turismo, otros)
- Fecha y hora de salida
- Fecha y hora de regreso
- Estado (pendiente, en-proceso, finalizada)

**Campos opcionales:**
- Email (con validación)

---

### **3. Validaciones Implementadas**

#### **RUT Chileno (Flexible)**
- Formato: `XXXXXXXX-X` o `XXXXXXX-X`
- Acepta números 0-9 y letra K como dígito verificador
- Longitud entre 8-9 caracteres
- Formateo automático con guión

#### **Fechas y Horas**
- Fecha salida no puede ser anterior a hoy (permite hoy)
- Fecha regreso debe ser >= fecha salida
- Si mismo día, hora regreso > hora salida
- Comparación de strings YYYY-MM-DD (más confiable)

#### **Email**
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Campo opcional

---

## Arquitectura

### **Backend - Patrón MVC**

```javascript
// ROUTES - Definición de endpoints
router.post('/', solicitudesController.createSolicitud);
router.get('/all', solicitudesController.getSolicitudes);
router.delete('/:id', solicitudesController.deleteSolicitud);

// CONTROLLERS - Manejan requests HTTP
exports.createSolicitud = (req, res) => {
  // Validaciones
  // Llamada al service
  // Respuesta HTTP con códigos semánticos
}

// SERVICES - Lógica de negocio
exports.createSolicitud = (solicitudData) => {
  // Leer archivo JSON
  // Crear solicitud
  // Guardar en archivo
  return newSolicitud;
}
```

---

### **Frontend - Component Separation**

```typescript
// API Centralizada (lib/api.ts)
export async function getSolicitudes(): Promise<Solicitud[]>
export async function createSolicitud(...)
export async function deleteSolicitud(id: number)

// Componentes Modulares
<FormularioSolicitud onSubmit={handleSubmit} />
<SolicitudList solicitudes={data} />
<AlertMessage message="..." type="success" />

// Lazy Loading
const FormularioSolicitud = dynamic(
  () => import('./FormularioSolicitud'),
  { loading: () => <FormularioSkeleton />, ssr: false }
);
```

---

## 🔌 API Reference

### **Base URL**
```
http://localhost:5000/api/solicitudes
```

---

### **Endpoints**

#### **1. GET /api/solicitudes/all**

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "solicitudes": [...],
  "count": 5,
  "code": "SUCCESS"
}
```

---

#### **2. POST /api/solicitudes**

**Body:**
```json
{
  "dni": "16414595-0",
  "nombreCliente": "Esteban Castro",
  "origen": "Santiago",
  "destino": "Madrid",
  "tipoViaje": "turismo",
  "fechaSalida": "2026-03-04",
  "horaSalida": "10:00",
  "fechaRegreso": "2026-03-12",
  "horaRegreso": "17:00",
  "estado": "pendiente",
  "email": "cliente@ejemplo.com"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Solicitud creada exitosamente",
  "solicitud": {...},
  "code": "CREATED"
}
```

**Respuesta error de validación (400):**
```json
{
  "success": false,
  "error": "Datos de solicitud inválidos",
  "details": {
    "dni": "RUT es obligatorio",
    "nombreCliente": "Nombre del cliente es obligatorio"
  },
  "code": "VALIDATION_ERROR"
}
```

---

#### **3. DELETE /api/solicitudes/:id**

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Solicitud #1118 eliminada exitosamente",
  "solicitud": {...},
  "code": "DELETED"
}
```

**Respuesta ID inválido (400):**
```json
{
  "success": false,
  "error": "ID de solicitud inválido",
  "details": {
    "id": "El ID debe ser un número válido"
  },
  "code": "INVALID_ID"
}
```

**Respuesta no encontrado (404):**
```json
{
  "success": false,
  "error": "Solicitud con ID 99999 no encontrada",
  "code": "NOT_FOUND"
}
```

---

##  Códigos HTTP Semánticos

| Código | Nombre | Uso | Código Semántico |
|--------|--------|-----|------------------|
| **200** | OK | Datos recuperados | `SUCCESS` |
| **201** | Created | Recurso creado | `CREATED` |
| **400** | Bad Request | Datos inválidos | `VALIDATION_ERROR`, `INVALID_ID` |
| **404** | Not Found | Recurso no existe | `NOT_FOUND` |
| **500** | Internal Server Error | Error del servidor | `INTERNAL_SERVER_ERROR` |

---

##  Testing y Debugging

### **Verificar SSR**

1. Accede a: `http://localhost:3000/solicitudes/ssr`
2. **Clic derecho** → **Ver código fuente** (Ctrl+U)
3. Busca (Ctrl+F) algún nombre de cliente
4. Verás el HTML completo con los datos renderizados

---

### **Probar Códigos HTTP con DevTools**

1. Abre `http://localhost:3000/solicitudes`
2. **F12** → **Network** → **Fetch/XHR**
3. Envía el formulario vacío (para error 400)
4. Clic en la petición `solicitudes`
5. Pestaña **Response** → verás el JSON con `code`, `error`, `details`

---

##  Autor

**Leonardo Olivares**   

🔗 GitHub: [@LeoOlivaresD](https://github.com/LeoOlivaresD)

---

