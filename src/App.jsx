import { Fragment, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Pagina principal</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
