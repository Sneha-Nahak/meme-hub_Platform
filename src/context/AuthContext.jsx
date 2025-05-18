import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Done checking auth
  }, []);

  const login = async (username, password) => {
    if (username && password) {
      const userData = {
        username,
        displayName: username,
        avatar: `https://api.dicebear.com/6.x/thumbs/svg?seed=${username}`,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (username, displayName, password) => {
    if (username && displayName && password) {
      const userData = {
        username,
        displayName,
        avatar: `https://api.dicebear.com/6.x/thumbs/svg?seed=${username}`,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
