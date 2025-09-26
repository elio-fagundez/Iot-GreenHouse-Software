const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export function getBackendBaseUrl(): string {
  if (!rawBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return rawBaseUrl.replace(/\/$/, "");
}

interface ProxyOptions extends RequestInit {
  searchParams?: URLSearchParams | Record<string, string | number | boolean | null | undefined>;
}

function buildSearchParams(params: ProxyOptions["searchParams"]): string {
  if (!params) {
    return "";
  }
  if (params instanceof URLSearchParams) {
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    searchParams.set(key, String(value));
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function proxyToBackend(path: string, init?: ProxyOptions): Promise<Response> {
  const baseUrl = getBackendBaseUrl();
  const { searchParams, headers, ...rest } = init ?? {};
  const query = buildSearchParams(searchParams);
  const url = `${baseUrl}${path}${query}`;

  const response = await fetch(url, {
    ...rest,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
  });

  return response;
}

export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json");
}
