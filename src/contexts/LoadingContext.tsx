import React, { createContext, useContext, useState, ReactNode } from 'react';
import Loading from '@/components/Loading';

type LoadingContextType = {
  showLoading: (msg?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>("Carregando...");

  const showLoading = (msg?: string) => {
    if (msg) setMessage(msg);
    setVisible(true);
  };

  const hideLoading = () => {
    setVisible(false);
    setMessage("Carregando...");
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Loading visible={visible} message={message} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de LoadingProvider");
  }
  return context;
}
