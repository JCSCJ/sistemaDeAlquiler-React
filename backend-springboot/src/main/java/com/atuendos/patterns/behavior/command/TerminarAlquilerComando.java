package com.atuendos.patterns.behavior.command;

import com.atuendos.model.Alquiler;
import com.atuendos.service.AlquilerService;

public class TerminarAlquilerComando implements Comando {

    private final AlquilerService service;
    private final Long            alquilerId;

    public TerminarAlquilerComando(AlquilerService service, Long alquilerId) {
        this.service    = service;
        this.alquilerId = alquilerId;
    }

    @Override
    public void ejecutar() {
        service.terminarAlquiler(alquilerId);
    }

    @Override
    public String getDescripcion() {
        return "Terminar alquiler id=" + alquilerId;
    }
}
