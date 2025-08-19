import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const signIn = (email: string, password: string) => {
    // Simulação de login
    setUser(email);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
