import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { MenuProvider } from "./contexts/MenuContext";
import { TotalPriceProvider } from "./contexts/TotalPriceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MenuProvider>
          <TotalPriceProvider>
            <App />
          </TotalPriceProvider>
        </MenuProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
