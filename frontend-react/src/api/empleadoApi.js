import { BASE_URL } from "./apiConfig";

const URL = `${BASE_URL}/empleados`;

export async function getEmpleados() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener empleados");
  return res.json();
}

export async function postEmpleado(empleado) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(empleado),
  });
  if (!res.ok) throw new Error("Error al guardar empleado");
  return res.json();
}
