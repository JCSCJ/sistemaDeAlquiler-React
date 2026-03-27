import React, { useContext, useState } from "react";
import Lavanderia from "../components/Lavanderia";
import { AppContext } from "../context/AppContext";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function LavanderiaPage() {

  const { lavanderia, enviarLavada } = useContext(AppContext);

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [cargando,      setCargando]      = useState(false);
  const [error,         setError]         = useState("");
  const [exito,         setExito]         = useState(false);

  const marcarLavada = (itemId) => {
    setSeleccionadas(prev =>
      prev.includes(itemId) ? prev.filter(i => i !== itemId) : [...prev, itemId]
    );
  };

  const devolverDisponibles = async () => {
    setError("");
    setExito(false);

    if (seleccionadas.length === 0) {
      setError("Selecciona al menos una prenda");
      return;
    }

    try {
      setCargando(true);
      for (const itemId of seleccionadas) {
        await enviarLavada(itemId);
      }
      setSeleccionadas([]);
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (e) {
      setError("Error al marcar como lavadas. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <h1>Lavandería</h1>

      <Lavanderia />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {exito && <Alert severity="success" sx={{ mt: 2 }}>Prendas marcadas como disponibles</Alert>}

      <h2 style={{ marginTop: 40 }}>Prendas en lavandería</h2>

      {lavanderia.length === 0 && <p>No hay prendas en lavandería.</p>}

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Talla</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Fecha salida</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lavanderia.map((l) => {
              const prenda = l.prenda;
              if (!prenda) return null;

              return (
                <TableRow key={l.id}>
                  <TableCell>
                    <Checkbox
                      checked={seleccionadas.includes(l.id)}
                      onChange={() => marcarLavada(l.id)}
                    />
                  </TableCell>
                  <TableCell>{prenda.referencia}</TableCell>
                  <TableCell>{prenda.marca}</TableCell>
                  <TableCell>{prenda.talla}</TableCell>
                  <TableCell>{l.prioridad ? "Sí" : "No"}</TableCell>
                  <TableCell>{l.fechaSalida}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={devolverDisponibles}
        disabled={cargando || seleccionadas.length === 0}
      >
        {cargando ? <CircularProgress size={24} /> : "Marcar como lavadas"}
      </Button>

    </div>
  );
}