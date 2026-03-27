package com.atuendos.patterns.behavior.command;

import com.atuendos.model.Alquiler;
import com.atuendos.service.AlquilerService;

public class CrearAlquilerComando implements Comando {

    private final AlquilerService service;
    private final Alquiler        alquiler;
    private Alquiler              resultado;

    public CrearAlquilerComando(AlquilerService service, Alquiler alquiler) {
        this.service  = service;
        this.alquiler = alquiler;
    }

    @Override
    public void ejecutar() {
        resultado = service.guardarAlquiler(alquiler);
    }

    @Override
    public String getDescripcion() {
        return "Crear alquiler para cliente id=" +
               (alquiler.getCliente() != null ? alquiler.getCliente().getId() : "?");
    }

    public Alquiler getResultado() {
        return resultado;
    }
}
