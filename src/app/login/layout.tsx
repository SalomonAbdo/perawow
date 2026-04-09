// Layout server-side para /login
// Si el usuario ya tiene sesión, lo manda al dashboard directamente
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (session) redirect("/dashboard");
    return <>{children}</>;
}

