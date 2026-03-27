import React, { useContext, useState } from "react";
import AlquilerForm from "../components/AlquilerForm";
import { AppContext } from "../context/AppContext";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function Alquiler() {

  const {
    alquileres,
    alquileresTerminados,
    clientes,
    prendas,
    empleados,
    terminarAlquiler,
  } = useContext(AppContext);

  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando,      setCargando]      = useState(false);
  const [error,         setError]         = useState("");

  const seleccionar = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const devolverSeleccionados = async () => {
    setError("");
    try {
      setCargando(true);
      for (const id of seleccionados) {
        await terminarAlquiler(id);
      }
      setSeleccionados([]);
    } catch (e) {
      setError("Error al terminar alquiler. Verifica que el backend esté activo.");
    } finally {
      setCargando(false);
    }
  };

  const obtenerPrendasTexto = (prendasAlquiler) => {
    if (!prendasAlquiler || prendasAlquiler.length === 0) return "Sin prendas";
    return prendasAlquiler
      .map(p => `${p.referencia} (${p.marca} - Talla ${p.talla})`)
      .join(", ");
  };

  const obtenerNombreCliente  = (alquiler) =>
    alquiler.cliente  ? alquiler.cliente.nombre   : "Cliente eliminado";

  const obtenerNombreEmpleado = (alquiler) =>
    alquiler.empleado ? alquiler.empleado.nombre  : "Sin empleado";

  return (
    <div>
      <h1>Servicio de Alquiler</h1>

      <AlquilerForm />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <h2>Alquileres activos</h2>

      {alquileres.length === 0 && <p>No hay alquileres activos.</p>}

      <ul>
        {alquileres.map((a) => (
          <li key={a.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={seleccionados.includes(a.id)}
                  onChange={() => seleccionar(a.id)}
                />
              }
              label={`Servicio #${a.numeroServicio} | Cliente: ${obtenerNombreCliente(a)} | Empleado: ${obtenerNombreEmpleado(a)} | Fecha: ${a.fechaAlquiler} | Prendas: ${obtenerPrendasTexto(a.prendas)}`}
            />
          </li>
        ))}
      </ul>

      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={devolverSeleccionados}
        disabled={cargando || seleccionados.length === 0}
      >
        {cargando ? <CircularProgress size={24} /> : "Marcar como devueltos"}
      </Button>

      <h2 style={{ marginTop: 40 }}>Alquileres terminados</h2>

      {alquileresTerminados.length === 0 && <p>No hay alquileres terminados.</p>}

      <ul>
        {alquileresTerminados.map((a) => (
          <li key={a.id}>
            Servicio #{a.numeroServicio} |
            Cliente: {obtenerNombreCliente(a)} |
            Empleado: {obtenerNombreEmpleado(a)} |
            Fecha alquiler: {a.fechaAlquiler} |
            Fecha devolución: {a.fechaDevolucion} |
            Prendas: {obtenerPrendasTexto(a.prendas)}
          </li>
        ))}
      </ul>

    </div>
  );
}