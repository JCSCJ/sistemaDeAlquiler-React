import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function Lavanderia() {

  const { prendas, agregarLavanderia } = useContext(AppContext);

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [prioridad,     setPrioridad]     = useState(false);
  const [cargando,      setCargando]      = useState(false);
  const [error,         setError]         = useState("");
  const [exito,         setExito]         = useState(false);

  const prendasSucias = prendas.filter(p => p.estado === "sucia");

  const seleccionarPrenda = (id) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const enviar = async () => {
    setError("");
    setExito(false);

    if (seleccionadas.length === 0) {
      setError("Selecciona al menos una prenda");
      return;
    }

    try {
      setCargando(true);
      for (const prendaId of seleccionadas) {
        await agregarLavanderia(prendaId, prioridad);
      }
      setSeleccionadas([]);
      setPrioridad(false);
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al enviar a lavandería. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 500 }}>

      {error && <Alert severity="error">{error}</Alert>}
      {exito && <Alert severity="success">Prendas enviadas a lavandería</Alert>}

      <h2>Prendas sucias</h2>

      {prendasSucias.length === 0 && (
        <p>No hay prendas sucias en este momento.</p>
      )}

      <div>
        {prendasSucias.map((p) => (
          <FormControlLabel
            key={p.id}
            control={
              <Checkbox
                checked={seleccionadas.includes(p.id)}
                onChange={() => seleccionarPrenda(p.id)}
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
            onChange={(e) => setPrioridad(e.target.checked)}
          />
        }
        label="Prioridad"
      />

      <Button variant="contained" onClick={enviar} disabled={cargando}>
        {cargando ? <CircularProgress size={24} /> : "Enviar a lavandería"}
      </Button>

    </Stack>
  );
}