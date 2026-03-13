import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AlquilerForm() {

  const { clientes, empleados, prendas, alquileres, agregarAlquiler } = useContext(AppContext);
  const [empleadoId,setEmpleadoId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState([]);

  const prendasOcupadas = alquileres.flatMap(a => a.prendas);

  const seleccionarPrenda = (id) => {

    if (prendasSeleccionadas.includes(id)) {

      setPrendasSeleccionadas(
        prendasSeleccionadas.filter(p => p !== id)
      );

    } else {

      setPrendasSeleccionadas([...prendasSeleccionadas, id]);

    }

  };

  const registrar = () => {

    if (!clienteId || !fecha || prendasSeleccionadas.length === 0) {
      alert("Debes seleccionar cliente, fecha y al menos una prenda");
      return;
    }

    const nuevo = {

      clienteId,
      empleadoId,
      fecha,
      prendas: prendasSeleccionadas,
      fechaSolicitud: new Date().toLocaleDateString()

    };

    const existe = alquileres.some(a => 
      a.clienteId === nuevo.clienteId &&
      a.fecha === nuevo.fecha &&
      a.prendas.length === nuevo.prendas.length &&
      a.prendas.every(p => nuevo.prendas.includes(p))
    );

    if (existe) {
      alert("Este alquiler ya está registrado para este cliente con las mismas prendas y fecha");
      return;
    }

    agregarAlquiler(nuevo);

    setClienteId("");
    setFecha("");
    setPrendasSeleccionadas([]);

  };

  return (

    <Stack spacing={2} sx={{ maxWidth: 500 }}>

      <TextField
        select
        label="Cliente"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      >

        {clientes.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.nombre}
          </MenuItem>
        ))}

      </TextField>

      <TextField
        select
        label="Empleado"
        value={empleadoId}
        onChange={(e)=>setEmpleadoId(e.target.value)}
      >

        {empleados.map((e)=>(
          <MenuItem key={e.id} value={e.id}>
            {e.nombre}
          </MenuItem>
        ))}

      </TextField>

      <TextField
        type="date"
        label="Fecha de alquiler"
        InputLabelProps={{ shrink: true }}
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <div>

        {prendas.map((p) => {

          const ocupada = prendasOcupadas.includes(p.id);
          const sucia = p.estado === "sucia";

          return(

            <FormControlLabel
              key={p.id}
              control={
                <Checkbox
                  onChange={() => seleccionarPrenda(p.id)}
                  disabled={prendasOcupadas.includes(p.id) ||
                  p.estado === "sucia" ||
                  p.estado === "lavanderia" ||
                  p.estado === "lavanderia(prioridad)"}
                  checked={prendasSeleccionadas.includes(p.id)}
                />
              }
              label={`${p.referencia} - ${p.marca} - Talla ${p.talla} ${
                prendasOcupadas.includes(p.id)
                ? "(ocupada)"
                : p.estado === "sucia"
                ? "(sucia)"
                : p.estado === "lavanderia"
                ? "(en lavandería)"
                : p.estado === "lavanderia(prioridad)"
                ? "(lavandería prioridad)"
                : ""
              }`}
            />

          );

        })}

      </div>

      <Button variant="contained" onClick={registrar}>
        Registrar alquiler
      </Button>

    </Stack>

  );

}