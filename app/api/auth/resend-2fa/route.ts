import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Necesita cookie temp2fa existente
  const temp = req.cookies.get('temp2fa')?.value;
  if (!temp) {
    return NextResponse.json({ error: 'No hay sesión 2FA activa' }, { status: 400 });
  }
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return NextResponse.json({ error: 'Config faltante' }, { status: 500 });
    const backendRes = await fetch(`${apiUrl}/auth/resend-2fa`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${temp}` },
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error || 'Error reenviando' }, { status: backendRes.status });
    }
    return NextResponse.json({ message: 'Código reenviado' });
  } catch (e: any) {
    if (e?.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json({ error: 'Backend no disponible' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
