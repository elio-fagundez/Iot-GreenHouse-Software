import { useEffect, useState } from "react";

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setUserId(null);
      setEmail(null);
      setLoading(false);
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setUserId(data.userId);
        setEmail(data.email);
      })
      .catch(() => {
        setUserId(null);
        setEmail(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { userId, email, loading };
}
