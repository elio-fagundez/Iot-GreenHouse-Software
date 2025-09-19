export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;
    console.log(email, password);
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return new Response(JSON.stringify({ error: data.error || 'Error en el registro' }), { status: backendRes.status });
    }
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error de conexión con el backend' }), { status: 500 });
  }
}
