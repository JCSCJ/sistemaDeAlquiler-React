import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function AlquilerForm() {

  const { clientes, empleados, prendas, alquileres, agregarAlquiler } = useContext(AppContext);

  const [clienteId,           setClienteId]           = useState("");
  const [empleadoId,          setEmpleadoId]          = useState("");
  const [fecha,               setFecha]               = useState("");
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState([]);
  const [cargando,            setCargando]            = useState(false);
  const [error,               setError]               = useState("");
  const [exito,               setExito]               = useState(false);

  const prendasOcupadas = alquileres.flatMap(a =>
    a.prendas ? a.prendas.map(p => p.id) : []
  );

  const seleccionarPrenda = (id) => {
    setPrendasSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const registrar = async () => {
    setError("");
    setExito(false);

    if (!clienteId || !fecha || prendasSeleccionadas.length === 0) {
      setError("Selecciona cliente, fecha y al menos una prenda");
      return;
    }

    try {
      setCargando(true);
      await agregarAlquiler({
        clienteId:  Number(clienteId),
        empleadoId: Number(empleadoId) || null,
        fecha,
        prendas: prendasSeleccionadas,
      });
      setClienteId("");
      setEmpleadoId("");
      setFecha("");
      setPrendasSeleccionadas([]);
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al registrar alquiler. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 500 }}>

      {error && <Alert severity="error">{error}</Alert>}
      {exito && <Alert severity="success">Alquiler registrado correctamente</Alert>}

      <TextField
        select
        label="Cliente"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      >
        {clientes.map((c) => (
          <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Empleado"
        value={empleadoId}
        onChange={(e) => setEmpleadoId(e.target.value)}
      >
        {empleados.map((e) => (
          <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
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
          const noDisponible = ocupada
            || p.estado === "sucia"
            || p.estado === "lavanderia"
            || p.estado === "lavanderia(prioridad)";

          return (
            <FormControlLabel
              key={p.id}
              control={
                <Checkbox
                  checked={prendasSeleccionadas.includes(p.id)}
                  onChange={() => seleccionarPrenda(p.id)}
                  disabled={noDisponible}
                />
              }
              label={`${p.referencia} - ${p.marca} - Talla ${p.talla} ${
                ocupada                              ? "(ocupada)"
                : p.estado === "sucia"               ? "(sucia)"
                : p.estado === "lavanderia"          ? "(en lavandería)"
                : p.estado === "lavanderia(prioridad)"? "(lavandería prioridad)"
                : ""
              }`}
            />
          );
        })}
      </div>

      <Button variant="contained" onClick={registrar} disabled={cargando}>
        {cargando ? <CircularProgress size={24} /> : "Registrar Alquiler"}
      </Button>

    </Stack>
  );
}