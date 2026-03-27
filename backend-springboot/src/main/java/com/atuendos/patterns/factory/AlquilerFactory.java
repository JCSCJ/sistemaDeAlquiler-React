package com.atuendos.patterns.factory;

import com.atuendos.model.Alquiler;
import com.atuendos.model.Cliente;
import com.atuendos.model.Empleado;
import com.atuendos.model.Prenda;

import java.time.LocalDate;
import java.util.List;

public class AlquilerFactory {

    public static Alquiler crear(String tipo,
                                  Cliente cliente,
                                  Empleado empleado,
                                  List<Prenda> prendas,
                                  LocalDate fechaAlquiler,
                                  int numeroServicio) {
        return switch (tipo.toLowerCase()) {
            case "urgente"  -> crearUrgente(cliente, empleado, prendas, fechaAlquiler, numeroServicio);
            default         -> crearNormal(cliente, empleado, prendas, fechaAlquiler, numeroServicio);
        };
    }

    private static Alquiler crearNormal(Cliente cliente,
                                         Empleado empleado,
                                         List<Prenda> prendas,
                                         LocalDate fechaAlquiler,
                                         int numeroServicio) {
        Alquiler a = new Alquiler();
        a.setCliente(cliente);
        a.setEmpleado(empleado);
        a.setPrendas(prendas);
        a.setFechaAlquiler(fechaAlquiler);
        a.setFechaSolicitud(LocalDate.now());
        a.setNumeroServicio(numeroServicio);
        a.setEstado("activo");
        return a;
    }

    private static Alquiler crearUrgente(Cliente cliente,
                                          Empleado empleado,
                                          List<Prenda> prendas,
                                          LocalDate fechaAlquiler,
                                          int numeroServicio) {
        Alquiler a = crearNormal(cliente, empleado, prendas, fechaAlquiler, numeroServicio);
        a.setFechaAlquiler(LocalDate.now());
        return a;
    }
}
