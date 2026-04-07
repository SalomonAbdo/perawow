// src/components/Navbar.tsx
"use client"; // Necesario para el estado del menú móvil

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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

                    {/* LOGO */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-white group">
                            <Image 
                                src="/images/logo.png" 
                                alt="PeraWoW Logo" 
                                // Puedes modificar estos números de width y height (ej: de 40 a 60, 80, etc.)
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                            <span>
                                PERA<span className="text-wow-blue group-hover:text-wow-gold transition-colors">WOW</span>
                            </span>
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
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

                    {/* DERECHA: BOTÓN MI CUENTA Y HAMBURGUESA MOBILE */}
                    <div className="flex items-center gap-4">
                        {/* BOTÓN MI CUENTA (Desktop) */}
                        <div className="hidden md:block">
                            <Link
                                href="/login"
                                className="flex items-center gap-2 bg-wow-gold/10 border border-wow-gold/50 text-wow-gold px-4 lg:px-5 py-2 rounded-md font-bold hover:bg-wow-gold hover:text-black transition-all text-xs lg:text-sm"
                            >
                                <User className="size-4" />
                                <span className="hidden lg:inline">MI CUENTA</span>
                            </Link>
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
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 bg-wow-gold text-black mx-3 py-3 rounded-md font-bold"
                        >
                            <User className="size-5" />
                            MI CUENTA
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}