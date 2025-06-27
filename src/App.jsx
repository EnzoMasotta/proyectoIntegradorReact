import { Fragment, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HeaderLogo } from "./components/HeaderLogo";
import { HeaderNav } from "./components/HeaderNav";
import { Footer } from "./components/Footer";
import { PackagesPage } from "./pages/PackagesPage";
import { PackagesPageResults } from "./pages/PackagesPageResults";

function App() {
  return (
    <>
      <HeaderLogo />
      <HeaderNav />
      <Routes>
        <Route path="/" element={<PackagesPage />} />
        <Route path="/paquetes" element={<PackagesPage />} />
        <Route path="/paquetes/resultados" element={<PackagesPageResults />} />
        <Route path="/reservas" element={<h1>Aca vas a ver las reservas</h1>} />
        <Route path="/actividades" element={<h1>No hay nada gato</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
