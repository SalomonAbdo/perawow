import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { getWso2Token } from "@/lib/wso2";

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
                    const token = await getWso2Token();

                    // Llamamos a tu API en Go
                    const res = await fetch(`${process.env.API_URL}/login`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        return user;
                    }
                } catch (err) {
                    console.error("Error en authorize:", err);
                }

                return null;
            },
        }),
    ],
});
