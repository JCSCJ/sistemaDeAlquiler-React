package com.atuendos.patterns.behavior.command;

import com.atuendos.model.Alquiler;
import com.atuendos.model.Prenda;
import com.atuendos.repository.AlquilerRepository;
import com.atuendos.repository.PrendaRepository;

public class CancelarAlquilerComando implements Comando {

    private final AlquilerRepository alquilerRepo;
    private final PrendaRepository   prendaRepo;
    private final Long               alquilerId;

    public CancelarAlquilerComando(AlquilerRepository alquilerRepo,
                                   PrendaRepository prendaRepo,
                                   Long alquilerId) {
        this.alquilerRepo = alquilerRepo;
        this.prendaRepo   = prendaRepo;
        this.alquilerId   = alquilerId;
    }

    @Override
    public void ejecutar() {
        Alquiler alquiler = alquilerRepo.findById(alquilerId)
            .orElseThrow(() -> new RuntimeException("Alquiler no encontrado: " + alquilerId));

        alquiler.setEstado("cancelado");

        for (Prenda prenda : alquiler.getPrendas()) {
            prenda.setEstado("disponible");
            prendaRepo.save(prenda);
        }

        alquilerRepo.save(alquiler);
    }

    @Override
    public String getDescripcion() {
        return "Cancelar alquiler id=" + alquilerId;
    }
}
