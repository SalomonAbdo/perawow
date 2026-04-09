import type { NextAuthConfig } from "next-auth";

/**
 * Configuración base de next-auth compartida entre auth.ts y cualquier
 * contexto que no puede importar providers de Node.js (edge, middleware).
 * Los providers completos están en auth.ts.
 */
export const authConfig = {
    trustHost: true,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    // No ponemos providers aquí — van en auth.ts con los providers de Node.js
    providers: [],
} satisfies NextAuthConfig;

