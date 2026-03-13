import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Lavanderia(){

  const { prendas, setPrendas, lavanderia, setLavanderia } = useContext(AppContext);

  const [seleccionadas,setSeleccionadas] = useState([]);
  const [prioridad,setPrioridad] = useState(false);

  const prendasSucias = prendas.filter(p => p.estado === "sucia");

  const seleccionarPrenda = (id) => {

    if(seleccionadas.includes(id)){
      setSeleccionadas(seleccionadas.filter(p => p !== id));
    }else{
      setSeleccionadas([...seleccionadas,id]);
    }

  };

  const enviar = () => {

  if (seleccionadas.length === 0) {
    alert("Selecciona al menos una prenda");
    return;
  }

  const nuevasPrendas = prendas.map(p => {

    if (seleccionadas.includes(p.id)) {
      return {
        ...p,
        estado: prioridad ? "lavanderia(prioridad)" : "lavanderia"
      };
    }

    return p;

  });

  setPrendas(nuevasPrendas);

  const nuevasLavanderia = seleccionadas.map(id => ({
    prendaId: id,
    prioridad: prioridad,
    fechaSalida: new Date().toISOString().split("T")[0]
  }));

  setLavanderia(prev => [...prev, ...nuevasLavanderia]);

  setSeleccionadas([]);
  setPrioridad(false);

  };

  return(

    <Stack spacing={2} sx={{maxWidth:500}}>

      <h2>Prendas sucias</h2>

      <div>

        {prendasSucias.map((p)=>(

          <FormControlLabel
            key={p.id}
            control={
              <Checkbox
                checked={seleccionadas.includes(p.id)}
                onChange={()=>seleccionarPrenda(p.id)}
              />
            }
            label={`${p.referencia} - ${p.marca} - Talla ${p.talla}`}
          />

        ))}

      </div>

      <FormControlLabel
        control={
          <Checkbox
            checked={prioridad}
            onChange={(e)=>setPrioridad(e.target.checked)}
          />
        }
        label="Prioridad"
      />

      <Button variant="contained" onClick={enviar}>
        Enviar a lavandería
      </Button>

    </Stack>

  );

}