import { Agent, setGlobalDispatcher } from "undici";

// Equivalente al flag -k del curl: ignora certificados SSL autofirmados.
// Se aplica globalmente a todos los fetch del proceso Node.js.
setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));

/**
 * Obtiene un access token desde WSO2 usando el grant type "password".
 * Las credenciales se leen desde variables de entorno.
 */
export async function getWso2Token(): Promise<string> {
    const tokenUrl = process.env.API_TOKEN || "";
    const userKey = process.env.USER_KEY_TOKEN || "";
    const secretKey = process.env.SECRET_KEY_TOKEN || "";

    const basicCredentials = Buffer.from(`${userKey}:${secretKey}`).toString("base64");

    const body = new URLSearchParams({
        grant_type: "client_credentials",
    });

    const res = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicCredentials}`,
        },
        body: body.toString(),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al obtener token WSO2: ${res.status} — ${text}`);
    }

    const data = await res.json();
    return data.access_token as string;
}
