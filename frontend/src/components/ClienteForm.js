import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ClienteForm(){

  const { clientes, agregarCliente } = useContext(AppContext);

  const [cliente,setCliente] = useState({
    nombre:"",
    telefono:"",
    correo:""
  });

  const guardar = () => {

    if(!cliente.nombre || !cliente.telefono || !cliente.correo){
      alert("Completa todos los campos");
      return;
    }

    const existe = clientes.some(
      c => c.correo === cliente.correo
    );

    if(existe){
      alert("Este cliente ya existe");
      return;
    }

    const nuevoCliente = {
      id: clientes.length + 1,
      ...cliente
    };

    agregarCliente(nuevoCliente);

    setCliente({
      nombre:"",
      telefono:"",
      correo:""
    });

  };

  return(

    <Stack spacing={2} sx={{maxWidth:400}}>

      <TextField
        label="Nombre"
        value={cliente.nombre}
        onChange={(e)=>
          setCliente({...cliente,nombre:e.target.value})
        }
      />

      <TextField
        label="Teléfono"
        value={cliente.telefono}
        onChange={(e)=>
          setCliente({...cliente,telefono:e.target.value})
        }
      />

      <TextField
        label="Correo"
        value={cliente.correo}
        onChange={(e)=>
          setCliente({...cliente,correo:e.target.value})
        }
      />

      <Button
        variant="contained"
        onClick={guardar}
      >
        Guardar Cliente
      </Button>

    </Stack>

  );

}