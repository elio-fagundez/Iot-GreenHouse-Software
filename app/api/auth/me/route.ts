import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, "");
    const backendRes = await fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      // Evitar cache para siempre traer estado actual
      cache: 'no-store'
    });
    if (!backendRes.ok) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const data = await backendRes.json();
    return NextResponse.json({ user: data.user });
  } catch (e: any) {
    if (e?.cause?.code === 'ECONNREFUSED' || e?.code === 'ECONNREFUSED') {
      console.error('[auth/me] Backend no accesible (ECONNREFUSED)');
      return NextResponse.json({ error: 'Servicio de autenticación no disponible' }, { status: 503 });
    }
    console.error('[auth/me] Error inesperado:', e);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
