import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ConsultaCliente(){

  const { clientes, alquileres } = useContext(AppContext);

  const [cliente, setCliente] = useState("");

  const alquileresCliente = alquileres.filter(
  a => a.clienteId === clienteConsulta
  );

  return(

    <div>

      <h2>Consultar alquileres por cliente</h2>

      <select
        value={cliente}
        onChange={(e)=>setCliente(e.target.value)}
      >

        <option value="">Seleccione cliente</option>

        {clientes.map((c,index)=>(
          <option key={index} value={c.nombre}>
            {c.nombre}
          </option>
        ))}

      </select>

      <ul>

        {alquileresCliente.map((a,index)=>(
          <li key={index}>
            Fecha alquiler: {a.fecha} |
            Prendas: {a.prendas.join(", ")}
          </li>
        ))}

      </ul>

    </div>

  );

}