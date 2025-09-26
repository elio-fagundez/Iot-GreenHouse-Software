import { NextResponse } from "next/server";

import { isJsonResponse, proxyToBackend } from "../_utils/backend";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const backendResponse = await proxyToBackend("/api/plans", {
      method: "GET",
      searchParams,
    });

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    if (isJsonResponse(backendResponse)) {
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        const message = typeof data === "object" && data && "error" in data ? (data as { error?: string }).error : null;
        return NextResponse.json(
          { error: message ?? "No se pudo obtener la lista de planes" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json(data, { status: backendResponse.status });
    }

    const fallbackText = await backendResponse.text();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: fallbackText || "No se pudo obtener la lista de planes" },
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
    console.error("[api/plans] Error comunicándose con el backend", error);
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const backendResponse = await proxyToBackend("/api/plans", {
      method: "POST",
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
          { error: message ?? "No se pudo crear el plan" },
          { status: backendResponse.status },
        );
      }

      return NextResponse.json(data, { status: backendResponse.status });
    }

    const fallbackText = await backendResponse.text();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: fallbackText || "No se pudo crear el plan" },
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
    console.error("[api/plans] Error creando plan", error);
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 });
  }
}
