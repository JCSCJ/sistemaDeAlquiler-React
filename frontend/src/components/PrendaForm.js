import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function PrendaForm(){

  const { prendas, agregarPrenda } = useContext(AppContext);

  const [prenda,setPrenda] = useState({
    referencia:"",
    marca:"",
    talla:""
  });

  const guardar = () => {

    if(!prenda.referencia || !prenda.marca || !prenda.talla){
      alert("Completa todos los campos");
      return;
    }

    const nuevaPrenda = {
      id: prendas.length + 1,
      ...prenda
    };

    agregarPrenda(nuevaPrenda);

    setPrenda({
      referencia:"",
      marca:"",
      talla:"",
      estado:"disponible"
    });

  };

  return(

    <Stack spacing={2} sx={{maxWidth:400}}>

      <TextField
        label="Referencia"
        value={prenda.referencia}
        onChange={(e)=>
          setPrenda({...prenda,referencia:e.target.value})
        }
      />

      <TextField
        label="Marca"
        value={prenda.marca}
        onChange={(e)=>
          setPrenda({...prenda,marca:e.target.value})
        }
      />

      <TextField
        label="Talla"
        value={prenda.talla}
        onChange={(e)=>
          setPrenda({...prenda,talla:e.target.value})
        }
      />

      <Button variant="contained" onClick={guardar}>
        Registrar prenda
      </Button>

    </Stack>

  );

}