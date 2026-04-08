import { auth } from "@/auth";
import { Shield, Clock, Trophy, Swords } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    const stats = [
        { label: "Estatus", value: "Activa", icon: Shield, color: "text-green-400" },
        { label: "Rango", value: "Jugador", icon: Trophy, color: "text-wow-gold" },
        { label: "Personajes", value: "0", icon: Swords, color: "text-wow-blue" },
        { label: "Total Online", value: "0h", icon: Clock, color: "text-purple-400" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase">
                    Bienvenido, <span className="text-wow-gold">{(session?.user as Record<string, unknown>)?.username as string || session?.user?.name || 'Héroe'}</span>
                </h1>
                <p className="text-wow-blue-gray text-sm font-bold uppercase tracking-widest mt-1">
                    Reino de Rasganorte 3.3.5a
                </p>
            </div>

            {/* Grid de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-wow-card border border-wow-blue/10 p-6 rounded-xl shadow-lg hover:border-wow-blue/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`size-6 ${stat.color}`} />
                        </div>
                        <p className="text-wow-blue-gray text-[10px] font-black uppercase tracking-tighter">{stat.label}</p>
                        <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Sección de "Últimas Noticias del Reino" o "Estatus del Servidor" */}
            <div className="bg-wow-card border border-wow-blue/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-wow-blue">Avisos del Sistema</h3>
                    <span className="text-[10px] bg-wow-blue/20 text-wow-blue px-2 py-1 rounded font-black uppercase">v1.0.0</span>
                </div>
                <div className="p-8">
                    <p className="text-wow-blue-gray leading-relaxed italic">
                        &quot;Para entrar al juego, asegúrate de configurar tu **realmlist** a: <span className="text-white font-mono not-italic">set realmlist localhost</span>&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}