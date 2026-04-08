"use client";

import { useState } from "react";
import { User, Mail, Lock, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí conectaremos la lógica de hashing (sha1) y la API de AzerothCore más adelante
        console.log("Datos capturados:", formData);
    };

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-wow-dark px-4 relative overflow-hidden">

            {/* Imagen de fondo con transparencia */}
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

            {/* Textura de "Cuero de Dragón" (Fondo Global) mejorada para ser visible */}
            <div 
                className="absolute inset-0 pointer-events-none z-0 mix-blend-color-dodge opacity-60"
                style={{
                    // Patrón de escamas más contrastado usando radial-gradients
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
            {/* Capa extra de mugre/desgaste para darle cuerpo al cuero */}
            <div 
                className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Decoración gélida de fondo (Destacada y Centrada) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-wow-blue/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />

            <div className="relative z-10 w-full max-w-md">
                <div className="relative bg-wow-card border border-wow-blue/30 rounded-xl p-8 shadow-[inset_0_0_80px_rgba(0,0,0,0.8),_0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">
                    
                    {/* Textura de "Cuero" generada por SVG superpuesta */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Efecto de Costuras en los bordes para mayor realismo (Stitching) */}
                    <div className="absolute inset-2 border border-dashed border-gray-500/30 rounded-lg pointer-events-none" />

                    {/* Contenedor protector para que el contenido quede encima de la textura y sombras */}
                    <div className="relative z-10">
                        {/* Encabezado */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                                Crear <span className="text-wow-gold">Cuenta</span>
                            </h1>
                            <div className="h-1 w-20 bg-wow-gold mx-auto mt-2 rounded-full" />
                            <p className="text-wow-blue-gray text-sm mt-4">
                                Comienza tu aventura en el Reino de Rasganorte
                            </p>
                        </div>

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
                                    className="w-full bg-wow-dark border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-wow-blue/50 transition-colors placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                            </div>

                            {/* Aviso de Seguridad */}
                            <div className="bg-wow-blue/5 border border-wow-blue/20 p-3 rounded-lg flex gap-3 items-start">
                                <Info className="size-5 text-wow-blue shrink-0 mt-0.5" />
                                <p className="text-[10px] text-wow-blue-gray leading-relaxed uppercase tracking-tighter">
                                    Por seguridad, usa una contraseña diferente a la de otros servidores. Tu cuenta es personal e intransferible.
                                </p>
                            </div>

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                className="w-full bg-wow-gold text-black py-4 rounded-lg font-black uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-xl shadow-wow-gold/5 active:scale-95"
                            >
                                Registrarse
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