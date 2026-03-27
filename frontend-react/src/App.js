import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Empleados from "./pages/Empleados";
import Prendas from "./pages/Prendas";
import Alquiler from "./pages/Alquiler";
import LavanderiaPage from "./pages/LavanderiaPage";

function App() {

  return (

    <BrowserRouter> 

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/clientes" element={<Clientes/>} />\

        <Route path="/empleados" element={<Empleados/>} />

        <Route path="/prendas" element={<Prendas/>} />

        <Route path="/alquiler" element={<Alquiler/>} />

        <Route path="/lavanderia" element={<LavanderiaPage/>} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;