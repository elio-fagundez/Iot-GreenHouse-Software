import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;
    if (!code) {
      return NextResponse.json({ error: 'Código requerido' }, { status: 400 });
    }
    const tempToken = req.cookies.get('temp2fa')?.value;
    if (!tempToken) {
      return NextResponse.json({ error: 'Sesión 2FA no encontrada' }, { status: 401 });
    }

    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!base) {
      return NextResponse.json({ error: 'Configuración no válida (NEXT_PUBLIC_API_URL)' }, { status: 500 });
    }
    const backendRes = await fetch(`${base}/auth/verify-2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tempToken}`,
      },
      body: JSON.stringify({ code }),
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error || 'Código inválido' }, { status: backendRes.status });
    }

    const response = NextResponse.json({ success: true });
    // Setear token final y limpiar temp2fa
    if (data.token) {
      response.cookies.set('token', data.token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production'
      });
      response.cookies.set('temp2fa', '', { path: '/', maxAge: 0 });
    }
    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Error verificando código' }, { status: 500 });
  }
}
