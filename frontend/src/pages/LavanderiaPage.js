import React, { useContext, useState } from "react";
import Lavanderia from "../components/Lavanderia";
import { AppContext } from "../context/AppContext";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

export default function LavanderiaPage(){

  const { lavanderia, prendas, setPrendas, setLavanderia } = useContext(AppContext);

  const [seleccionadas,setSeleccionadas] = useState([]);

  const marcarLavada = (id,index) => {

    if(seleccionadas.includes(index)){

      setSeleccionadas(seleccionadas.filter(i => i !== index));

    }else{

      setSeleccionadas([...seleccionadas,index]);

    }

  };

  const devolverDisponibles = () => {

    const prendasActualizadas = prendas.map(p => {

      const enviada = lavanderia.find((l,i) =>
        seleccionadas.includes(i) && l.prendaId === p.id
      );

      if(enviada){
        return { ...p, estado:"disponible" };
      }

      return p;

    });

    const lavanderiaRestante = lavanderia.filter((l,i)=>
      !seleccionadas.includes(i)
    );

    setPrendas(prendasActualizadas);
    setLavanderia(lavanderiaRestante);
    setSeleccionadas([]);

  };

  return(

    <div>

      <h1>Lavandería</h1>

      <Lavanderia/>

      <h2 style={{marginTop:40}}>Prendas en lavandería</h2>

      <TableContainer component={Paper} sx={{marginTop:2}}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell></TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Talla</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Fecha salida</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {lavanderia.map((l,index)=>{

              const prenda = prendas.find(p => p.id === l.prendaId);

              if(!prenda) return null;

              return(

                <TableRow key={index}>

                  <TableCell>

                    <Checkbox
                      checked={seleccionadas.includes(index)}
                      onChange={()=>marcarLavada(prenda.id,index)}
                    />

                  </TableCell>

                  <TableCell>{prenda.referencia}</TableCell>
                  <TableCell>{prenda.marca}</TableCell>
                  <TableCell>{prenda.talla}</TableCell>
                  <TableCell>{l.prioridad ? "Sí" : "No"}</TableCell>
                  <TableCell>{l.fechaSalida}</TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </TableContainer>

      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={devolverDisponibles}
      >
        Marcar como lavadas
      </Button>

    </div>

  );

}