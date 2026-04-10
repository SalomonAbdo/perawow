"use client";

import { Swords, MapPin, Shield, Zap, Target } from "lucide-react";

const mockCharacters = [
    { name: "Arthas", race: "Humano", class: "Death Knight", level: 80, online: true, zone: "Icecrown Citadel", color: "#C41F3B" },
    { name: "Sylvanas", race: "No-muerto", class: "Hunter", level: 80, online: false, zone: "Undercity", color: "#ABD473" },
    { name: "Uther", race: "Humano", class: "Paladin", level: 72, online: false, zone: "Stormwind City", color: "#F58CBA" },
    { name: "Jaina", race: "Humano", class: "Mage", level: 80, online: true, zone: "Dalaran", color: "#69CCF0" },
];

export default function CharactersPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

            <div
                className="absolute inset-0 z-0 opacity-40 bg-cover"
                style={{
                    backgroundImage: "url('/images/azeroth.webp')",
                    filter: "brightness(0.5) contrast(1.2)",
                    /* 
                     * CONTROLES PARA MOVER LA FOTO:
                     * El primer porcentaje (X) la mueve de Izquierda a Derecha.
                     * El segundo porcentaje (Y) la mueve de Arriba a Abajo.
                     * Prueba con "50% 50%" para el centro exacto, o "75% 45%" por ejemplo.
                     */
                    backgroundPosition: "100% 10%"
                }}
            />

            {/* Encabezado Minimalista */}
            <header className="flex justify-between items-end pb-2 border-b-2 border-wow-blue/20">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Registro de <span className="text-wow-blue">Campaña</span>
                    </h1>
                    <p className="text-[10px] text-wow-blue-gray font-bold uppercase tracking-[0.4em]">
                        Personal asignado al Reino de Rasganorte
                    </p>
                </div>
            </header>

            {/* CONTENEDOR PRINCIPAL CON TEXTURA */}
            <div className="relative border-[6px] border-double border-[#3a2a1a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">

                {/* Capa de Imagen de Fondo (Textura de Madera/Metal) */}


                {/* Overlay de Degradado para Lectura (Clave para ingenieros: Contraste) */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

                <div className="relative z-10">
                    {/* Cabecera de la Tabla (Estética de Metal Forjado) */}
                    <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-black/60 border-b border-white/10 text-[11px] font-black text-wow-gold uppercase tracking-[0.2em]">
                        <div className="col-span-1">Nivel</div>
                        <div className="col-span-4 text-left">Identidad del Héroe</div>
                        <div className="col-span-3 text-center">Especialización</div>
                        <div className="col-span-3">Última Ubicación</div>
                        <div className="col-span-1 text-right">Status</div>
                    </div>

                    {/* Lista de Personajes */}
                    <div className="divide-y divide-white/5">
                        {mockCharacters.map((char) => (
                            <div
                                key={char.name}
                                className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-white/[0.03] transition-all group"
                            >
                                {/* Nivel en Marco de Acero */}
                                <div className="col-span-1">
                                    <div className="size-10 rounded-lg border-2 border-gray-700 bg-black/60 flex items-center justify-center shadow-inner group-hover:border-wow-blue transition-colors">
                                        <span className="text-lg font-black text-white italic tracking-tighter">
                                            {char.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Nombre con Indicador de Clase Lateral */}
                                <div className="col-span-4 flex items-center gap-4">
                                    <div
                                        className="w-1.5 h-8 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                        style={{ backgroundColor: char.color }}
                                    />
                                    <span className="text-xl font-bold text-white uppercase tracking-tighter group-hover:text-wow-gold transition-colors">
                                        {char.name}
                                    </span>
                                </div>

                                {/* Raza y Clase en Formato Limpio */}
                                <div className="col-span-3 flex flex-col items-center">
                                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest leading-none">
                                        {char.race}
                                    </span>
                                    <span className="text-xs font-black uppercase tracking-tight mt-1" style={{ color: char.color }}>
                                        {char.class}
                                    </span>
                                </div>

                                {/* Ubicación con Icono Sutil */}
                                <div className="col-span-3 flex items-center gap-2">
                                    <MapPin size={14} className="text-wow-blue opacity-50" />
                                    <span className="text-[11px] font-bold text-wow-blue-gray uppercase truncate tracking-wide">
                                        {char.zone}
                                    </span>
                                </div>

                                {/* Status Online (Orbe Rúnico) */}
                                <div className="col-span-1 flex justify-end">
                                    <div className={`size-3 rounded-full border-2 border-black ${
                                        char.online
                                            ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]'
                                            : 'bg-white/10'
                                    }`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer de Soporte */}
            <div className="flex items-center justify-between p-4 bg-wow-blue/5 border border-wow-blue/10 rounded-lg">
                <div className="flex items-center gap-3">
                    <Shield className="size-4 text-wow-blue" />
                    <p className="text-[9px] text-wow-blue-gray uppercase font-black tracking-widest">
                        Los datos se sincronizan cada vez que cierras sesión en el juego.
                    </p>
                </div>
                <button className="text-[9px] font-black text-wow-gold hover:underline uppercase tracking-widest">
                    ¿No aparece tu personaje?
                </button>
            </div>
        </div>
    );
}