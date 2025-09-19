import { setCookie, destroyCookie, parseCookies } from 'nookies';

export function saveTokenToCookie(token: string) {
  setCookie(null, 'token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
    secure: true,
    sameSite: 'lax',
  });
}

export function removeTokenCookie() {
  destroyCookie(null, 'token', { path: '/' });
}

export function getTokenFromCookie() {
  const cookies = parseCookies();
  return cookies.token || null;
}
