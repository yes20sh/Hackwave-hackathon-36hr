import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(localStorage.getItem("isLogin")) || false
  );

  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", true);
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
