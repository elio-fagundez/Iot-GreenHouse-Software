// GreenhouseContext.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export interface Greenhouse {
  id: number;
  name: string;
  country?: string;
  phone?: string;
  cif?: string;
  website?: string;
  profileImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface GreenhouseContextProps {
  greenhouses: Greenhouse[];
  loading: boolean;
  refreshGreenhouses: () => Promise<Greenhouse[]>;
  selectedGreenhouseId: number | null;
  setSelectedGreenhouseId: (id: number | null) => void;
  selectedGreenhouse: Greenhouse | null;
}

const GreenhouseContext = createContext<GreenhouseContextProps | undefined>(undefined);

const parseInitialSelectedId = (): number | null => {
  try {
    const cookies = parseCookies();
    const cookieValue = cookies.selectedGreenhouse;
    if (!cookieValue) return null;
    const parsed = Number.parseInt(cookieValue, 10);
    return Number.isNaN(parsed) ? null : parsed;
  } catch (error) {
    console.error("[GreenhouseContext] No se pudo leer la cookie selectedGreenhouse:", error);
    return null;
  }
};

export const GreenhouseProvider = ({ children }: { children: ReactNode }) => {
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGreenhouseId, setSelectedGreenhouseId] = useState<number | null>(parseInitialSelectedId);

  const fetchGreenhouses = useCallback(async (): Promise<Greenhouse[]> => {
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!base) {
      console.error("[GreenhouseContext] Falta configurar NEXT_PUBLIC_API_URL");
      setGreenhouses([]);
      return [];
    }

    setLoading(true);
    try {
      const response = await fetch(`${base}/greenhouses`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Error al obtener invernaderos (${response.status})`);
      }
      const data: Greenhouse[] = await response.json();
      setGreenhouses(data);
      return data;
    } catch (error) {
      console.error("[GreenhouseContext] No se pudieron cargar los invernaderos:", error);
      setGreenhouses([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGreenhouses();
  }, [fetchGreenhouses]);

  useEffect(() => {
    if (greenhouses.length === 0) {
      return;
    }

    if (selectedGreenhouseId && greenhouses.some((item) => item.id === selectedGreenhouseId)) {
      return;
    }

    const fallbackId = greenhouses[0]?.id ?? null;
    if (fallbackId !== null) {
      setSelectedGreenhouseId(fallbackId);
    }
  }, [greenhouses, selectedGreenhouseId]);

  useEffect(() => {
    if (selectedGreenhouseId === null) {
      destroyCookie(null, "selectedGreenhouse", { path: "/" });
      return;
    }

    setCookie(null, "selectedGreenhouse", String(selectedGreenhouseId), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }, [selectedGreenhouseId]);

  const selectedGreenhouse = useMemo(() => {
    if (selectedGreenhouseId === null) return null;
    return greenhouses.find((item) => item.id === selectedGreenhouseId) ?? null;
  }, [greenhouses, selectedGreenhouseId]);

  const value: GreenhouseContextProps = {
    greenhouses,
    loading,
    refreshGreenhouses: fetchGreenhouses,
    selectedGreenhouseId,
    setSelectedGreenhouseId,
    selectedGreenhouse,
  };

  return <GreenhouseContext.Provider value={value}>{children}</GreenhouseContext.Provider>;
};

export const useGreenhouse = () => {
  const context = useContext(GreenhouseContext);
  if (context === undefined) {
    throw new Error("useGreenhouse must be used within a GreenhouseProvider");
  }
  return context;
};