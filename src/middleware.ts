import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    // Ruta protegida sin sesión → al login
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Ya tiene sesión y quiere ir al login/register → al dashboard
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Aplica el middleware a todas las rutas EXCEPTO:
         * - Archivos estáticos de Next.js (_next/static, _next/image)
         * - Imágenes públicas (/images/*, *.svg, *.ico)
         * - Rutas de API de NextAuth (/api/auth/*)
         */
        "/((?!api/auth|_next/static|_next/image|images|.*\\.svg|.*\\.ico).*)",
    ],
};

