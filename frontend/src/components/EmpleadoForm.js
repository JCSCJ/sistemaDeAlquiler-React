import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function EmpleadoForm(){

  const { agregarEmpleado, empleados } = useContext(AppContext);

  const [empleado,setEmpleado] = useState({
    id:"",
    nombre:"",
    telefono:"",
    correo:""
  });

  const guardar = () => {

    const nuevo = {
      ...empleado,
      id: empleados.length + 1
    };

    agregarEmpleado(nuevo);

    setEmpleado({
      id:"",
      nombre:"",
      telefono:"",
      correo:""
    });

  };

  return(

    <Stack spacing={2} sx={{maxWidth:400}}>

      <TextField
        label="Nombre"
        value={empleado.nombre}
        onChange={(e)=>
          setEmpleado({...empleado,nombre:e.target.value})
        }
      />

      <TextField
        label="Teléfono"
        value={empleado.telefono}
        onChange={(e)=>
          setEmpleado({...empleado,telefono:e.target.value})
        }
      />

      <TextField
        label="Correo"
        value={empleado.correo}
        onChange={(e)=>
          setEmpleado({...empleado,correo:e.target.value})
        }
      />

      <Button variant="contained" onClick={guardar}>
        Registrar empleado
      </Button>

    </Stack>

  );

}