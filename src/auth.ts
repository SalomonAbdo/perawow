import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

// Excluimos `providers` del spread para evitar clave duplicada en el bundle
const { providers: _, ...baseAuthConfig } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...baseAuthConfig,
    providers: [
        Credentials({
            name: "AzerothCore",
            credentials: {
                username: { label: "Usuario", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    // Llamamos a la API en Go directamente
                    const res = await fetch(`${process.env.API_URL}/login`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        // Aseguramos estructurar el ID para que NextAuth lo guarde
                        return {
                            id: user.id || user.accountId || user.account_id || "1",
                            username: user.username,
                            email: user.email,
                            ...user
                        };
                    }
                } catch (err) {
                    console.error("Error en authorize:", err);
                }

                return null;
            },
        }),
    ],
    // Eventos (callbacks) para inyectar datos del user al token y luego a la sesión
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = (user as any).username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                (session.user as any).username = token.username;
            }
            return session;
        }
    }
});
