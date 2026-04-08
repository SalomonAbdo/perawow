import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "AzerothCore",
            credentials: {
                username: { label: "Usuario", type: "text" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null

                // Llamamos a tu API en Go
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || ""
                    }
                })

                const user = await res.json()

                // Si la API de Go dice que está OK, devolvemos el usuario
                if (res.ok && user) {
                    return user
                }

                return null
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    }
})