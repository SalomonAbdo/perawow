/**
 * Next.js Instrumentation Hook
 * Se ejecuta una sola vez al iniciar el servidor, antes de cualquier request.
 * Aquí aplicamos el bypass de SSL para certificados autofirmados (equivalente a curl -k).
 */
export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Solo en el runtime de Node.js (no en Edge)
        await import("@/lib/wso2");
    }
}

