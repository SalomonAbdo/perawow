// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
// Asegúrate de haber ejecutado: npm install lucide-react
import { Zap, Users, Download, ShieldCheck } from "lucide-react";
import SnowfallBlock from "@/components/SnowfallBlock";

// Datos estáticos (Próximamente vendrán de la DB)
const serverStats = {
  online: 1250,
  uptime: "15d 4h",
  patch: "3.3.5a",
  realmName: "Arthas [PvP]"
};

const latestNews = [
  { title: "Mantenimiento Semanal", date: "Hace 2 horas" },
  { title: "Temporada de Arenas 8 Comienza", date: "Ayer" },
  { title: "Arreglos en Ciudadela de la Corona de Hielo", date: "Hace 3 días" },
];

export default function HomePage() {
  return (
      <main className="min-h-screen bg-wow-dark text-gray-200 relative">
        <SnowfallBlock />

        {/* 1. SECCIÓN HERO */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b-2 border-wow-blue/20">
          <div className="absolute inset-0 z-0">
            {/* Si no tienes la imagen aún, el alt se mostrará, pero no dará error crítico */}
            <Image
                src="/images/hero-bg.webp"
                alt="Wrath of the Lich King Background"
                fill
                priority
                className="object-cover object-top opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wow-dark/50 to-wow-dark" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mt-20">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-4">
              PERA<span className="text-wow-blue">WOW</span>
            </h1>
            <p className="text-xl md:text-2xl text-wow-blue-gray mb-10 max-w-3xl mx-auto uppercase font-medium tracking-wide">
              Revive la leyenda de la versión <span className="text-wow-gold">3.3.5a</span> en un reino estable, justo y épico.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* BOTÓN JUGAR AHORA (CORREGIDO) */}
              <Link
                  href="/register"
                  className="bg-wow-gold text-black px-10 py-4 rounded font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="size-5" />
                JUGAR AHORA
              </Link>

              {/* BOTÓN CÓMO CONECTAR */}
              <Link
                  href="/how-to-connect"
                  className="bg-wow-card border border-wow-blue/40 text-wow-blue px-10 py-4 rounded font-bold text-lg hover:bg-wow-blue/10 transition flex items-center justify-center gap-2"
              >
                <Download className="size-5" />
                CÓMO CONECTAR
              </Link>
            </div>
          </div>
        </section>

        {/* 2. SECCIÓN DE ESTADO Y CARACTERÍSTICAS */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Card: Jugadores Online */}
            <div className="md:col-span-1 bg-wow-card border border-wow-blue/30 rounded-lg p-6 flex flex-col items-center text-center shadow-xl">
              <div className="relative size-20 mb-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-wow-blue rounded-full animate-pulse opacity-20"></div>
                <Users className="relative size-10 text-wow-blue" />
              </div>
              <p className="text-sm text-wow-blue-gray uppercase tracking-widest font-bold">Jugadores Online</p>
              <p className="text-5xl font-black text-white">{serverStats.online.toLocaleString()}</p>
              <p className="text-xs text-wow-blue-gray mt-1 italic">Reino: {serverStats.realmName}</p>
            </div>

            <FeatureCard
                icon={<ShieldCheck className="size-8 text-wow-gold" />}
                title="Anticheat Propio"
                description="Entorno de juego justo y competitivo asegurado."
            />
            <FeatureCard
                icon={<Zap className="size-8 text-wow-gold" />}
                title="Rates Blizzlike x1"
                description="La experiencia original tal como fue diseñada."
            />
            <FeatureCard
                icon={<Users className="size-8 text-wow-gold" />}
                title="Comunidad Activa"
                description="Soporte 24/7 y eventos de comunidad semanales."
            />
          </div>
        </section>

        {/* 3. NOTICIAS Y DISCORD */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-10 h-1 bg-wow-gold rounded-full"></span>
                Últimas Noticias
              </h2>
              {latestNews.map((news, index) => (
                  <div key={index} className="bg-wow-card p-5 rounded border border-gray-800 hover:border-wow-gold/30 transition flex justify-between items-center group cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-100 group-hover:text-wow-gold transition">{news.title}</h3>
                    <span className="text-sm text-wow-blue-gray">{news.date}</span>
                  </div>
              ))}
            </div>

            <div className="bg-wow-card p-8 rounded-lg border border-[#5865F2]/40 text-center flex flex-col items-center justify-center">
              {/* Logo de Discord de alta calidad */}
              <div className="bg-[#5865F2] p-4 rounded-full mb-4">
                <Users className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Únete a la Comunidad</h3>
              <p className="text-wow-blue-gray mb-6 text-sm">Discute estrategias, busca hermandad y recibe soporte técnico.</p>
              <a href="#" target="_blank" className="bg-[#5865F2] text-white px-6 py-3 rounded font-bold hover:bg-[#4752c4] transition w-full block">
                ENTRAR AL DISCORD
              </a>
            </div>
          </div>
        </section>
      </main>
  );
}

// Componente auxiliar para las tarjetas
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
      <div className="bg-wow-card border border-gray-800 rounded-lg p-6 flex items-start gap-4 transition hover:border-wow-blue/30 shadow-md">
        <div className="bg-wow-dark p-3 rounded-md border border-gray-700 mt-1 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">{title}</h3>
          <p className="text-sm text-wow-blue-gray">{description}</p>
        </div>
      </div>
  );
}