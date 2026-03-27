package com.atuendos.patterns.behavior.command;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class GestorComandos {

    private final List<String> historial = new ArrayList<>();

    public void ejecutar(Comando comando) {
        comando.ejecutar();
        historial.add(comando.getDescripcion());
    }

    public List<String> getHistorial() {
        return Collections.unmodifiableList(historial);
    }

    public void limpiarHistorial() {
        historial.clear();
    }
}
