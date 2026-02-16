# Agencia de Viajes Oeste - Next.js con SSR

Proyecto desarrollado para el curso Desarrollo Frontend III de Duoc UC, implementando Server-Side Rendering (SSR) con Next.js 15 y TypeScript.

## Estructura del Proyecto

```
agencia-viajes-nextjs/
├── backend/                    # Servidor Express
│   ├── server.js              # Servidor principal
│   ├── solicitudes.json       # Base de datos
│   ├── package.json           # Dependencias backend
│   └── .gitignore
│
└── frontend/                   # Aplicación Next.js
    ├── src/
    │   └── app/
    │       ├── api/           # API Routes
    │       ├── solicitudes/   # Páginas de solicitudes
    │       ├── layout.tsx     # Layout principal
    │       ├── page.tsx       # Página de inicio
    │       └── globals.css
    ├── package.json           # Dependencias Next.js
    ├── tsconfig.json
    ├── next.config.ts
    └── .env.local             # Variables de entorno
```

## Instalación

### 1. Instalar Backend

```bash
cd backend
npm install
```

### 2. Instalar Frontend

```bash
cd frontend
npm install
```

## Ejecución

### Terminal 1 - Backend (puerto 5000)

```bash
cd backend
npm start
```

### Terminal 2 - Frontend (puerto 3000)

```bash
cd frontend
npm run dev
```

## Acceso a la Aplicación

- **Página principal:** http://localhost:3000
- **Gestión de solicitudes:** http://localhost:3000/solicitudes
- **Vista SSR:** http://localhost:3000/solicitudes/ssr
- **API Backend:** http://localhost:5000

## Tecnologías

### Frontend
- Next.js 15
- React 19
- TypeScript
- CSS Modules

### Backend
- Node.js + Express
- JSON file storage
- CORS enabled

## Características Principales

1. **Server-Side Rendering (SSR)**
   - Renderizado completo en el servidor
   - Mejor SEO y rendimiento inicial
   - HTML completo en el código fuente

2. **Client-Side Rendering**
   - Componentes interactivos
   - Formularios dinámicos con validación
   - Actualización en tiempo real

3. **API REST**
   - Express.js backend
   - 3 endpoints principales
   - Persistencia en JSON

## Verificar SSR

1. Accede a: http://localhost:3000/solicitudes/ssr
2. Clic derecho > "Ver código fuente"
3. Verás el HTML completo renderizado en el servidor

## Autor

Leonardo Olivares - Duoc UC - Desarrollo Frontend III
