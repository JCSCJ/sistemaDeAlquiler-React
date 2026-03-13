import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ConsultaTalla(){

  const { prendas } = useContext(AppContext);

  const [talla, setTalla] = useState("");

  const filtradas = prendas.filter(
    p => p.talla === talla
  );

  return(

    <div>

      <h2>Consultar prendas por talla</h2>

      <input
        placeholder="Ingrese talla"
        value={talla}
        onChange={(e)=>setTalla(e.target.value)}
      />

      <ul>

        {filtradas.map((p,index)=>(
          <li key={index}>
            {p.referencia} - {p.marca} - talla {p.talla}
          </li>
        ))}

      </ul>

    </div>

  );

}