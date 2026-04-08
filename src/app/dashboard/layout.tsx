import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Protección de ruta: Si no hay sesión, al login
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-wow-dark flex">
            {/* Sidebar Lateral */}
            <Sidebar user={session.user} />

            <div className="flex-1 flex flex-col">
                {/* Header Superior con info de sesión */}
                <DashboardHeader user={session.user} />

                {/* Contenido Dinámico */}
                <main className="p-6 md:p-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}