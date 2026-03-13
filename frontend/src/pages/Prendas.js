import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PrendaForm from "../components/PrendaForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Prendas(){

  const { prendas, alquileres } = useContext(AppContext);

  const prendasOcupadas = alquileres.flatMap(a => a.prendas);

  return(

    <div>

      <h1>Prendas</h1>

      <PrendaForm/>

      <TableContainer component={Paper} sx={{marginTop:4}}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>ID</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Talla</TableCell>
              <TableCell>Estado</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {prendas.map((p,index)=>{

              const ocupada = prendasOcupadas.includes(p.id);

              let estado = "Disponible";

              if (ocupada) estado = "Ocupada";
              else if (p.estado === "sucia") estado = "Sucia";
              else if (p.estado === "lavanderia") estado = "Lavandería";
              else if (p.estado === "lavanderia(prioridad)") estado = "Lavandería (prioridad)";

              <TableCell>
                {estado}
              </TableCell>

              return(

                <TableRow key={p.id}>

                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.referencia}</TableCell>
                  <TableCell>{p.marca}</TableCell>
                  <TableCell>{p.talla}</TableCell>
                  <TableCell>{estado}</TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </TableContainer>

    </div>

  );

}