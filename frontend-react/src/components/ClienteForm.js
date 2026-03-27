import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function ClienteForm() {

  const { clientes, agregarCliente } = useContext(AppContext);

  const [cliente, setCliente] = useState({ nombre: "", telefono: "", correo: "" });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const guardar = async () => {
    setError("");
    setExito(false);

    if (!cliente.nombre || !cliente.telefono || !cliente.correo) {
      setError("Completa todos los campos");
      return;
    }

    const existe = clientes.some(c => c.correo === cliente.correo);
    if (existe) {
      setError("Ya existe un cliente con ese correo");
      return;
    }

    try {
      setCargando(true);
      await agregarCliente(cliente);
      setCliente({ nombre: "", telefono: "", correo: "" });
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al guardar cliente. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>

      {error  && <Alert severity="error">{error}</Alert>}
      {exito  && <Alert severity="success">Cliente guardado correctamente</Alert>}

      <TextField
        label="Nombre"
        value={cliente.nombre}
        onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
      />
      <TextField
        label="Teléfono"
        value={cliente.telefono}
        onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
      />
      <TextField
        label="Correo"
        value={cliente.correo}
        onChange={(e) => setCliente({ ...cliente, correo: e.target.value })}
      />

      <Button variant="contained" onClick={guardar} disabled={cargando}>
        {cargando ? <CircularProgress size={24} /> : "Guardar Cliente"}
      </Button>

    </Stack>
  );
}