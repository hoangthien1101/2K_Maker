import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [token, setToken] = useState<string | null>(() => authService.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = authService.getToken();
      if (!storedToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await authService.getMe();
        if (res.data) {
          setUser(res.data);
          localStorage.setItem('2k_maker_user', JSON.stringify(res.data));
        }
      } catch (err) {
        console.warn('Session verification failed:', err);
        authService.logout();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (identifier: string, pass: string) => {
    const res = await authService.login(identifier, pass);
    if (res.data?.user && res.data?.token) {
      setUser(res.data.user);
      setToken(res.data.token);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

