"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
// Añadimos Loader2 para el estado de carga
import { User, Mail, Lock, ShieldCheck, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
    // NUEVOS ESTADOS: Para gestionar la carga y los mensajes de la API
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: "" });

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // LÓGICA DE ENVÍO CONECTADA A TU API EN GO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, msg: "" });

        // Validación básica de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', msg: "Las contraseñas no coinciden." });
            setLoading(false);
            return;
        }

        try {
            // Petición a la API de Go usando las variables de entorno
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || "", // Protección de API_KEY
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al procesar el registro.");
            }

            // Éxito: Limpiamos formulario y mostramos mensaje
            setStatus({ type: 'success', msg: "¡Cuenta creada con éxito! Ya puedes entrar al juego." });
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });

        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-wow-dark px-4 relative overflow-hidden">

            {/* Imagen de fondo con transparencia - MANTENIDO */}
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

            {/* Textura de "Cuero de Dragón" - MANTENIDO */}
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
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Decoración gélida de fondo - MANTENIDO */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-wow-blue/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />

            <div className="relative z-10 w-full max-w-md">
                <div className="relative bg-wow-card border border-wow-blue/30 rounded-xl p-8 shadow-[inset_0_0_80px_rgba(0,0,0,0.8),_0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">

                    {/* Textura de "Cuero" SVG - MANTENIDO */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Efecto de Costuras - MANTENIDO */}
                    <div className="absolute inset-2 border border-dashed border-gray-500/30 rounded-lg pointer-events-none" />

                    <div className="relative z-10">
                        {/* Encabezado */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                                Crea tu <span className="text-wow-gold">Cuenta</span>
                            </h1>
                            <div className="h-1 w-20 bg-wow-blue mx-auto mt-2 rounded-full" />
                            <p className="text-wow-blue-gray text-sm mt-4">
                                Comienza tu aventura en el Reino de Rasganorte
                            </p>
                        </div>

                        {/* MOSTRAR STATUS DE LA API - NUEVO */}
                        {status.type && (
                            <div className={`mb-6 p-4 rounded-lg text-xs font-bold uppercase tracking-widest ${
                                status.type === 'success'
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                                {status.msg}
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
                                    value={formData.username}
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="Ej: ArthasPvP"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-wow-gold uppercase tracking-widest flex items-center gap-2">
                                    <Mail className="size-3" /> Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="tu@correo.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                                    maxLength={16}
                                    value={formData.password}
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-wow-gold uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck className="size-3" /> Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    required
                                    maxLength={16}
                                    value={formData.confirmPassword}
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                            </div>

                            {/* Aviso de Seguridad */}
                            <div className="bg-wow-blue/5 border border-wow-blue/20 p-3 rounded-lg flex gap-3 items-start">
                                <Info className="size-5 text-wow-blue shrink-0 mt-0.5" />
                                <p className="text-[10px] text-wow-blue-gray leading-relaxed uppercase tracking-tighter">
                                    Por seguridad, usa una contraseña diferente a la de otros servidores. (Máximo 16 caracteres).
                                </p>
                            </div>

                            {/* Botón de envío - ACTUALIZADO CON ESTADO DE CARGA */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-wow-gold text-black py-4 rounded-lg font-black uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-xl shadow-wow-gold/5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        PROCESANDO...
                                    </>
                                ) : "Registrarse"}
                            </button>
                            {/* ... después del botón de Registrarse ... */}

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-800"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-wow-card px-2 text-wow-blue-gray font-bold tracking-widest">O continúa con</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
                            >
                                {/* Icono de Google */}
                                <svg className="size-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                                Google
                            </button>
                        </form>

                        {/* Footer del Formulario */}
                        <div className="mt-8 pt-6 border-t border-gray-800 text-center relative z-10">
                            <p className="text-sm text-wow-blue-gray">
                                ¿Ya tienes una cuenta?{" "}
                                <Link href="/login" className="text-wow-blue hover:text-wow-gold transition-colors font-bold">
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}