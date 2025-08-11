import { Fragment, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HeaderLogo } from "./components/HeaderLogo";
import { HeaderNav } from "./components/HeaderNav";
import { Footer } from "./components/Footer";
import { PackagesPage } from "./pages/PackagesPage";
import { PackagesPageResults } from "./pages/PackagesPageResults";
import { PackagesAcommodationsDetails } from "./pages/PackagesAcommodationsDetails";
import { PackagesFlightsDetails } from "./pages/PackagesFlightsDetails";
import { PackagesBookingDetails } from "./pages/PackagesBookingDetails";
import { MyReservations } from "./pages/MyReservations";
import { AboutUs } from "./pages/AboutUs";

function App() {
  return (
    <>
      <HeaderLogo />
      <HeaderNav />
      <Routes>
        <Route path="/" element={<PackagesPage />} />
        <Route path="/paquetes" element={<PackagesPage />} />
        <Route path="/paquetes/resultados" element={<PackagesPageResults />} />
        <Route
          path="/paquetes/resultados/hospedajes/detalles/:id"
          element={<PackagesAcommodationsDetails />}
        />
        <Route
          path="/paquetes/resultados/vuelos/detalles/:id"
          element={<PackagesFlightsDetails />}
        />
        <Route
          path="/paquetes/resultados/reservas/detalles/:id"
          element={<PackagesBookingDetails />}
        />
        <Route path="/reservas" element={<MyReservations />} />
        <Route
          path="/reservas/detalles/:id"
          element={<PackagesBookingDetails />}
        />
        <Route path="/actividades" element={<h1>No hay nada gato</h1>} />
        <Route path="/sobrenosotros" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
