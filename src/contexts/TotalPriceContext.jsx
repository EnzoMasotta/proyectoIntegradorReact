import { createContext, useContext, useState } from "react";

const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [personas, setPersonas] = useState(null);

  return (
    <TotalPriceContext.Provider
      value={{ totalPrice, setTotalPrice, personas, setPersonas }}
    >
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => useContext(TotalPriceContext);
