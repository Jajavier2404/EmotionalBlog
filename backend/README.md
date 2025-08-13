# Emotional Blog API - Backend

API RESTful para "Emotional Blog", una aplicación para que los usuarios registren entradas de diario personal vinculadas a sus emociones. La API está construida con NestJS, Prisma y sigue los principios de la Arquitectura Hexagonal.

## Tabla de Contenidos

1.  [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2.  [Base de Datos y Prisma](#base-de-datos-y-prisma)
3.  [API Endpoints](#api-endpoints)
4.  [Lógica de Negocio (Casos de Uso)](#lógica-de-negocio-casos-de-uso)
5.  [Dependencias Clave](#dependencias-clave)
6.  [Configuración](#configuración)
7.  [Instalación y Uso](#instalación-y-uso)
8.  [Diagramas](#diagramas)

---

## Arquitectura del Proyecto

El proyecto implementa la **Arquitectura Hexagonal (Hexagonal Architecture)**, también conocida como **Puertos y Adaptadores**. Este patrón está estrechamente relacionado con otros como la Arquitectura Hexagonal (Hexagonal Architecture), ya que ambos comparten el objetivo principal: crear sistemas débilmente acoplados aislando la lógica de negocio de los detalles externos.

En esta arquitectura, el "hexágono" representa el núcleo de la aplicación (el dominio y los casos de uso), que se comunica con el mundo exterior a través de "puertos" (interfaces). Las implementaciones concretas de estos puertos, como los controladores HTTP o los repositorios de base de datos, son los "adaptadores". El objetivo es que estos adaptadores puedan ser intercambiados sin afectar el núcleo del negocio.

El objetivo es que la aplicación pueda ser "conducida" por diferentes tipos de clientes (ej. una API REST, una CLI, tests automatizados) y que pueda interactuar con diferentes tecnologías de persistencia o servicios sin que la lógica de negocio se vea afectada.

### Estructura de Directorios del Proyecto

La estructura del código fuente en `src/` refleja directamente las capas de la Arquitectura Hexagonal:

-   `src/`
    -   `domain/`: El núcleo de la aplicación (el **hexágono**). No tiene dependencias externas.
        -   `entities/`: Define los objetos de negocio principales (ej. `User`, `Entry`).
        -   `repositories/`: Define las interfaces (`puertos`) que la capa de aplicación usará para la persistencia, sin conocer la implementación.
    -   `application/`: Contiene la lógica de negocio y orquesta los flujos de trabajo.
        -   `auth/`, `entries/`: Implementa los casos de uso específicos (ej. `RegisterUserUseCase`). Llama a los puertos del dominio para ejecutar acciones.
    -   `infrastructure/`: Contiene las implementaciones concretas de los puertos definidos en el dominio (los **adaptadores**).
        -   `repositories/`: Implementaciones de los repositorios usando Prisma (`PrismaUserRepository`).
        -   `database/`: Configuración y servicio de Prisma.
        -   `security/`: Lógica relacionada con JWT, guards, etc.
    -   `interfaces/`: El punto de entrada a la aplicación.
        -   `http/`: Adaptadores que exponen la aplicación a través de HTTP.
            -   `controllers/`: Controladores de NestJS que manejan las peticiones y respuestas.
            -   `dto/`: Data Transfer Objects para validación de datos de entrada.

### Diagrama de Flujo

```mermaid
graph TD
    A[Interfaces (HTTP)] --> B(Application);
    C(Infrastructure) --> B;
    B --> D{Domain};

    subgraph Interfaces
        direction LR
        A1(Controllers)
    end

    subgraph Application
        direction LR
        B1(Use Cases)
    end

    subgraph Domain
        direction LR
        D1(Entities)
        D2(Repository Ports)
    end

    subgraph Infrastructure
        direction LR
        C1(Prisma Adapters)
        C2(Bcrypt)
        C3(Nodemailer)
    end

    A1 --> B1;
    B1 --> D2;
    C1 -- Implementa Puerto --> D2;
```

---

## Base de Datos y Prisma

La persistencia de datos se gestiona con **Prisma ORM** conectado a una base de datos PostgreSQL.

### Esquema (`prisma/schema.prisma`)

El esquema define dos modelos principales: `User` y `Entry`.

-   **User**: Representa a un usuario registrado.
-   **Entry**: Representa una entrada del diario creada por un usuario.

```prisma
model User {
    id        String   @id @default(uuid())
    email     String   @unique
    password  String
    name      String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    entries   Entry[]
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
    user      User     @relation(fields: [userId], references: [id])
}
```

### Diagrama Entidad-Relación

```mermaid
erDiagram
    USER {
        String id PK
        String email UK
        String password
        String name
    }
    ENTRY {
        String id PK
        String title
        DateTime fecha
        String emocion
        String texto
        String userId FK
    }
    USER ||--o{ ENTRY : "has"
```

---

## API Endpoints

La API se expone a través de controladores NestJS.

### Auth (`/auth`)

Maneja la autenticación y gestión de usuarios.

| Método | Ruta                  | Requiere Auth | Descripción                                      | Body (DTO)                               |
| :----- | :-------------------- | :------------ | :----------------------------------------------- | :--------------------------------------- |
| `POST` | `/auth/register`      | No            | Registra un nuevo usuario.                       | `RegisterDto` (`username`, `email`, `password`) |
| `POST` | `/auth/login`         | No            | Inicia sesión y devuelve un token JWT.           | `LoginDto` (`email`, `password`)         |
| `POST` | `/auth/forgot-password` | No            | Envía un email para restablecer la contraseña.   | `ForgotPasswordDto` (`email`)            |
| `PUT`  | `/auth/reset-password`  | No            | Restablece la contraseña usando un token.        | `ResetPasswordDto` (`password`)          |

### Entries (`/entries`)

Maneja las entradas del diario. **Todos los endpoints requieren autenticación JWT.**

| Método   | Ruta           | Requiere Auth | Descripción                               | Body (DTO)                                  |
| :------- | :------------- | :------------ | :---------------------------------------- | :------------------------------------------ |
| `POST`   | `/entries`     | Sí            | Crea una nueva entrada de diario.         | `CreateEntryDto` (`title`, `emocion`, `texto`) |
| `GET`    | `/entries`     | Sí            | Lista todas las entradas del usuario.     | N/A                                         |
| `PATCH`  | `/entries/:id` | Sí            | Actualiza una entrada existente.          | `UpdateEntryDto` (opcional: `title`, `emocion`, `texto`) |
| `DELETE` | `/entries/:id` | Sí            | Elimina una entrada de diario.            | N/A                                         |

---

## Lógica de Negocio (Casos de Uso)

Ubicados en `src/application`, los casos de uso definen las operaciones de negocio.

-   **Auth**:
    -   `RegisterUserUseCase`: Valida y crea un nuevo usuario.
    -   `LoginUserUseCase`: Verifica credenciales y genera un JWT.
    -   `ForgotPasswordUseCase`: Gestiona la lógica para el olvido de contraseña.
    -   `ResetPasswordUseCase`: Valida el token y actualiza la contraseña.
-   **Entries**:
    -   `CreateEntryUseCase`: Crea una nueva entrada asociada a un usuario.
    -   `ListEntriesByUserUseCase`: Obtiene todas las entradas de un usuario específico.
    -   `UpdateEntryUseCase`: Actualiza los datos de una entrada.
    -   `DeleteEntryUseCase`: Elimina una entrada.

---

## Dependencias Clave

Extraídas de `package.json`:

-   **@nestjs/core**: Framework principal para construir la aplicación.
-   **@nestjs/config**: Manejo de configuración y variables de entorno.
-   **@nestjs/jwt** & **passport-jwt**: Para la implementación de autenticación con JSON Web Tokens.
-   **@prisma/client**: Cliente de Prisma para interactuar con la base de datos.
-   **bcryptjs**: Para el hasheo seguro de contraseñas.
-   **zod**: Para la validación de esquemas y DTOs.
-   **nodemailer**: Para el envío de correos electrónicos (usado en "forgot password").

---

## Configuración

La configuración se gestiona a través de variables de entorno. Debes crear un archivo `.env` en la raíz del proyecto a partir del `.env.example`.

Variables requeridas:

-   `DATABASE_URL`: La URL de conexión a la base de datos PostgreSQL.
    -   Ejemplo: `postgresql://user:password@localhost:5432/emotionalblog`
-   `JWT_SECRET`: Una cadena secreta para firmar los tokens JWT.
-   `PORT`: El puerto en el que correrá la aplicación (por defecto `3000`).

---

## Instalación y Uso

Sigue estos pasos para levantar el entorno de desarrollo.

1.  **Clonar el repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd backend
    ```

2.  **Instalar dependencias**
    Se recomienda usar `pnpm`.
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno**
    Copia el archivo de ejemplo y edítalo con tus valores.
    ```bash
    cp .env.example .env
    ```

4.  **Levantar la base de datos**
    Asegúrate de tener Docker y Docker Compose instalados.
    ```bash
    # (Si tienes un docker-compose.yml para la DB)
    docker-compose up -d
    ```

5.  **Aplicar las migraciones de Prisma**
    Esto creará las tablas en tu base de datos según el esquema.
    ```bash
    pnpm prisma migrate dev
    ```

6.  **Iniciar la aplicación en modo desarrollo**
    ```bash
    pnpm run start:dev
    ```

La API estará disponible en `http://localhost:3000`.

### Otros Comandos Útiles

-   `pnpm run build`: Compilar el proyecto para producción.
-   `pnpm run start:prod`: Iniciar el proyecto en modo producción.
-   `pnpm run lint`: Analizar el código con ESLint.
-   `pnpm run format`: Formatear el código con Prettier.
