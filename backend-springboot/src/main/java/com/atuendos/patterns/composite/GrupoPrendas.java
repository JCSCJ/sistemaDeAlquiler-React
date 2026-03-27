package com.atuendos.patterns.composite;

import java.util.ArrayList;
import java.util.List;

public class GrupoPrendas implements ComponenteInventario {

    private final String nombre;
    private final List<ComponenteInventario> hijos = new ArrayList<>();

    public GrupoPrendas(String nombre) {
        this.nombre = nombre;
    }

    public void agregar(ComponenteInventario componente) {
        hijos.add(componente);
    }

    public void quitar(ComponenteInventario componente) {
        hijos.remove(componente);
    }

    @Override
    public String getNombre() {
        return nombre;
    }

    @Override
    public int getCantidad() {
        return hijos.stream().mapToInt(ComponenteInventario::getCantidad).sum();
    }

    @Override
    public String getDescripcion() {
        StringBuilder sb = new StringBuilder();
        sb.append("[").append(nombre).append("] (").append(getCantidad()).append(" prendas):\n");
        hijos.forEach(h -> sb.append("  - ").append(h.getDescripcion()).append("\n"));
        return sb.toString();
    }
}
