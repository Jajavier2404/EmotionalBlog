# EmotionalBlog - Frontend

Este es el repositorio para el frontend de la aplicación EmotionalBlog, una plataforma para escribir y gestionar entradas de blog basadas en emociones. La aplicación está construida con React, Vite y TypeScript.

## Visión General de la Arquitectura

El frontend sigue una **arquitectura modular basada en funcionalidades (feature-based)**. El código fuente está organizado en directorios que representan una funcionalidad específica de la aplicación (como `blog`, `forms`, `Home`). Esto facilita la escalabilidad y el mantenimiento.

- **Framework**: React 19 con Vite.
- **Lenguaje**: TypeScript.
- **Enrutamiento**: `react-router-dom` para la navegación del lado del cliente.
- **Comunicación API**: `axios` para realizar peticiones HTTP a un backend REST. La autenticación se gestiona mediante tokens JWT que se almacenan en `localStorage`.
- **Estilos**: CSS modularizado por componente/funcionalidad.

### Diagrama de Arquitectura

Este diagrama muestra el flujo de datos y la relación entre los componentes principales de la aplicación.

```mermaid
graph TD
    subgraph User Interface (React Components)
        A[AppRoutes.tsx] --> B[Home.tsx];
        A --> C[Login.tsx];
        A --> D[BlogPage.tsx];
        A --> E[NotFound.tsx];
        A --> F[ForgotPassword.tsx];

        C --> G["useAuthForm (Hook)"];
        D --> H["CreateEntryModal.tsx"];
        D --> I["EntryCard.tsx"];
    end

    subgraph API Layer (Axios)
        J[authApi.ts]
        K[entryApi.ts]
    end

    subgraph Backend API (localhost:3000)
        L[/auth/login]
        M[/auth/register]
        N[/entries]
    end

    subgraph State & Hooks
        G --> J;
        H --> K;
        I --> K;
    end

    J --> L;
    J --> M;
    K --> N;

    style B fill:#cde4ff
    style C fill:#cde4ff
    style D fill:#cde4ff
    style E fill:#cde4ff
    style F fill:#cde4ff
    style L fill:#d5e8d4
    style M fill:#d5e8d4
    style N fill:#d5e8d4
```

## Estructura de Carpetas (`src`)

La carpeta `src` está organizada por funcionalidades para mantener el código separado y cohesivo.

```
src/
├── assets/         # Archivos estáticos como imágenes y videos
├── blog/           # Funcionalidad del Blog
│   ├── api/        # Llamadas a la API (entryApi.ts)
│   ├── components/ # Componentes de React específicos del blog
│   ├── hooks/      # Hooks personalizados para el blog
│   ├── pages/      # Componentes de página (BlogPage.tsx)
│   ├── styles/     # Estilos CSS para el blog
│   └── types/      # Definiciones de tipos (Entry.ts)
├── forms/          # Funcionalidad de autenticación y formularios
│   ├── api/        # Llamadas a la API (authApi.ts)
│   ├── components/ # Componentes de React para formularios
│   ├── hooks/      # Hooks para la lógica de formularios
│   ├── pages/      # Páginas de Login, Registro, etc.
│   └── styles/     # Estilos para los formularios
├── Home/           # Página de inicio
│   ├── components/ # Componentes de la página de inicio
│   └── page/       # Componente principal de la página
├── NotFound/       # Página de error 404
└── Routes/         # Configuración del enrutador principal
    └── AppRoutes.tsx
```

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Un gestor de paquetes: [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/) o [bun](https://bun.sh/)

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd FrontEnd
    ```

2.  Instala las dependencias del proyecto. Elige el comando que corresponda a tu gestor de paquetes:
    ```bash
    # Con npm
    npm install

    # Con pnpm
    pnpm install

    # Con bun
    bun install
    ```

## Scripts Disponibles

En el archivo `package.json` se definen los siguientes scripts:

-   **`npm run dev`**: Inicia el servidor de desarrollo de Vite con Hot-Reload. Ideal para trabajar en el código.
-   **`npm run build`**: Compila y empaqueta la aplicación para producción. Realiza una comprobación de tipos con TypeScript y luego construye los archivos en la carpeta `dist/`.
-   **`npm run lint`**: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
-   **`npm run preview`**: Inicia un servidor local para previsualizar el build de producción.

## Dependencias Principales

-   `react`: Biblioteca para construir interfaces de usuario.
-   `react-dom`: Paquete para renderizar componentes de React en el DOM.
-   `react-router-dom`: Para gestionar el enrutamiento en la aplicación.
-   `axios`: Cliente HTTP para realizar peticiones a la API del backend.
-   `jwt-decode`: Para decodificar tokens JWT y acceder a su contenido.
-   `lucide-react`: Biblioteca de iconos.
