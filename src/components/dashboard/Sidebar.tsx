"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    CreditCard,
    LogOut,
    ChevronRight,
    Sword
} from "lucide-react";
import { logoutAction } from "@/actions/auth";

interface SidebarProps {
    user: any;
}

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();

    // Configuración del Menú - Fácil de expandir
    const menuItems = [
        {
            name: "Resumen",
            icon: LayoutDashboard,
            href: "/dashboard"
        },
        {
            name: "Personajes",
            icon: Users,
            href: "/dashboard/characters"
        },
        {
            name: "Seguridad",
            icon: ShieldCheck,
            href: "/dashboard/security"
        },
        {
            name: "Tienda / Votos",
            icon: CreditCard,
            href: "/dashboard/store"
        },
    ];

    return (
        <aside className="w-72 bg-wow-card border-r border-wow-blue/20 flex flex-col z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">

            {/* LOGO / BRANDING */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="bg-wow-gold p-2 rounded-lg">
                        <Sword className="text-black size-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tighter italic leading-none">
                            WOW<span className="text-wow-gold">PERA</span>
                        </h2>
                        <p className="text-[9px] text-wow-blue uppercase font-bold tracking-[0.3em] mt-1 opacity-70">
                            Reino de Rasganorte
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVEGACIÓN PRINCIPAL */}
            <nav className="flex-1 px-4 space-y-1">
                <p className="text-[10px] font-black text-wow-blue-gray uppercase tracking-[0.2em] mb-4 px-4">
                    Menú Principal
                </p>

                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                isActive
                                    ? "bg-wow-blue/10 text-wow-blue border border-wow-blue/20 shadow-[inset_0_0_20px_rgba(0,186,255,0.1)]"
                                    : "text-wow-blue-gray hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`size-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                <span className="tracking-wide">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="size-4 animate-pulse" />}
                        </Link>
                    );
                })}
            </nav>

            {/* SECCIÓN INFERIOR: USUARIO Y LOGOUT */}
            <div className="p-4 mt-auto border-t border-gray-800/50 bg-black/20">
                <div className="mb-4 px-4 py-3 bg-wow-dark/50 rounded-lg border border-white/5 flex items-center gap-3">
                    <div className="size-8 rounded bg-wow-gold/20 flex items-center justify-center text-wow-gold font-black text-xs">
                        {user?.username?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate uppercase tracking-tighter">
                            {user?.username}
                        </p>
                        <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest">
                            Estado: Online
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => logoutAction()}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] border border-transparent hover:border-red-500/20"
                >
                    <LogOut className="size-4" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}