"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { User, Lock, LogIn, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // LÓGICA DE LOGIN CON NEXTAUTH
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // <--- ESTO EVITA QUE LOS DATOS SALGAN EN LA URL
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                username: formData.username,
                password: formData.password,
                redirect: false, // <--- CAMBIA A FALSE PARA MANEJAR EL ERROR AQUÍ
            });

            if (result?.error) {
                setError("Credenciales inválidas. Revisa tu usuario.");
            } else {
                // Si todo está bien, redirigimos manualmente
                window.location.href = "/dashboard";
            }
        } catch (err) {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-wow-dark px-4 relative overflow-hidden">

            {/* --- ESTÉTICA MANTENIDA: Imagen de fondo --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/hordavsalianza.jpg"
                    alt="WoW Background"
                    fill
                    priority
                    className="object-cover object-top opacity-20 mix-blend-luminosity -translate-x-6 -translate-y-10 scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-wow-dark/80 via-wow-dark/50 to-wow-dark/90" />
            </div>

            {/* --- ESTÉTICA MANTENIDA: Textura Cuero de Dragón --- */}
            <div
                className="absolute inset-0 pointer-events-none z-0 mix-blend-color-dodge opacity-60"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 10px 10px, rgba(255,255,255,0.05) 9px, transparent 10px),
                        radial-gradient(circle at 10px 10px, rgba(0,0,0,0.4) 10px, transparent 11px),
                        radial-gradient(circle at 30px 30px, rgba(255,255,255,0.05) 9px, transparent 10px),
                        radial-gradient(circle at 30px 30px, rgba(0,0,0,0.4) 10px, transparent 11px)
                    `,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 0 0, 20px 20px, 20px 20px',
                }}
            />

            {/* --- ESTÉTICA MANTENIDA: Decoración gélida --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-wow-blue/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />

            <div className="relative z-10 w-full max-w-md">
                <div className="relative bg-wow-card border border-wow-blue/30 rounded-xl p-8 shadow-[inset_0_0_80px_rgba(0,0,0,0.8),_0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">

                    {/* Textura SVG de cuero superpuesta */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Efecto de Costuras */}
                    <div className="absolute inset-2 border border-dashed border-gray-500/30 rounded-lg pointer-events-none" />

                    <div className="relative z-10">
                        {/* Encabezado */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                                Mi <span className="text-wow-blue">Cuenta</span>
                            </h1>
                            <div className="h-1 w-20 bg-wow-blue mx-auto mt-2 rounded-full" />
                            <p className="text-wow-blue-gray text-xs mt-4 uppercase tracking-widest font-bold">
                                Accede al Portal de Azeroth
                            </p>
                        </div>

                        {/* MENSAJE DE ERROR */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-widest">
                                <ShieldAlert className="size-4" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Usuario */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-wow-gold uppercase tracking-widest flex items-center gap-2">
                                    <User className="size-3" /> Nombre de Usuario
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="USUARIO"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-wow-gold uppercase tracking-widest flex items-center gap-2">
                                    <Lock className="size-3" /> Contraseña
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-wow-blue text-black py-4 rounded-lg font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl shadow-wow-blue/10 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        AUTENTICANDO...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="size-5" />
                                        Entrar al Reino
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer del Formulario */}
                        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                            <p className="text-xs text-wow-blue-gray uppercase tracking-widest">
                                ¿Eres nuevo aquí?{" "}
                                <Link href="/register" className="text-wow-gold hover:text-white transition-colors font-bold">
                                    Crea una cuenta
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}