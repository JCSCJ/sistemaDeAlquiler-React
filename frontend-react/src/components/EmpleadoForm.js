import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function EmpleadoForm() {

  const { agregarEmpleado } = useContext(AppContext);

  const [empleado, setEmpleado] = useState({ nombre: "", telefono: "", correo: "" });
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState("");
  const [exito,    setExito]    = useState(false);

  const guardar = async () => {
    setError("");
    setExito(false);

    if (!empleado.nombre || !empleado.telefono || !empleado.correo) {
      setError("Completa todos los campos");
      return;
    }

    try {
      setCargando(true);
      await agregarEmpleado(empleado);
      setEmpleado({ nombre: "", telefono: "", correo: "" });
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al registrar empleado. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>

      {error && <Alert severity="error">{error}</Alert>}
      {exito && <Alert severity="success">Empleado registrado correctamente</Alert>}

      <TextField
        label="Nombre"
        value={empleado.nombre}
        onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })}
      />
      <TextField
        label="Teléfono"
        value={empleado.telefono}
        onChange={(e) => setEmpleado({ ...empleado, telefono: e.target.value })}
      />
      <TextField
        label="Correo"
        value={empleado.correo}
        onChange={(e) => setEmpleado({ ...empleado, correo: e.target.value })}
      />

      <Button variant="contained" onClick={guardar} disabled={cargando}>
        {cargando ? <CircularProgress size={24} /> : "Registrar Empleado"}
      </Button>

    </Stack>
  );
}