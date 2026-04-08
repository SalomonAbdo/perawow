"use client";
import { useState } from "react";
import { ShieldCheck, Lock, User, Loader2 } from "lucide-react";

export default function GameAccountForm({ email }: { email: string }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Llamamos a tu API de Go que ya tiene el SRP6 listo
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || "",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: email, // Usamos el email verificado por Google
                }),
            });

            if (response.ok) {
                window.location.reload(); // Recargamos para entrar al Dashboard real
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleActivate} className="max-w-sm mx-auto space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-wow-gold uppercase">Nombre de Usuario para el Juego</label>
                <input
                    type="text"
                    required
                    className="w-full bg-black/40 border border-gray-800 rounded-lg p-3 text-white"
                    placeholder="Ej: Arthas2026"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-wow-gold uppercase">Contraseña del Juego</label>
                <input
                    type="password"
                    required
                    className="w-full bg-black/40 border border-gray-800 rounded-lg p-3 text-white"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
            <button
                disabled={loading}
                className="w-full bg-wow-gold text-black py-4 rounded-lg font-black uppercase tracking-widest hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck className="size-5" />}
                ACTIVAR CUENTA DE JUEGO
            </button>
        </form>
    );
}