package com.atuendos.patterns.behavior.observer;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GestorEventosPrenda {

    private final List<ObservadorPrenda> observadores = new ArrayList<>();

    public void registrar(ObservadorPrenda observador) {
        observadores.add(observador);
    }

    public void eliminar(ObservadorPrenda observador) {
        observadores.remove(observador);
    }

    public void notificar(Long prendaId, String nuevoEstado) {
        for (ObservadorPrenda obs : observadores) {
            obs.actualizar(prendaId, nuevoEstado);
        }
    }
}
