import { BASE_URL } from "./apiConfig";

const URL = `${BASE_URL}/alquileres`;

export async function getAlquileres() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener alquileres");
  return res.json();
}

export async function getAlquileresActivos() {
  const res = await fetch(`${URL}/activos`);
  if (!res.ok) throw new Error("Error al obtener alquileres activos");
  return res.json();
}

export async function getAlquileresTerminados() {
  const res = await fetch(`${URL}/terminados`);
  if (!res.ok) throw new Error("Error al obtener alquileres terminados");
  return res.json();
}

export async function getAlquileresPorCliente(clienteId) {
  const res = await fetch(`${URL}/cliente/${clienteId}`);
  if (!res.ok) throw new Error("Error al obtener alquileres del cliente");
  return res.json();
}

export async function postAlquiler(alquiler) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alquiler),
  });
  if (!res.ok) throw new Error("Error al registrar alquiler");
  return res.json();
}

export async function terminarAlquiler(id) {
  const res = await fetch(`${URL}/${id}/terminar`, { method: "PUT" });
  if (!res.ok) throw new Error("Error al terminar alquiler");
  return res.json();
}
