import { NextRequest, NextResponse } from "next/server";
import { getWso2Token } from "@/lib/wso2";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const token = await getWso2Token();

        const res = await fetch(`${process.env.API_URL}/accounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error || "Error al procesar la solicitud." },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Error interno del servidor.";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

