import { Fragment, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HeaderLogo } from "./components/HeaderLogo";
import { HeaderNav } from "./components/HeaderNav";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <HeaderLogo />
      <HeaderNav />
      <Routes>
        <Route path="/" element={<h1>Pagina principal</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
