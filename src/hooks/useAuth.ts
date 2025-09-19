import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeTokenCookie } from "@/src/utils/authCookies";

export function useAuth() {
  const [user, setUser] = useState<null | { email: string; firstName: string; lastName: string }>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {
        removeTokenCookie();
        // Quitar redirección automática para debug
        // if (window.location.pathname.startsWith('/dashboard')) {
        //   router.replace("/login");
        // }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return { user, loading };
}