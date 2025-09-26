import { clearAuthRelatedCookies } from "@/src/utils/authCookies";

export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
  } catch (error) {
    console.error("[logout] Error llamando a /api/auth/logout", error);
  } finally {
    clearAuthRelatedCookies();
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  }
}
