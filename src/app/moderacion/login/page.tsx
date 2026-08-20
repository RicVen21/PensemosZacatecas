import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Moderación · Pensemos Zacatecas" };

export default function LoginModeracionPage() {
  return (
    <div className="flex justify-center px-6 py-20 sm:px-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-marino">Moderación</h1>
          <p className="mt-1 text-sm text-ink-mute">Acceso restringido al equipo de Pensemos Zacatecas.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
