// GreenhouseContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface GreenhouseContextProps {
  selectedGreenhouse: number | null;
  setSelectedGreenhouse: (id: number) => void;
}

const GreenhouseContext = createContext<GreenhouseContextProps | undefined>(undefined);

export const GreenhouseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGreenhouse, setSelectedGreenhouse] = useState<number | null>(null);

  return (
    <GreenhouseContext.Provider value={{ selectedGreenhouse, setSelectedGreenhouse }}>
      {children}
    </GreenhouseContext.Provider>
  );
};

export const useGreenhouse = () => {
  const context = useContext(GreenhouseContext);
  if (context === undefined) {
    throw new Error('useGreenhouse must be used within a GreenhouseProvider');
  }
  return context;
};