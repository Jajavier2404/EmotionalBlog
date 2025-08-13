# Emotional Blog API - Backend

API RESTful para "Emotional Blog", una aplicación para que los usuarios registren entradas de diario personal vinculadas a sus emociones. La API está construida con **NestJS**, **Prisma** y sigue los principios de la **Arquitectura Hexagonal**.

## Tabla de Contenidos

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Base de Datos y Prisma](#base-de-datos-y-prisma)
3. [API Endpoints](#api-endpoints)
4. [Lógica de Negocio (Casos de Uso)](#lógica-de-negocio-casos-de-uso)
5. [Dependencias Clave](#dependencias-clave)
6. [Configuración](#configuración)
7. [Instalación y Uso](#instalación-y-uso)
8. [Diagramas](#diagramas)

---

## Arquitectura del Proyecto

El proyecto implementa la **Arquitectura Hexagonal (Hexagonal Architecture)**, también conocida como **Puertos y Adaptadores**. Este patrón está estrechamente relacionado con otros como la Arquitectura Limpia, ya que ambos comparten el objetivo principal: crear sistemas débilmente acoplados aislando la lógica de negocio de los detalles externos.

En esta arquitectura, el "hexágono" representa el núcleo de la aplicación (el dominio y los casos de uso), que se comunica con el mundo exterior a través de "puertos" (interfaces). Las implementaciones concretas de estos puertos, como los controladores HTTP o los repositorios de base de datos, son los "adaptadores".

### Principios Clave

- **Independencia de Frameworks**: La lógica de negocio no depende de NestJS
- **Independencia de la Base de Datos**: Se puede cambiar de PostgreSQL a MongoDB sin afectar los casos de uso
- **Independencia de la UI**: La API puede ser consumida por web, mobile, CLI, etc.
- **Testabilidad**: Cada capa puede ser probada de forma independiente

### Estructura de Directorios del Proyecto

La estructura del código fuente en `src/` refleja directamente las capas de la Arquitectura Hexagonal:

```
src/
├── 🎯 domain/                    # Núcleo de la aplicación (Hexágono)
│   ├── entities/                 # Objetos de negocio
│   │   ├── User.entity.ts
│   │   └── Entry.entity.ts
│   └── repositories/             # Interfaces (Puertos)
│       ├── UserRepository.ts
│       └── EntryRepository.ts
├── ⚡ application/               # Lógica de negocio
│   ├── auth/                     # Casos de uso de autenticación
│   │   ├── RegisterUserUseCase.ts
│   │   ├── LoginUserUseCase.ts
│   │   ├── ForgotPasswordUseCase.ts
│   │   └── ResetPasswordUseCase.ts
│   └── entries/                  # Casos de uso de entradas
│       ├── CreateEntryUseCase.ts
│       ├── ListEntriesUseCase.ts
│       ├── UpdateEntryUseCase.ts
│       └── DeleteEntryUseCase.ts
├── 🔧 infrastructure/            # Adaptadores externos
│   ├── repositories/             # Implementaciones de repositorios
│   │   ├── PrismaUserRepository.ts
│   │   └── PrismaEntryRepository.ts
│   ├── database/                 # Configuración de Prisma
│   │   └── prisma.service.ts
│   └── security/                 # JWT, Guards, etc.
│       ├── jwt.strategy.ts
│       └── jwt-auth.guard.ts
└── 🌐 interfaces/               # Puntos de entrada
    └── http/                     # Adaptadores HTTP
        ├── controllers/          # Controladores NestJS
        │   ├── auth.controller.ts
        │   └── entries.controller.ts
        └── dto/                  # Data Transfer Objects
            ├── auth/
            └── entries/
```

### Diagrama de Arquitectura Hexagonal

```mermaid
graph TD
    subgraph External ["🌍 Mundo Exterior"]
        HTTP[Cliente HTTP]
        DB[(PostgreSQL)]
        EMAIL[Servicio Email]
    end

    subgraph Interfaces ["🌐 Interfaces (Adaptadores de Entrada)"]
        CTRL[Controllers]
        DTO[DTOs]
        GUARDS[Guards]
    end

    subgraph Application ["⚡ Aplicación (Casos de Uso)"]
        AUTH_UC[Auth Use Cases]
        ENTRY_UC[Entry Use Cases]
    end

    subgraph Domain ["🎯 Dominio (Núcleo)"]
        ENTITIES[Entidades]
        PORTS[Puertos/Interfaces]
    end

    subgraph Infrastructure ["🔧 Infraestructura (Adaptadores de Salida)"]
        PRISMA_REPO[Prisma Repositories]
        JWT_SERVICE[JWT Service]
        EMAIL_SERVICE[Email Service]
    end

    %% Conexiones principales
    HTTP --> CTRL
    CTRL --> AUTH_UC
    CTRL --> ENTRY_UC

    AUTH_UC --> PORTS
    ENTRY_UC --> PORTS

    PORTS <--> ENTITIES

    PRISMA_REPO -.->|Implementa| PORTS
    JWT_SERVICE --> AUTH_UC
    EMAIL_SERVICE --> AUTH_UC

    PRISMA_REPO --> DB
    EMAIL_SERVICE --> EMAIL

    %% Estilos
    style Domain fill:#e8f5e8
    style Application fill:#f3e5f5
    style Interfaces fill:#e3f2fd
    style Infrastructure fill:#fff3e0
    style External fill:#fce4ec
```

---

## Base de Datos y Prisma

La persistencia de datos se gestiona con **Prisma ORM** conectado a una base de datos **PostgreSQL**.

### Esquema de Base de Datos (`prisma/schema.prisma`)

El esquema define dos modelos principales: `User` y `Entry`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  entries   Entry[]

  @@map("users")
}

model Entry {
  id        String   @id @default(uuid())
  title     String
  fecha     DateTime @default(now())
  emocion   String
  texto     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("entries")
}
```

### Diagrama Entidad-Relación

```mermaid
erDiagram
    USER {
        String id PK "UUID"
        String email UK "Email único"
        String password "Hash bcrypt"
        String name "Nombre completo"
        DateTime createdAt "Fecha creación"
        DateTime updatedAt "Fecha actualización"
    }

    ENTRY {
        String id PK "UUID"
        String title "Título entrada"
        DateTime fecha "Fecha entrada"
        String emocion "Emoción asociada"
        String texto "Contenido entrada"
        DateTime createdAt "Fecha creación"
        DateTime updatedAt "Fecha actualización"
        String userId FK "ID del usuario"
    }

    USER ||--o{ ENTRY : "crea"
```

### Comandos Prisma Útiles

```bash
# Generar el cliente de Prisma
pnpm prisma generate

# Aplicar migraciones en desarrollo
pnpm prisma migrate dev

# Aplicar migraciones en producción
pnpm prisma migrate deploy

# Abrir Prisma Studio (GUI)
pnpm prisma studio

# Reset de la base de datos
pnpm prisma migrate reset
```

---

## API Endpoints

La API se expone a través de controladores NestJS con validación mediante **Zod** y **DTOs**.

### 🔐 Autenticación (`/auth`)

Maneja la autenticación y gestión de usuarios.

| Método | Ruta | 🔒 Auth | Descripción | Body (DTO) | Respuesta |
|:-------|:-----|:--------|:------------|:-----------|:----------|
| `POST` | `/auth/register` | ❌ | Registra un nuevo usuario | `RegisterDto` | `{ user, token }` |
| `POST` | `/auth/login` | ❌ | Inicia sesión y devuelve JWT | `LoginDto` | `{ user, token }` |
| `POST` | `/auth/forgot-password` | ❌ | Envía email para restablecer contraseña | `ForgotPasswordDto` | `{ message }` |
| `PUT` | `/auth/reset-password` | ❌ | Restablece contraseña con token | `ResetPasswordDto` | `{ message }` |
| `GET` | `/auth/profile` | ✅ | Obtiene perfil del usuario autenticado | N/A | `{ user }` |

#### DTOs de Autenticación

```typescript
// RegisterDto
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}

// LoginDto
{
  "email": "juan@example.com",
  "password": "password123"
}

// ForgotPasswordDto
{
  "email": "juan@example.com"
}

// ResetPasswordDto
{
  "token": "reset-token-here",
  "newPassword": "newpassword123"
}
```

### 📝 Entradas del Diario (`/entries`)

Maneja las entradas del diario. **Todos los endpoints requieren autenticación JWT.**

| Método | Ruta | 🔒 Auth | Descripción | Body (DTO) | Respuesta |
|:-------|:-----|:--------|:------------|:-----------|:----------|
| `POST` | `/entries` | ✅ | Crea nueva entrada | `CreateEntryDto` | `{ entry }` |
| `GET` | `/entries` | ✅ | Lista todas las entradas del usuario | N/A | `{ entries[] }` |
| `GET` | `/entries/:id` | ✅ | Obtiene entrada específica | N/A | `{ entry }` |
| `PATCH` | `/entries/:id` | ✅ | Actualiza entrada existente | `UpdateEntryDto` | `{ entry }` |
| `DELETE` | `/entries/:id` | ✅ | Elimina entrada de diario | N/A | `{ message }` |

#### DTOs de Entradas

```typescript
// CreateEntryDto
{
  "title": "Un día reflexivo",
  "emocion": "reflexivo",
  "texto": "Hoy fue un día lleno de introspección...",
  "fecha": "2024-01-15T10:30:00Z"
}

// UpdateEntryDto (todos los campos opcionales)
{
  "title": "Nuevo título",
  "emocion": "feliz",
  "texto": "Contenido actualizado..."
}
```

### Flujo de Autenticación

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as API Gateway
    participant AC as Auth Controller
    participant UC as Use Case
    participant R as Repository
    participant DB as PostgreSQL

    Note over C,DB: Registro de Usuario
    C->>API: POST /auth/register
    API->>AC: RegisterDto
    AC->>UC: RegisterUserUseCase
    UC->>R: UserRepository.findByEmail()
    R->>DB: SELECT * FROM users WHERE email=?
    DB-->>R: null (usuario no existe)
    UC->>UC: Hash password with bcrypt
    UC->>R: UserRepository.create()
    R->>DB: INSERT INTO users...
    DB-->>R: Usuario creado
    UC-->>AC: { user, token }
    AC-->>C: 201 Created

    Note over C,DB: Login
    C->>API: POST /auth/login
    API->>AC: LoginDto
    AC->>UC: LoginUserUseCase
    UC->>R: UserRepository.findByEmail()
    R->>DB: SELECT * FROM users WHERE email=?
    DB-->>R: Usuario encontrado
    UC->>UC: Verify password with bcrypt
    UC->>UC: Generate JWT token
    UC-->>AC: { user, token }
    AC-->>C: 200 OK
```

---

## Lógica de Negocio (Casos de Uso)

Ubicados en `src/application`, los casos de uso definen las operaciones de negocio siguiendo el principio de **Single Responsibility**.

### 🔐 Casos de Uso de Autenticación

#### `RegisterUserUseCase`
```typescript
@Injectable()
export class RegisterUserUseCase {
  async execute(dto: RegisterDto): Promise<AuthResponse> {
    // 1. Validar que el email no esté en uso
    // 2. Hashear la contraseña
    // 3. Crear el usuario
    // 4. Generar JWT token
    // 5. Retornar usuario y token
  }
}
```

#### `LoginUserUseCase`
```typescript
@Injectable()
export class LoginUserUseCase {
  async execute(dto: LoginDto): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    // 2. Verificar contraseña
    // 3. Generar JWT token
    // 4. Retornar usuario y token
  }
}
```

#### `ForgotPasswordUseCase`
```typescript
@Injectable()
export class ForgotPasswordUseCase {
  async execute(dto: ForgotPasswordDto): Promise<void> {
    // 1. Verificar que el usuario existe
    // 2. Generar token de recuperación
    // 3. Enviar email con el token
    // 4. Almacenar token temporalmente
  }
}
```

#### `ResetPasswordUseCase`
```typescript
@Injectable()
export class ResetPasswordUseCase {
  async execute(dto: ResetPasswordDto): Promise<void> {
    // 1. Validar token de recuperación
    // 2. Hashear nueva contraseña
    // 3. Actualizar contraseña del usuario
    // 4. Invalidar token de recuperación
  }
}
```

### 📝 Casos de Uso de Entradas

#### `CreateEntryUseCase`
```typescript
@Injectable()
export class CreateEntryUseCase {
  async execute(dto: CreateEntryDto, userId: string): Promise<Entry> {
    // 1. Validar datos de entrada
    // 2. Crear entrada asociada al usuario
    // 3. Retornar entrada creada
  }
}
```

#### `ListEntriesByUserUseCase`
```typescript
@Injectable()
export class ListEntriesByUserUseCase {
  async execute(userId: string): Promise<Entry[]> {
    // 1. Buscar todas las entradas del usuario
    // 2. Ordenar por fecha (más recientes primero)
    // 3. Retornar lista de entradas
  }
}
```

#### `UpdateEntryUseCase`
```typescript
@Injectable()
export class UpdateEntryUseCase {
  async execute(id: string, dto: UpdateEntryDto, userId: string): Promise<Entry> {
    // 1. Verificar que la entrada existe y pertenece al usuario
    // 2. Actualizar campos modificados
    // 3. Retornar entrada actualizada
  }
}
```

#### `DeleteEntryUseCase`
```typescript
@Injectable()
export class DeleteEntryUseCase {
  async execute(id: string, userId: string): Promise<void> {
    // 1. Verificar que la entrada existe y pertenece al usuario
    // 2. Eliminar entrada de la base de datos
  }
}
```

---

## Dependencias Clave

Extraídas de `package.json`, organizadas por funcionalidad:

### 🚀 Framework y Core
- **`@nestjs/core`** (^10.0.0): Framework principal para construir la aplicación
- **`@nestjs/platform-express`**: Adaptador para Express.js
- **`@nestjs/common`**: Decoradores y utilidades comunes

### 🔒 Autenticación y Seguridad
- **`@nestjs/jwt`** & **`@nestjs/passport`**: Implementación de JWT con Passport
- **`passport-jwt`**: Estrategia JWT para Passport
- **`bcryptjs`**: Hashing seguro de contraseñas
- **`@nestjs/throttler`**: Rate limiting y protección contra ataques

### 🗄️ Base de Datos
- **`@prisma/client`**: Cliente de Prisma para interactuar con la base de datos
- **`prisma`**: Herramienta CLI y migration tool

### ✅ Validación y Transformación
- **`zod`**: Validación de esquemas y DTOs type-safe
- **`class-validator`** & **`class-transformer`**: Validación y transformación de DTOs

### 📧 Servicios Externos
- **`nodemailer`**: Envío de correos electrónicos para recuperación de contraseña
- **`@nestjs/mailer`**: Integración de Nodemailer con NestJS

### ⚙️ Configuración y Utilidades
- **`@nestjs/config`**: Manejo de configuración y variables de entorno
- **`dotenv`**: Carga de variables de entorno desde archivos .env

### 🧪 Testing y Desarrollo
- **`jest`**: Framework de testing
- **`supertest`**: Testing de endpoints HTTP
- **`eslint`** & **`prettier`**: Linting y formateo de código

---

## Configuración

La configuración se gestiona a través de variables de entorno usando **@nestjs/config**.

### Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_URL="postgresql://username:password@localhost:5432/emotionalblog?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRATION="7d"

# Aplicación
PORT=3000
NODE_ENV=development

# Email (para forgot password)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="EmotionalBlog <noreply@emotionalblog.com>"

# CORS
FRONTEND_URL="http://localhost:5173"

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

### Configuración por Módulos

```typescript
// config/database.config.ts
export const databaseConfig = () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
});

// config/auth.config.ts
export const authConfig = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
});

// config/email.config.ts
export const emailConfig = () => ({
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },
});
```

---

## Instalación y Uso

Sigue estos pasos para levantar el entorno de desarrollo.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [PNPM](https://pnpm.io/) (gestor de paquetes recomendado)
- [PostgreSQL](https://www.postgresql.org/) (versión 13 o superior)
- [Docker](https://www.docker.com/) (opcional, para base de datos)

### 1. Clonación del Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### 2. Instalación de Dependencias

```bash
# Instalar dependencias con PNPM
pnpm install
```

### 3. Configuración del Entorno

```bash
# Copiar archivo de variables de entorno
cp .env.example .env

# Editar las variables según tu configuración
nano .env
```

### 4. Base de Datos

#### Opción A: PostgreSQL Local
```bash
# Si tienes PostgreSQL instalado localmente
createdb emotionalblog
```

#### Opción B: Docker (Recomendado)
```bash
# Usando docker-compose (si existe en el proyecto)
docker-compose up -d postgres

# O con Docker directamente
docker run --name emotionalblog-postgres \
  -e POSTGRES_DB=emotionalblog \
  -e POSTGRES_USER=your-user \
  -e POSTGRES_PASSWORD=your-password \
  -p 5432:5432 \
  -d postgres:15
```

### 5. Migraciones de Prisma

```bash
# Generar el cliente de Prisma
pnpm prisma generate

# Aplicar migraciones
pnpm prisma migrate dev --name init

# (Opcional) Poblar con datos de ejemplo
pnpm prisma db seed
```

### 6. Iniciar la Aplicación

```bash
# Modo desarrollo (con hot-reload)
pnpm run start:dev

# Modo producción
pnpm run build
pnpm run start:prod
```

La API estará disponible en `http://localhost:3000`.

### 7. Verificación

```bash
# Verificar que la API está funcionando
curl http://localhost:3000/health

# O visitar la documentación Swagger (si está configurada)
open http://localhost:3000/api/docs
```

### Scripts Disponibles con PNPM

#### Desarrollo
```bash
pnpm run start:dev      # Servidor con hot-reload
pnpm run start:debug    # Servidor con debugger
pnpm run start          # Servidor normal
```

#### Producción
```bash
pnpm run build          # Compilar TypeScript
pnpm run start:prod     # Servidor de producción
```

#### Base de Datos
```bash
pnpm prisma generate    # Generar cliente Prisma
pnpm prisma migrate dev # Aplicar migraciones desarrollo
pnpm prisma migrate deploy # Aplicar migraciones producción
pnpm prisma studio      # Abrir Prisma Studio
pnpm prisma db seed     # Ejecutar seeder
```

#### Calidad de Código
```bash
pnpm run lint           # ESLint
pnpm run lint:fix       # ESLint con auto-fix
pnpm run format         # Prettier
pnpm run test           # Tests unitarios
pnpm run test:watch     # Tests en modo watch
pnpm run test:e2e       # Tests end-to-end
pnpm run test:cov       # Tests con coverage
```

### Estructura de Testing

```bash
# Tests unitarios
pnpm run test

# Tests de integración
pnpm run test:e2e

# Coverage
pnpm run test:cov

# Tests específicos
pnpm run test -- auth.service.spec.ts
```

### Docker para Desarrollo

```dockerfile
# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Instalar PNPM
RUN npm install -g pnpm

# Copiar package.json y pnpm-lock.yaml
COPY package*.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN pnpm prisma generate

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["pnpm", "run", "start:dev"]
```

---

## Monitoreo y Logs

### Configuración de Logs

```typescript
// logger.config.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});
```

### Health Check

```typescript
@Controller('health')
export class HealthController {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async check() {
    const dbStatus = await this.checkDatabase();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      memory: process.memoryUsage(),
    };
  }
}
```

---

**Construido con ❤️ usando NestJS, Prisma, PostgreSQL y ⚡ PNPM**
