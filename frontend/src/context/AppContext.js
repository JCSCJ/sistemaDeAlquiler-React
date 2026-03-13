import React, { createContext, useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {

  const [clientes, setClientes] = useState([]);
  const [prendas, setPrendas] = useState([]);
  const [alquileres, setAlquileres] = useState([]);
  const [lavanderia, setLavanderia] = useState([]);
  const [contadorAlquiler, setContadorAlquiler] = useState(1);
  const [alquileresTerminados, setAlquileresTerminados] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const agregarEmpleado = (empleado) => {
  setEmpleados([...empleados, empleado]);
  };

  useEffect(() => {

  const data = localStorage.getItem("appData");

  if(data){

    const parsed = JSON.parse(data);

    setClientes(parsed.clientes || []);
    setPrendas(parsed.prendas || []);
    setAlquileres(parsed.alquileres || []);

  }

  }, []);

  useEffect(() => {

  localStorage.setItem(
    "appData",
    JSON.stringify({
      clientes,
      prendas,
      alquileres
    })
  );

  }, [clientes, prendas, alquileres]);



  const agregarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const agregarPrenda = (prenda) => {
    setPrendas([...prendas, prenda]);
  };

  const agregarAlquiler = (alquiler) => {

  const nuevo = {
    ...alquiler,
    numeroServicio: contadorAlquiler
  };

  setAlquileres([...alquileres, nuevo]);

  setContadorAlquiler(contadorAlquiler + 1);

  };

  

  const agregarLavanderia = (prenda, prioridad) => {

  const item = {
    prenda,
    prioridad
  };

  setLavanderia([...lavanderia, item]);

  };

  const enviarLavado = (cantidad) => {

  const prioridad = lavanderia.filter(p => p.prioridad);
  const normales = lavanderia.filter(p => !p.prioridad);

  const ordenadas = [...prioridad, ...normales];

  const enviadas = ordenadas.slice(0, cantidad);

  const restantes = ordenadas.slice(cantidad);

  setLavanderia(restantes);

  return enviadas;

  };

  const terminarAlquiler = (numeroServicio) => {

  const alquiler = alquileres.find(a => a.numeroServicio === numeroServicio);

  if (!alquiler) return;

  const terminado = {
    ...alquiler,
    fechaDevolucion: new Date().toISOString().split("T")[0]
  };

  setAlquileresTerminados(prev => [...prev, terminado]);

  setAlquileres(prev =>
    prev.filter(a => a.numeroServicio !== numeroServicio)
  );

  setPrendas(prev =>
    prev.map(p => {
      if (alquiler.prendas.includes(p.id)) {
        return { ...p, estado: "sucia" };
      }
      return p;
    })
  );

  

  };
  

  

  return (
    <AppContext.Provider
      value={{
        clientes,
        prendas,
        alquileres,
        lavanderia,
        agregarCliente,
        agregarPrenda,
        agregarAlquiler,
        alquileresTerminados,
        terminarAlquiler,
        agregarLavanderia,
        enviarLavado,
        setPrendas,
        setLavanderia,
        empleados,
        agregarEmpleado
      }}
    >
      {children}
    </AppContext.Provider>
  );


}

