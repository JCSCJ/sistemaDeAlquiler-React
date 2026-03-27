import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function PrendaForm() {

  const { agregarPrenda } = useContext(AppContext);

  const [prenda,   setPrenda]   = useState({ referencia: "", marca: "", talla: "" });
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState("");
  const [exito,    setExito]    = useState(false);

  const guardar = async () => {
    setError("");
    setExito(false);

    if (!prenda.referencia || !prenda.marca || !prenda.talla) {
      setError("Completa todos los campos");
      return;
    }

    try {
      setCargando(true);
      await agregarPrenda(prenda);
      setPrenda({ referencia: "", marca: "", talla: "" });
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al registrar prenda. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>

      {error && <Alert severity="error">{error}</Alert>}
      {exito && <Alert severity="success">Prenda registrada correctamente</Alert>}

      <TextField
        label="Referencia"
        value={prenda.referencia}
        onChange={(e) => setPrenda({ ...prenda, referencia: e.target.value })}
      />
      <TextField
        label="Marca"
        value={prenda.marca}
        onChange={(e) => setPrenda({ ...prenda, marca: e.target.value })}
      />
      <TextField
        label="Talla"
        value={prenda.talla}
        onChange={(e) => setPrenda({ ...prenda, talla: e.target.value })}
      />

      <Button variant="contained" onClick={guardar} disabled={cargando}>
        {cargando ? <CircularProgress size={24} /> : "Registrar Prenda"}
      </Button>

    </Stack>
  );
}