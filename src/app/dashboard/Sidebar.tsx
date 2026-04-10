"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShieldCheck, CreditCard, LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Resumen", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Personajes", icon: Users, href: "/dashboard/characters" },
        { name: "Seguridad", icon: ShieldCheck, href: "/dashboard/security" },
        { name: "Tienda / Votos", icon: CreditCard, href: "/dashboard/store" },
    ];

    return (
        <aside className="w-64 bg-wow-card border-r border-wow-blue/20 flex flex-col z-20">
            <div className="p-8">
                <h2 className="text-xl font-black text-white tracking-tighter italic">
                    WOW<span className="text-wow-gold">PERA</span>
                </h2>
                <p className="text-[10px] text-wow-blue uppercase font-bold tracking-[0.3em]">Control Panel</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                            pathname === item.href
                                ? "bg-wow-blue/10 text-wow-blue border border-wow-blue/20"
                                : "text-wow-blue-gray hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <item.icon className="size-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={() => logoutAction()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all font-bold text-sm"
                >
                    <LogOut className="size-5" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
