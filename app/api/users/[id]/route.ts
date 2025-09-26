import { NextResponse } from "next/server"

import { isJsonResponse, proxyToBackend } from "../../_utils/backend"

async function handleBackendResponse(response: Response, defaultError: string) {
  if (response.status === 204) {
    return new NextResponse(null, { status: 204 })
  }

  if (isJsonResponse(response)) {
    const data = await response.json()
    if (!response.ok) {
      const message = typeof data === "object" && data && "error" in data ? (data as { error?: string }).error : null
      return NextResponse.json({ error: message ?? defaultError }, { status: response.status })
    }

    return NextResponse.json(data, { status: response.status })
  }

  const fallbackText = await response.text()
  if (!response.ok) {
    return NextResponse.json({ error: fallbackText || defaultError }, { status: response.status })
  }

  return new NextResponse(fallbackText, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "text/plain; charset=utf-8",
    },
  })
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const backendResponse = await proxyToBackend(`/api/users/${params.id}`, { method: "GET" })
    return handleBackendResponse(backendResponse, "No se pudo obtener el usuario")
  } catch (error) {
    console.error("[api/users/:id] Error obteniendo usuario", error)
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await request.json()
    const backendResponse = await proxyToBackend(`/api/users/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    return handleBackendResponse(backendResponse, "No se pudo actualizar el usuario")
  } catch (error) {
    console.error("[api/users/:id] Error actualizando usuario", error)
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const backendResponse = await proxyToBackend(`/api/users/${params.id}`, {
      method: "DELETE",
    })
    return handleBackendResponse(backendResponse, "No se pudo eliminar el usuario")
  } catch (error) {
    console.error("[api/users/:id] Error eliminando usuario", error)
    return NextResponse.json({ error: "Backend no disponible" }, { status: 503 })
  }
}
