import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "./api";
import { account } from "./appwrite";
import { getStoredAuth, clearStoredAuth, setStoredAuth } from "./storage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/auth/me");
      if (response.status === 200 && response.data) {
        const user = response.data.data || response.data.user || response.data;
        const resolvedUserId = user.id || user.user_id || user.userId;
        const resolvedName = user.displayName || user.name || user.email || "User";
        setStoredAuth(
          { user_id: resolvedUserId, access: "appwrite-session" },
          resolvedName
        );
        setIsAuthenticated(true);
      } else {
        clearStoredAuth();
        setIsAuthenticated(false);
      }
    } catch {
      clearStoredAuth();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        await fetchProfile();
      } catch {
        clearStoredAuth();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      await fetchProfile();
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const response = await api.post("/api/auth/register", { email, password, name });
      if (response.status === 201 || response.status === 200) {
        await account.createEmailPasswordSession(email, password);
        await fetchProfile();
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await account.deleteSession("current");
      await api.post("/api/auth/logout").catch(() => {});
    } catch (error) {
      console.error("Logout warning:", error);
    } finally {
      clearStoredAuth();
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
