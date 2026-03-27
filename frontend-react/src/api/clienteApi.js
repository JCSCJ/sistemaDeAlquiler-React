import { BASE_URL } from "./apiConfig";

const URL = `${BASE_URL}/clientes`;

export async function getClientes() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
}

export async function postCliente(cliente) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al guardar cliente");
  return res.json();
}
