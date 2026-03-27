import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Navbar(){

  return(

    <AppBar position="static">

      <Toolbar>

        <Typography variant="h6" sx={{flexGrow:1}}>
          Los Atuendos
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>

        <Button color="inherit" component={Link} to="/clientes">
          Clientes
        </Button>

        <Button color="inherit" component={Link} to="/empleados">
          Empleados
        </Button>

        <Button color="inherit" component={Link} to="/prendas">
          Prendas
        </Button>

        <Button color="inherit" component={Link} to="/alquiler">
          Alquiler
        </Button>

        <Button color="inherit" component={Link} to="/lavanderia">
          Lavandería
        </Button>

      </Toolbar>

    </AppBar>

  );

}