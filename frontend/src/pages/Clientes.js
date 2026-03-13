import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import ClienteForm from "../components/ClienteForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

export default function Clientes(){

  const { clientes, alquileres, alquileresTerminados, prendas, empleados } = useContext(AppContext);

  const [busqueda,setBusqueda] = useState("");
  const [clienteConsulta,setClienteConsulta] = useState("");

  const clientesFiltrados = clientes.filter((c)=>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.telefono.includes(busqueda) ||
    c.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const alquileresActivos = alquileres.filter(
    a => a.clienteId === clienteConsulta
  );

  const alquileresFinalizados = alquileresTerminados.filter(
    a => a.clienteId === clienteConsulta
  );

  const obtenerPrendas = (ids) => {

    return ids
      .map(id => {
        const prenda = prendas.find(p => p.id === id);
        return prenda ? prenda.referencia : "Prenda eliminada";
      })
      .join(", ");

  };

  return(

    <div>

      <h1>Clientes</h1>

      <ClienteForm/>

      <TextField
        label="Buscar cliente"
        variant="outlined"
        fullWidth
        sx={{marginTop:3}}
        value={busqueda}
        onChange={(e)=>setBusqueda(e.target.value)}
      />

      <TableContainer component={Paper} sx={{marginTop:4}}>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {clientesFiltrados.map((c,index)=>(

              <TableRow key={index}>

                <TableCell>{c.id}</TableCell>
                <TableCell>{c.nombre}</TableCell>
                <TableCell>{c.telefono}</TableCell>
                <TableCell>{c.correo}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>


      <Stack spacing={2} sx={{marginTop:5, maxWidth:600}}>

        <h2>Historial de alquileres por cliente</h2>

        <TextField
          select
          label="Seleccione cliente"
          value={clienteConsulta}
          onChange={(e)=>setClienteConsulta(e.target.value)}
        >

          {clientes.map((c,index)=>(
            <MenuItem key={index} value={c.id}>
              {c.nombre}
            </MenuItem>
          ))}

        </TextField>


        {clienteConsulta !== "" && (

          <>
          
          <h3>Alquileres activos</h3>

          {alquileresActivos.length === 0 && (
            <p>No tiene alquileres activos.</p>
          )}

          {alquileresActivos.map((a,index)=>{

            const empleado = empleados.find(e => e.id === a.empleadoId);

            return(

            <Paper key={index} sx={{padding:2}}>

              <p><b>Servicio:</b> #{a.numeroServicio}</p>
              <p><b>Empleado:</b> {empleado ? empleado.nombre : "Empleado eliminado"}</p>
              <p><b>Fecha alquiler:</b> {a.fecha}</p>
              <p><b>Prendas:</b> {obtenerPrendas(a.prendas)}</p>

            </Paper>

            );

          })}


          <h3>Alquileres terminados</h3>

          {alquileresFinalizados.length === 0 && (
            <p>No tiene alquileres terminados.</p>
          )}

          {alquileresFinalizados.map((a,index)=>{
            const empleado = empleados.find(e => e.id === a.empleadoId);

            return(

            <Paper key={index} sx={{padding:2}}>

              <p><b>Servicio:</b> #{a.numeroServicio}</p>
              <p><b>Empleado:</b> {empleado ? empleado.nombre : "Empleado eliminado"}</p>
              <p><b>Fecha alquiler:</b> {a.fecha}</p>
              <p><b>Fecha devolución:</b> {a.fechaDevolucion}</p>
              <p><b>Prendas:</b> {obtenerPrendas(a.prendas)}</p>

            </Paper>

            );
          })}

          </>

        )}

      </Stack>

    </div>

  );

}