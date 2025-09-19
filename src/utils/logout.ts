import { removeTokenCookie } from "@/src/utils/authCookies";

export function logout() {
  removeTokenCookie();
  window.location.href = "/login"; // Redirigir a login
}
