"use client";

import { UserPlus, Download, Settings, PlayCircle, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HowToConnectPage() {
    const [copied, setCopied] = useState(false);
    const realmList = "set realmlist logon.wowpera.com"; // Cambia esto por tu IP/Dominio

    const copyToClipboard = () => {
        navigator.clipboard.writeText(realmList);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const steps = [
        {
            title: "Creación de Cuenta",
            desc: "El primer paso de tu leyenda. Crea tu identidad para poder acceder tanto al reino como a este panel de control.",
            icon: UserPlus,
            buttonText: "Registrar Cuenta",
            href: "/register",
            color: "text-wow-gold",
            borderColor: "border-wow-gold/30"
        },
        {
            title: "Descarga del Cliente",
            desc: "Necesitas la versión 3.3.5a (12340). Si ya la tienes, puedes saltar este paso. Si no, descarga nuestro cliente optimizado.",
            icon: Download,
            buttonText: "Ir a Descargas",
            href: "/download",
            color: "text-wow-blue",
            borderColor: "border-wow-blue/30"
        },
        {
            title: "Configuración del Realmlist",
            desc: "Para que tu juego encuentre nuestro reino, debes modificar el archivo realmlist.wtf dentro de la carpeta Data/esES (o enUS).",
            icon: Settings,
            isRealmlist: true,
            color: "text-purple-400",
            borderColor: "border-purple-500/30"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-wow-dark relative overflow-hidden">
            {/* Efectos gélidos de fondo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-wow-blue/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Encabezado Épico */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                        ¿Cómo <span className="text-wow-blue">Conectar?</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-wow-gold mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,174,0,0.5)]" />
                    <p className="text-wow-blue-gray mt-6 text-lg font-medium max-w-2xl mx-auto">
                        Sigue estos sencillos pasos para iniciar tu aventura en el servidor más estable de habla hispana.
                    </p>
                </div>

                {/* Pasos de la Guía */}
                <div className="space-y-12 relative">
                    {/* Línea conectora (Desktop) */}
                    <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-wow-gold via-wow-blue to-purple-500 opacity-20 hidden md:block" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row gap-8 items-start group">
                            {/* Círculo con Número/Icono */}
                            <div className={`relative z-10 size-20 shrink-0 rounded-2xl bg-wow-card border ${step.borderColor} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon className={`size-8 ${step.color}`} />
                                <div className="absolute -top-2 -right-2 size-7 bg-wow-dark border border-gray-700 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                                    0{index + 1}
                                </div>
                            </div>

                            {/* Contenido de la Tarjeta */}
                            <div className="flex-1 bg-wow-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl shadow-xl hover:bg-wow-card/80 transition-colors">
                                <h3 className={`text-xl font-black uppercase tracking-tight mb-3 ${step.color}`}>
                                    {step.title}
                                </h3>
                                <p className="text-wow-blue-gray leading-relaxed mb-6">
                                    {step.desc}
                                </p>

                                {step.isRealmlist ? (
                                    <div className="space-y-4">
                                        <div className="bg-black/60 border border-purple-500/20 p-4 rounded-lg flex items-center justify-between group/code">
                                            <code className="text-purple-300 font-mono text-sm">
                                                {realmList}
                                            </code>
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-2 hover:bg-white/5 rounded-md transition-colors text-wow-blue-gray hover:text-white"
                                            >
                                                {copied ? <CheckCircle2 className="size-5 text-green-400" /> : <Copy className="size-5" />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-wow-blue-gray uppercase font-bold tracking-widest">
                                            Haz clic en el icono para copiar el realmlist
                                        </p>
                                    </div>
                                ) : (
                                    <Link
                                        href={step.href || "#"}
                                        className={`inline-flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em] px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${step.color}`}
                                    >
                                        {step.buttonText}
                                        <PlayCircle className="size-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer de la Guía */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-wow-blue/10 to-purple-500/10 border border-wow-blue/20 text-center">
                    <h4 className="text-white font-bold mb-2 uppercase tracking-widest">¿Necesitas ayuda técnica?</h4>
                    <p className="text-wow-blue-gray text-sm mb-6">Nuestro equipo de GMs está disponible en Discord para ayudarte con cualquier problema.</p>
                    <Link
                        href="/discord"
                        className="bg-wow-blue text-black font-black py-3 px-10 rounded-full uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all shadow-lg shadow-wow-blue/20"
                    >
                        Unirse al Discord
                    </Link>
                </div>
            </div>
        </main>
    );
}