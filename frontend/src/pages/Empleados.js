import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import EmpleadoForm from "../components/EmpleadoForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Empleados(){

  const { empleados } = useContext(AppContext);

  return(

    <div>

      <h1>Empleados</h1>

      <EmpleadoForm/>

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

            {empleados.map((e,index)=>(

              <TableRow key={index}>

                <TableCell>{e.id}</TableCell>
                <TableCell>{e.nombre}</TableCell>
                <TableCell>{e.telefono}</TableCell>
                <TableCell>{e.correo}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </div>

  );

}