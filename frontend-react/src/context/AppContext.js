import React, { createContext, useState, useEffect } from "react";
import { getClientes, postCliente }           from "../api/clienteApi";
import { getEmpleados, postEmpleado }          from "../api/empleadoApi";
import { getPrendas, postPrenda }              from "../api/prendaApi";
import { getAlquileresActivos,
         getAlquileresTerminados,
         postAlquiler,
         terminarAlquiler as terminarApi }     from "../api/alquilerApi";
import { getLavanderia,
         postLavanderia,
         marcarComoLavada }                    from "../api/lavanderiaApi";

export const AppContext = createContext();

export function AppProvider({ children }) {

  const [clientes,             setClientes]             = useState([]);
  const [empleados,            setEmpleados]            = useState([]);
  const [prendas,              setPrendas]              = useState([]);
  const [alquileres,           setAlquileres]           = useState([]);
  const [alquileresTerminados, setAlquileresTerminados] = useState([]);
  const [lavanderia,           setLavanderia]           = useState([]);

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
    getEmpleados().then(setEmpleados).catch(console.error);
    getPrendas().then(setPrendas).catch(console.error);
    getAlquileresActivos().then(setAlquileres).catch(console.error);
    getAlquileresTerminados().then(setAlquileresTerminados).catch(console.error);
    getLavanderia().then(setLavanderia).catch(console.error);
  }, []);

  const agregarCliente = async (cliente) => {
    const nuevo = await postCliente(cliente);
    setClientes(prev => [...prev, nuevo]);
  };

  const agregarEmpleado = async (empleado) => {
    const nuevo = await postEmpleado(empleado);
    setEmpleados(prev => [...prev, nuevo]);
  };

  const agregarPrenda = async (prenda) => {
    const nueva = await postPrenda(prenda);
    setPrendas(prev => [...prev, nueva]);
  };

  const agregarAlquiler = async (alquilerData) => {
    const payload = {
      cliente:       { id: alquilerData.clienteId },
      empleado:      { id: alquilerData.empleadoId },
      prendas:       alquilerData.prendas.map(id => ({ id })),
      fechaAlquiler: alquilerData.fecha,
      metodoPago:    alquilerData.metodoPago || "efectivo",
      monto:         alquilerData.monto || 0,
    };

    const respuesta = await postAlquiler(payload);
    const nuevoAlquiler = respuesta.alquiler ?? respuesta;
    setAlquileres(prev => [...prev, nuevoAlquiler]);
    getPrendas().then(setPrendas).catch(console.error);
  };

  const terminarAlquiler = async (alquilerId) => {
    const terminado = await terminarApi(alquilerId);
    setAlquileres(prev => prev.filter(a => a.id !== alquilerId));
    setAlquileresTerminados(prev => [...prev, terminado]);
    getPrendas().then(setPrendas).catch(console.error);
  };

  const agregarLavanderia = async (prendaId, prioridad) => {
    const item = await postLavanderia({ prenda: { id: prendaId }, prioridad });
    setLavanderia(prev => [...prev, item]);
    getPrendas().then(setPrendas).catch(console.error);
  };

  const enviarLavada = async (itemId) => {
    await marcarComoLavada(itemId);
    setLavanderia(prev => prev.filter(l => l.id !== itemId));
    getPrendas().then(setPrendas).catch(console.error);
  };

  return (
    <AppContext.Provider
      value={{
        clientes,
        empleados,
        prendas,
        alquileres,
        alquileresTerminados,
        lavanderia,
        agregarCliente,
        agregarEmpleado,
        agregarPrenda,
        agregarAlquiler,
        terminarAlquiler,
        agregarLavanderia,
        enviarLavada,
        setPrendas,
        setLavanderia,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}