# Protección de Rutas

Este proyecto usa **NextAuth v5** (Auth.js) junto con un **middleware de Next.js** para controlar el acceso a rutas según el estado de sesión del usuario.

---

## Archivos clave

| Archivo | Rol |
|---|---|
| `src/auth.ts` | Configuración de NextAuth (providers, JWT, páginas) |
| `src/middleware.ts` | Intercepta todas las requests antes de renderizar |
| `src/app/api/auth/[...nextauth]/route.ts` | Expone los endpoints HTTP de NextAuth |

---

## ¿Cómo funciona el middleware?

El middleware se ejecuta en el **Edge** (antes de que Next.js renderice cualquier página). Lee el JWT de la cookie de sesión y decide si redirigir o dejar pasar la request.

```
Request entrante
      ↓
 middleware.ts  ──→  ¿tiene sesión?
      │                    │
   NO (ruta protegida)   SÍ (ruta de auth)
      ↓                    ↓
 redirect /login     redirect /dashboard
      │
   SÍ / NO aplica
      ↓
 NextResponse.next() → renderiza normalmente
```

---

## Cómo proteger una ruta nueva

### Caso 1 — Ruta que requiere sesión (ej: `/perfil`, `/ajustes`)

**Paso 1:** Abre `src/middleware.ts` y añade el path a `isProtectedRoute`:

```typescript
// ANTES
const isProtectedRoute = pathname.startsWith("/dashboard");

// DESPUÉS
const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/ajustes");
```

**Paso 2 (opcional pero recomendado):** Añade una segunda capa de defensa en el `layout.tsx` o `page.tsx` de la ruta:

```typescript
// src/app/perfil/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
    const session = await auth();
    if (!session) redirect("/login"); // segunda defensa SSR

    return <div>Hola, {session.user?.name}</div>;
}
```

---

### Caso 2 — Ruta solo para usuarios NO autenticados (ej: `/onboarding`)

Añade el path a `isAuthRoute` en `src/middleware.ts`:

```typescript
// ANTES
const isAuthRoute = pathname === "/login" || pathname === "/register";

// DESPUÉS
const isAuthRoute =
    pathname === "/login"     ||
    pathname === "/register"  ||
    pathname === "/onboarding";
```

Esto redirigirá al usuario a `/dashboard` si ya tiene sesión activa.

---

### Caso 3 — Ruta de API protegida (ej: `/api/personajes`)

Las rutas de API no pasan por el middleware de UI. Protégelas directamente en el `route.ts`:

```typescript
// src/app/api/personajes/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // lógica protegida...
    return NextResponse.json({ data: [] });
}
```

---

## Variables de entorno requeridas

Copia `.env.example` como `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción | Dónde se usa |
|---|---|---|
| `API_URL` | URL base de la API en Go | `auth.ts`, `src/app/api/*/route.ts` |
| `API_KEY` | Header `X-API-Key` para la API Go | `auth.ts`, `src/app/api/*/route.ts` |
| `AUTH_SECRET` | Secreto para firmar los JWT de sesión | NextAuth internamente |

> ⚠️ Ninguna de estas variables tiene el prefijo `NEXT_PUBLIC_`, por lo tanto **nunca son visibles en el browser**.

Para generar un `AUTH_SECRET` seguro:
```bash
openssl rand -base64 32
```

---

## Resumen visual de rutas actuales

```
/                   → pública
/how-to-connect     → pública
/login              → pública (redirige a /dashboard si ya hay sesión)
/register           → pública (redirige a /dashboard si ya hay sesión)
/dashboard/**       → 🔒 requiere sesión (redirige a /login si no hay sesión)
/api/auth/**        → manejado por NextAuth (excluido del middleware)
/api/accounts       → pública* (usada por /register y /dashboard)
```

> \* `/api/accounts` es accesible sin sesión porque la usa tanto el registro público como el dashboard. Si en el futuro quieres restringirla, aplica el **Caso 3** de arriba.

