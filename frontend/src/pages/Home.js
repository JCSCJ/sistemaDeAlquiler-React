import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home(){

  const { clientes, prendas, alquileres, lavanderia } = useContext(AppContext);

  return(

    <div style={{padding:"20px"}}>

      <Typography variant="h4" gutterBottom>
        Panel de Control
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Clientes
              </Typography>

              <Typography variant="h3">
                {clientes.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Prendas
              </Typography>

              <Typography variant="h3">
                {prendas.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Alquileres
              </Typography>

              <Typography variant="h3">
                {alquileres.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                En lavandería
              </Typography>

              <Typography variant="h3">
                {lavanderia.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </div>

  );

}