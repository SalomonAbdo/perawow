"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ChevronDown, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { logoutAction } from "@/actions/auth";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { data: session } = useSession(); // Obtenemos la sesión del lado del cliente

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Registro", href: "/register" },
        { name: "Descargas", href: "/download" },
        { name: "Rankings", href: "/rankings" },
        { name: "Comunidad", href: "/community" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-wow-dark/90 backdrop-blur-md border-b border-wow-blue/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO - MANTENIDO IGUAL */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-white group">
                            <Image
                                src="/images/logo.png"
                                alt="PeraWoW Logo"
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                            <span>
                                PERA<span className="text-wow-blue group-hover:text-wow-gold transition-colors">WOW</span>
                            </span>
                        </Link>
                    </div>

                    {/* DESKTOP NAV - MANTENIDO IGUAL */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-2 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-wow-gold px-2 lg:px-3 py-2 text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* DERECHA: LÓGICA DE MI CUENTA / DROPDOWN */}
                    <div className="flex items-center gap-4">

                        {/* DESKTOP: MI CUENTA / DROPDOWN */}
                        <div className="hidden md:block relative">
                            {session ? (
                                // Si está logueado: Diseño de Dropdown profesional
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-3 bg-wow-blue/10 border border-wow-blue/40 text-white px-4 py-2 rounded-md font-bold hover:bg-wow-blue/20 transition-all group"
                                    >
                                        <div className="size-6 rounded bg-wow-blue/20 flex items-center justify-center">
                                            <User className="size-4 text-wow-blue" />
                                        </div>
                                        <span className="text-xs uppercase tracking-widest group-hover:text-wow-gold transition-colors">
                                            {(session.user as Record<string, unknown>)?.username as string || session.user?.name}
                                        </span>
                                        <ChevronDown className={`size-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {dropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-52 bg-wow-card border border-wow-blue/30 rounded-lg shadow-2xl py-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-300 hover:text-white hover:bg-wow-blue/10 transition-colors uppercase tracking-widest"
                                                >
                                                    <LayoutDashboard className="size-4 text-wow-blue" />
                                                    Panel de Control
                                                </Link>
                                                <Link
                                                    href="/dashboard/characters"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-300 hover:text-white hover:bg-wow-blue/10 transition-colors uppercase tracking-widest"
                                                >
                                                    <Shield className="size-4 text-wow-blue" />
                                                    Mis Personajes
                                                </Link>
                                                <div className="h-px bg-gray-800 my-1 mx-2" />
                                                <button
                                                    onClick={() => logoutAction()}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-widest"
                                                >
                                                    <LogOut className="size-4" />
                                                    Cerrar Sesión
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                // Si NO está logueado: Botón Mi Cuenta original
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 bg-wow-gold/10 border border-wow-gold/50 text-wow-gold px-5 py-2 rounded-md font-bold hover:bg-wow-gold hover:text-black transition-all text-xs tracking-widest"
                                >
                                    <User className="size-4" />
                                    MI CUENTA
                                </Link>
                            )}
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-wow-blue hover:text-wow-gold focus:outline-none"
                            >
                                {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE NAV (Desplegable) */}
            {isOpen && (
                <div className="md:hidden bg-wow-card border-b border-wow-blue/20 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 hover:text-wow-gold block px-3 py-4 text-base font-bold uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Lógica móvil para Mi Cuenta */}
                        {session ? (
                            <div className="space-y-1">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 text-wow-blue px-3 py-4 text-base font-bold uppercase tracking-widest bg-wow-blue/5"
                                >
                                    <LayoutDashboard className="size-5" />
                                    Dashboard ({(session.user as Record<string, unknown>)?.username as string || session.user?.name})
                                </Link>
                                <button
                                    onClick={() => logoutAction()}
                                    className="w-full flex items-center gap-3 text-red-400 px-3 py-4 text-base font-bold uppercase tracking-widest"
                                >
                                    <LogOut className="size-5" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 bg-wow-gold text-black mx-3 py-3 rounded-md font-bold"
                            >
                                <User className="size-5" />
                                MI CUENTA
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}