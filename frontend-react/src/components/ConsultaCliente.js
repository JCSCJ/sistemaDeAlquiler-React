import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ConsultaCliente() {

  const { clientes, alquileres } = useContext(AppContext);

  const [clienteConsulta, setClienteConsulta] = useState("");

  const alquileresCliente = alquileres.filter(
    a => a.cliente && String(a.cliente.id) === String(clienteConsulta)
  );

  return (
    <div>
      <h2>Consultar alquileres por cliente</h2>

      <select
        value={clienteConsulta}
        onChange={(e) => setClienteConsulta(e.target.value)}
      >
        <option value="">Seleccione cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {clienteConsulta && alquileresCliente.length === 0 && (
        <p>Este cliente no tiene alquileres registrados.</p>
      )}

      <ul>
        {alquileresCliente.map((a) => (
          <li key={a.id}>
            Fecha alquiler: {a.fechaAlquiler} |
            Prendas: {
              a.prendas && a.prendas.length > 0
                ? a.prendas.map(p => p.referencia).join(", ")
                : "Sin prendas"
            }
          </li>
        ))}
      </ul>
    </div>
  );
}