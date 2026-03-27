import { BASE_URL } from "./apiConfig";

const URL = `${BASE_URL}/prendas`;

export async function getPrendas() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener prendas");
  return res.json();
}

export async function postPrenda(prenda) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prenda),
  });
  if (!res.ok) throw new Error("Error al guardar prenda");
  return res.json();
}

export async function patchEstadoPrenda(id, estado) {
  const res = await fetch(`${URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("Error al actualizar estado de prenda");
  return res.json();
}

export async function getPrendasPorTalla(talla) {
  const res = await fetch(`${URL}/talla/${encodeURIComponent(talla)}`);
  if (!res.ok) throw new Error("Error al filtrar prendas por talla");
  return res.json();
}
