// Test code for authentication
// Someone who is authenticated is considered "signed in"
// This provider controls the look of the sign in button
// nothing else besides the look of the sign in/sign out button is controlled by this provider currently

'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AuthUser = { name?: string } | null;

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type TestAuthProviderProps = {
  children: ReactNode;
  initialAuth: boolean;
};

export function TestAuthProvider({ children, initialAuth }: TestAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<AuthUser>(initialAuth ? { name: 'Signed In' } : null);

  const signIn = () => {
    setIsAuthenticated(true);
    setUser({ name: 'Signed In' });
    document.cookie = 'testing-auth=true; path=/; max-age=31536000';
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    document.cookie = 'testing-auth=; path=/; max-age=0';
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      signIn,
      signOut,
    }),
    [isAuthenticated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
