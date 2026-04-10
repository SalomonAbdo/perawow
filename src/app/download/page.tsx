"use client";

import {
    Download,
    Zap,
    CloudDownload,
    FileArchive,
    Monitor,
    ShieldCheck,
    Layers,
    ExternalLink
} from "lucide-react";
import Image from "next/image";

export default function DownloadPage() {

    const clientMirrors = [
        { name: "Mega", url: "#", icon: CloudDownload, color: "hover:bg-red-600", desc: "Velocidad rápida (Requiere cuenta para archivos grandes)" },
        { name: "Mediafire", url: "#", icon: Download, color: "hover:bg-blue-600", desc: "Descarga directa sin límites de velocidad" },
        { name: "Torrent", url: "#", icon: Zap, color: "hover:bg-green-600", desc: "La opción más estable para conexiones lentas" },
    ];

    const extras = [
        {
            title: "Parche Texturas HD",
            size: "2.4 GB",
            desc: "Modelos de personajes y texturas de terreno en alta definición (Opcional).",
            icon: Layers
        },
        {
            title: "Pack de Addons",
            size: "150 MB",
            desc: "Colección esencial: QuestHelper, Recount, DBM y más, pre-configurados.",
            icon: FileArchive
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-wow-dark relative overflow-hidden">

            {/* --- FONTO DE AMBIENTACIÓN --- */}
            <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
                <Image
                    src="/images/cofres.png"
                    alt="Background"
                    fill
                    className="object-cover object-[75%_70%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wow-dark via-transparent to-wow-dark" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* TÍTULO PRINCIPAL */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
                        Centro de <span className="text-wow-blue">Suministros</span>
                    </h1>
                    <p className="text-wow-blue-gray mt-4 font-bold uppercase tracking-[0.3em] text-xs">
                        Descarga el cliente 3.3.5a y prepárate para la guerra
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMNA IZQUIERDA: CLIENTE PRINCIPAL */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-wow-card border border-wow-blue/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-wow-blue/20 p-3 rounded-xl border border-wow-blue/40">
                                        <Monitor className="text-wow-blue size-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Cliente Completo</h2>
                                        <p className="text-wow-blue-gray text-xs font-bold uppercase">Versión 3.3.5a (12340) • 16.5 GB</p>
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-8 max-w-xl">
                                    Nuestro cliente viene pre-configurado para conectar directamente a **PeraWoW**. Incluye cinemáticas originales y todos los idiomas (esES). No requiere instalación, solo descomprimir y jugar.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {clientMirrors.map((mirror) => (
                                        <a
                                            key={mirror.name}
                                            href={mirror.url}
                                            className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 transition-all duration-300 ${mirror.color} group/btn`}
                                        >
                                            <mirror.icon className="size-8 text-white mb-3 group-hover/btn:scale-110 transition-transform" />
                                            <span className="font-black text-white uppercase tracking-widest text-sm">{mirror.name}</span>
                                            <span className="text-[10px] text-gray-500 mt-2 text-center leading-tight">{mirror.desc}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* EXTRAS Y PARCHES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {extras.map((extra) => (
                                <div key={extra.title} className="bg-wow-card/50 border border-white/5 p-6 rounded-2xl hover:border-wow-gold/30 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <extra.icon className="size-6 text-wow-gold" />
                                        <span className="text-[10px] font-black bg-wow-gold/10 text-wow-gold px-2 py-1 rounded tracking-widest">
                                            {extra.size}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold uppercase text-sm mb-2">{extra.title}</h3>
                                    <p className="text-wow-blue-gray text-xs mb-6 leading-relaxed">{extra.desc}</p>
                                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                        Descargar Contenido <ExternalLink size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: REQUISITOS Y INFO */}
                    <div className="space-y-6">
                        <section className="bg-black/40 border border-white/5 p-8 rounded-3xl">
                            <h3 className="text-wow-blue font-black uppercase text-sm tracking-[0.2em] mb-6 flex items-center gap-2">
                                <ShieldCheck size={18} /> Requisitos Mínimos
                            </h3>

                            <ul className="space-y-4">
                                {[
                                    { label: "SO", value: "Windows 7 / 10 / 11" },
                                    { label: "Procesador", value: "Dual Core 2.0 GHz" },
                                    { label: "Memoria RAM", value: "2 GB RAM" },
                                    { label: "Gráficos", value: "128 MB VRAM" },
                                    { label: "Espacio", value: "20 GB Libres" },
                                ].map((req) => (
                                    <li key={req.label} className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-wow-blue-gray text-[10px] uppercase font-bold">{req.label}</span>
                                        <span className="text-white text-xs font-medium">{req.value}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-4 bg-wow-gold/5 border border-wow-gold/20 rounded-xl">
                                <p className="text-[10px] text-wow-gold font-bold leading-relaxed uppercase">
                                    Tips: <span className="text-white/80">Si usas Windows 11, ejecuta el Wow.exe como Administrador para evitar errores de escritura.</span>
                                </p>
                            </div>
                        </section>

                        <div className="bg-wow-blue/10 border border-wow-blue/20 p-6 rounded-3xl text-center">
                            <p className="text-white text-sm font-bold mb-4 italic">¿Dudas con la descarga?</p>
                            <a href="/how-to-connect" className="text-wow-blue text-[10px] font-black uppercase tracking-widest hover:underline">
                                Ver guía de conexión →
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}