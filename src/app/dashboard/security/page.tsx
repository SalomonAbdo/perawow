"use client";

import { Lock, ShieldCheck, History, Smartphone, Globe, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function SecurityPage() {

    // Mock de historial de logins (Auditoría técnica)
    const loginHistory = [
        { date: "2026-04-10 14:22", ip: "190.160.XX.XX", location: "Santiago, CL", status: "Exitoso" },
        { date: "2026-04-09 09:15", ip: "190.160.XX.XX", location: "Santiago, CL", status: "Exitoso" },
        { date: "2026-04-07 22:40", ip: "45.230.XX.XX", location: "Buenos Aires, AR", status: "Fallido" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">

            <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
                <Image
                    src="/images/seguridad.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wow-dark via-transparent to-wow-dark" />
            </div>

            {/* Header de Seguridad */}
            <header className="flex items-center justify-between pb-4 border-b-2 border-wow-blue/20">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Fortaleza de <span className="text-wow-blue">la Cuenta</span>
                    </h1>
                    <p className="text-[10px] text-wow-blue-gray font-bold uppercase tracking-[0.4em]">
                        Gestión de credenciales y protocolos de defensa
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg">
                    <ShieldCheck className="size-4 text-green-400" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Cuenta Protegida</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COLUMNA IZQUIERDA: CAMBIO DE PASSWORD */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="relative border-4 border-double border-[#3a2a1a] rounded-xl overflow-hidden bg-wow-card shadow-2xl">
                        <div
                            className="absolute inset-0 z-0 opacity-30 bg-cover"
                            style={{ backgroundImage: "url('/images/image_d5f8a1.jpg')" }}
                        />
                        <div className="absolute inset-0 z-0 bg-black/80" />

                        <div className="relative z-10 p-6 space-y-6">
                            <h3 className="text-sm font-black text-wow-gold uppercase tracking-widest flex items-center gap-2">
                                <Lock className="size-4" /> Cambiar Contraseña
                            </h3>

                            <form className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-wow-blue-gray uppercase">Contraseña Actual</label>
                                    <input type="password" title="Contraseña Actual" className="w-full bg-black/60 border border-white/10 rounded p-2 text-sm text-white focus:border-wow-blue outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-wow-blue-gray uppercase">Nueva Contraseña</label>
                                    <input type="password" title="Nueva Contraseña" className="w-full bg-black/60 border border-white/10 rounded p-2 text-sm text-white focus:border-wow-blue outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-wow-blue-gray uppercase">Repetir Nueva Contraseña</label>
                                    <input type="password" title="Repetir Nueva Contraseña" className="w-full bg-black/60 border border-white/10 rounded p-2 text-sm text-white focus:border-wow-blue outline-none" />
                                </div>
                                <button className="w-full py-3 bg-wow-blue/20 hover:bg-wow-blue/40 border border-wow-blue/50 text-wow-blue font-black text-[10px] uppercase tracking-widest transition-all rounded">
                                    Actualizar Credenciales
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* 2FA (Próximamente) */}
                    <div className="p-6 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-4 opacity-50">
                            <Smartphone className="size-5 text-wow-blue-gray" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Autenticador (2FA)</h3>
                        </div>
                        <p className="text-[10px] text-wow-blue-gray leading-relaxed italic">
                            Próximamente: Vincula tu cuenta con una app de autenticación para máxima seguridad.
                        </p>
                    </div>
                </div>

                {/* COLUMNA DERECHA: REGISTRO DE ACTIVIDAD (Ledger con Textura) */}
                <div className="lg:col-span-2">
                    <section className="relative border-4 border-double border-[#3a2a1a] rounded-xl overflow-hidden shadow-2xl h-full">
                        <div
                            className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/image_d5f8a1.jpg')" }}
                        />
                        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

                        <div className="relative z-10">
                            <div className="px-8 py-5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-sm font-black text-wow-gold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <History className="size-4" /> Registro de Actividad
                                </h3>
                                <span className="text-[9px] text-wow-blue-gray font-bold uppercase tracking-widest">Últimos 30 días</span>
                            </div>

                            <div className="divide-y divide-white/5">
                                {loginHistory.map((log, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-white/[0.03] transition-all">
                                        <div className="col-span-4">
                                            <p className="text-[10px] text-wow-blue-gray font-black uppercase">Fecha y Hora</p>
                                            <p className="text-xs text-white font-bold font-mono">{log.date}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="text-[10px] text-wow-blue-gray font-black uppercase">Dirección IP</p>
                                            <p className="text-xs text-wow-blue font-bold font-mono">{log.ip}</p>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="text-[10px] text-wow-blue-gray font-black uppercase">Ubicación</p>
                                            <p className="text-[10px] text-white font-bold uppercase flex items-center gap-1">
                                                <Globe className="size-3 text-gray-500" /> {log.location}
                                            </p>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <div className={`size-2 rounded-full ${log.status === 'Exitoso' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 text-center border-t border-white/5 bg-black/20">
                                <p className="text-[10px] text-wow-blue-gray font-medium italic">
                                    Si detectas una dirección IP desconocida, cambia tu contraseña de inmediato y contacta con un Maestro de Juego.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

            {/* Alerta de Seguridad Profesional */}
            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl flex items-center gap-6">
                <div className="size-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <ShieldAlert className="size-6 text-red-500" />
                </div>
                <div>
                    <h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-1">Aviso de Seguridad Crítico</h4>
                    <p className="text-[10px] text-wow-blue-gray leading-relaxed font-bold uppercase tracking-tight">
                        Nuestro Staff <span className="text-white underline">NUNCA</span> te pedirá tu contraseña dentro del juego o por correo electrónico. Mantén tu información privada para evitar el robo de personajes o items.
                    </p>
                </div>
            </div>
        </div>
    );
}