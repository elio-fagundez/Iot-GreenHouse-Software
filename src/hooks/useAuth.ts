import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<null | { email: string; firstName: string; lastName: string }>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", { cache: 'no-store', credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        if (!data?.user) throw new Error('Respuesta inválida del servidor');
        setUser(data.user);
      })
      .catch(() => {
        // No eliminar la cookie automáticamente; puede ser un fallo temporal
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [router]);

  return { user, loading };
}