import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const UserContext = createContext();

// 2. Crear el proveedor
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // usuario inicialmente no logueado

  const login = (userData) => setUser(userData); // función para loguear
  const logout = () => setUser(null); // función para desloguear

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto fácilmente
export function useUser() {
  return useContext(UserContext);
}
