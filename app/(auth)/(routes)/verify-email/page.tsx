"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return; // Not signed in
    const emailVerified = user.emailAddresses?.some((e) => e.verification?.status === "verified");
    if (emailVerified) router.replace("/dashboard");
  }, [isLoaded, user, router]);

  const resend = async () => {
    setError(null);
    setSending(true);
    try {
      const primary = user?.primaryEmailAddress;
      await primary?.prepareVerification({ strategy: "email_code" });
    } catch (e: any) {
      setError(e?.errors?.[0]?.message || "No se pudo reenviar el código");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Verifica tu correo</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        Te enviamos un código de verificación a tu email. Ingresa el código desde el enlace del correo
        o vuelve a solicitarlo.
      </p>
      <button
        onClick={resend}
        disabled={sending}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
      >
        {sending ? "Enviando..." : "Reenviar código"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
