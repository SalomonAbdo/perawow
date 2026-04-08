"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, User as UserIcon, Shield } from "lucide-react";

export default function UserNavbarDropdown({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1 pr-4 bg-wow-blue/10 border border-wow-blue/30 rounded-full hover:bg-wow-blue/20 transition-all group"
            >
                {/* Avatar Estilo WoW */}
                <div className="size-9 rounded-full bg-wow-dark border-2 border-wow-blue shadow-[0_0_10px_rgba(0,186,255,0.3)] flex items-center justify-center overflow-hidden">
                    <UserIcon className="size-5 text-wow-blue" />
                </div>

                <div className="text-left hidden sm:block">
                    <p className="text-[10px] font-black text-wow-blue uppercase leading-none tracking-tighter">Conectado</p>
                    <p className="text-sm font-bold text-white leading-tight uppercase tracking-tight group-hover:text-wow-gold transition-colors">
                        {user.username}
                    </p>
                </div>
            </button>

            {/* Menú Desplegable Épico */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-3 w-56 bg-wow-card border border-wow-blue/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.7)] py-2 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Decoración de Cuero/Metal en el header del dropdown */}
                        <div className="px-4 py-3 border-b border-gray-800 bg-white/5 mb-2">
                            <p className="text-[9px] font-black text-wow-gold uppercase tracking-[0.3em]">Gestión de Cuenta</p>
                        </div>

                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-wow-blue-gray hover:text-white hover:bg-wow-blue/10 transition-colors font-bold"
                        >
                            <LayoutDashboard className="size-4 text-wow-blue" />
                            Panel de Control
                        </Link>

                        <Link
                            href="/dashboard/characters"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-wow-blue-gray hover:text-white hover:bg-wow-blue/10 transition-colors font-bold"
                        >
                            <Shield className="size-4 text-wow-blue" />
                            Mis Personajes
                        </Link>

                        <div className="h-px bg-gray-800 my-2 mx-4" />

                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-bold"
                        >
                            <LogOut className="size-4" />
                            Cerrar Sesión
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}