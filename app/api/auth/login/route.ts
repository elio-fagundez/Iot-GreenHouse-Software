import { NextResponse } from "next/server";
import { setCookie } from "nookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return new Response(JSON.stringify({ error: data.error || 'Error en el login' }), { status: backendRes.status });
    }

    // Si requiere 2FA
    if (data.twoFactorRequired && data.tempToken) {
      const response = NextResponse.json({ twoFactorRequired: true });
      response.cookies.set('temp2fa', data.tempToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 10 * 60, // 10 minutos
        secure: process.env.NODE_ENV === 'production'
      });
      return response;
    }

    // Caso sin 2FA (no debería ocurrir ahora, pero fallback)
    const response = NextResponse.json(data);
    if (data.token) {
      response.cookies.set('token', data.token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production'
      });
    }
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error de conexión con el backend' }), { status: 500 });
  }
}
