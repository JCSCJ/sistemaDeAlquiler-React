import React, { useContext, useState } from "react";
import AlquilerForm from "../components/AlquilerForm";
import { AppContext } from "../context/AppContext";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

export default function Alquiler(){

  const { 
    alquileres, 
    alquileresTerminados, 
    clientes, 
    prendas,
    terminarAlquiler,
    empleados
  } = useContext(AppContext);

  const [seleccionados,setSeleccionados] = useState([]);

  const seleccionar = (numeroServicio) => {

    if(seleccionados.includes(numeroServicio)){

      setSeleccionados(
        seleccionados.filter(n => n !== numeroServicio)
      );

    }else{

      setSeleccionados([...seleccionados,numeroServicio]);

    }

  };

  const devolverSeleccionados = () => {

    seleccionados.forEach(numero => {
      terminarAlquiler(numero);
    });

    setSeleccionados([]);

  };

  return(

    <div>

      <h1>Servicio de Alquiler</h1>

      <AlquilerForm/>

      <h2>Alquileres registrados</h2>

      <ul>

        {alquileres.map((a,index)=>{

        const cliente = clientes.find(c => c.id === a.clienteId);

        const empleado = empleados.find(e => e.id === a.empleadoId);

        const prendasAlquiler = a.prendas
          .map(id => prendas.find(p => p.id === id))
          .filter(Boolean);

          return(

            <li key={index}>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={seleccionados.includes(a.numeroServicio)}
                    onChange={()=>seleccionar(a.numeroServicio)}
                  />
                }
                label={`Servicio #${a.numeroServicio} | Cliente: ${
                  cliente ? cliente.nombre : "Cliente eliminado"
                } | Empleado: ${empleado ? empleado.nombre : "Empleado eliminado"} | Fecha: ${a.fecha} | Prendas: ${
                  prendasAlquiler
                    .map(p => `${p.referencia} (${p.marca} - Talla ${p.talla})`)
                    .join(", ")
                }`}
              />

            </li>

          );

        })}

      </ul>

      <Button
        variant="contained"
        sx={{marginTop:2}}
        onClick={devolverSeleccionados}
      >
        Marcar como devueltos
      </Button>

      <h2 style={{marginTop:40}}>Alquileres terminados</h2>

      <ul>

        {alquileresTerminados.map((a,index)=>{

          const cliente = clientes.find(c => c.id === a.clienteId);

          const empleado = empleados.find(e => e.id === a.empleadoId);

          const prendasAlquiler = a.prendas
            .map(id => prendas.find(p => p.id === id))
            .filter(Boolean);

          return(

            <li key={index}>

              Servicio #{a.numeroServicio} |
              Cliente: {cliente ? cliente.nombre : "Cliente eliminado"} |
              Empleado: {empleado ? empleado.nombre : "Empleado eliminado"} |
              Fecha alquiler: {a.fecha} |
              Fecha devolución: {a.fechaDevolucion} |
              Prendas: {
                prendasAlquiler
                  .map(p => `${p.referencia} (${p.marca} - Talla ${p.talla})`)
                  .join(", ")
              }

            </li>

          );

        })}

      </ul>

    </div>

  );

}