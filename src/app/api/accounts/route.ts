import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(`${process.env.API_URL}/accounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY || "",
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
    } catch {
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 }
        );
    }
}

