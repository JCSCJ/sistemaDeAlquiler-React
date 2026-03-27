import { BASE_URL } from "./apiConfig";

const URL = `${BASE_URL}/lavanderia`;

export async function getLavanderia() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener lavandería");
  return res.json();
}

export async function postLavanderia(item) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Error al enviar prenda a lavandería");
  return res.json();
}

export async function marcarComoLavada(id) {
  const res = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al marcar prenda como lavada");
}
