import { createContext, useContext, useState, useEffect } from "react";

const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(() => {
    const saved = sessionStorage.getItem("totalPrice");
    return saved ? JSON.parse(saved) : null;
  });

  const [personas, setPersonas] = useState(() => {
    const saved = sessionStorage.getItem("personas");
    return saved ? JSON.parse(saved) : null;
  });

  const [totalNights, setTotalNights] = useState(() => {
    const saved = sessionStorage.getItem("totalNights");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (totalPrice !== null) {
      sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    } else {
      sessionStorage.removeItem("totalPrice");
    }
  }, [totalPrice]);

  useEffect(() => {
    if (personas !== null) {
      sessionStorage.setItem("personas", JSON.stringify(personas));
    } else {
      sessionStorage.removeItem("personas");
    }
  }, [personas]);

  useEffect(() => {
    if (totalNights !== null) {
      sessionStorage.setItem("totalNights", JSON.stringify(totalNights));
    } else {
      sessionStorage.removeItem("totalNights");
    }
  }, [totalNights]);

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
