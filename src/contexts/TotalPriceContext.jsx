import { createContext, useContext, useState } from "react";

const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [personas, setPersonas] = useState(null);
  const [totalNights, setTotalNights] = useState(null);

  return (
    <TotalPriceContext.Provider
      value={{
        totalPrice,
        setTotalPrice,
        personas,
        setPersonas,
        totalNights,
        setTotalNights,
      }}
    >
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => useContext(TotalPriceContext);
