"use client";
import { Bell, Search, User as UserIcon } from "lucide-react";

export default function DashboardHeader({ user }: { user: any }) {
    return (
        <header className="h-20 border-b border-wow-blue/10 bg-wow-card/50 backdrop-blur-md px-8 flex items-center justify-between z-10">

            {/* Buscador rápido (Estético por ahora) */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-wow-blue-gray" />
                <input
                    type="text"
                    placeholder="Buscar en el reino..."
                    className="bg-wow-dark/50 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-wow-blue/40 w-64 transition-all"
                />
            </div>

            {/* Acciones de Usuario */}
            <div className="flex items-center gap-6 ml-auto">
                <button className="relative text-wow-blue-gray hover:text-wow-blue transition-colors">
                    <Bell className="size-5" />
                    <span className="absolute -top-1 -right-1 size-2 bg-wow-gold rounded-full border-2 border-wow-card"></span>
                </button>

                <div className="h-8 w-px bg-gray-800"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-white uppercase tracking-tighter">
                            {user?.username || "Jugador"}
                        </p>
                        <p className="text-[10px] text-wow-gold font-bold uppercase tracking-widest">
                            En Línea
                        </p>
                    </div>

                    <div className="size-10 rounded-lg bg-wow-blue/10 border border-wow-blue/30 flex items-center justify-center shadow-inner">
                        <UserIcon className="size-6 text-wow-blue" />
                    </div>
                </div>
            </div>
        </header>
    );
}