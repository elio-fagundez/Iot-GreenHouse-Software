import { useEffect, useState } from "react";

// Lee al usuario autenticado a través del endpoint interno, que usa la cookie httpOnly 'token'.
export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('unauthorized');
        const data = await res.json();
        // Esperamos { user: { id, email } }
        const user = data?.user;
        if (!user?.id) throw new Error('invalid-shape');
        setUserId(String(user.id));
        setEmail(user.email || null);
      })
      .catch(() => {
        setUserId(null);
        setEmail(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { userId, email, loading };
}
