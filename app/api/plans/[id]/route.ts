import { NextResponse } from "next/server";

import { isJsonResponse, proxyToBackend } from "../../_utils/backend";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const backendResponse = await proxyToBackend(`/plans/${params.id}`, { method: "GET" });

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    if (isJsonResponse(backendResponse)) {
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        const message = typeof data === "object" && data && "error" in data ? (data as { error?: string }).error : null;
        return NextResponse.json(
          { error: message ?? "Plan no encontrado" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json(data, { status: backendResponse.status });
    }

    const fallbackText = await backendResponse.text();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: fallbackText || "Plan no encontrado" },
        { status: backendResponse.status },
      );
    }

    return new NextResponse(fallbackText, {
      status: backendResponse.status,
      headers: {
        "content-type": backendResponse.headers.get("content-type") ?? "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[api/plans/:id] Error comunicándose con el backend", error);
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await request.json();
    const backendResponse = await proxyToBackend(`/plans/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    if (isJsonResponse(backendResponse)) {
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        const message = typeof data === "object" && data && "error" in data ? (data as { error?: string }).error : null;
        return NextResponse.json(
          { error: message ?? "No se pudo actualizar el plan" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json(data, { status: backendResponse.status });
    }

    const fallbackText = await backendResponse.text();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: fallbackText || "No se pudo actualizar el plan" },
        { status: backendResponse.status },
      );
    }

    return new NextResponse(fallbackText, {
      status: backendResponse.status,
      headers: {
        "content-type": backendResponse.headers.get("content-type") ?? "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[api/plans/:id] Error actualizando plan", error);
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const backendResponse = await proxyToBackend(`/plans/${params.id}`, { method: "DELETE" });
    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    if (isJsonResponse(backendResponse)) {
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        const message = typeof data === "object" && data && "error" in data ? (data as { error?: string }).error : null;
        return NextResponse.json(
          { error: message ?? "No se pudo eliminar el plan" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json(data, { status: backendResponse.status });
    }

    const fallbackText = await backendResponse.text();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: fallbackText || "No se pudo eliminar el plan" },
        { status: backendResponse.status },
      );
    }

    return new NextResponse(fallbackText, {
      status: backendResponse.status,
      headers: {
        "content-type": backendResponse.headers.get("content-type") ?? "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[api/plans/:id] Error eliminando plan", error);
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 });
  }
}
