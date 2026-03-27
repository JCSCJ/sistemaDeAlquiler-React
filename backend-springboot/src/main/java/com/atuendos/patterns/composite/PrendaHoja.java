package com.atuendos.patterns.composite;

import com.atuendos.model.Prenda;

public class PrendaHoja implements ComponenteInventario {

    private final Prenda prenda;

    public PrendaHoja(Prenda prenda) {
        this.prenda = prenda;
    }

    @Override
    public String getNombre() {
        return prenda.getReferencia();
    }

    @Override
    public int getCantidad() {
        return 1;
    }

    @Override
    public String getDescripcion() {
        return String.format("%s - %s (Talla %s) [%s]",
            prenda.getReferencia(),
            prenda.getMarca(),
            prenda.getTalla(),
            prenda.getEstado());
    }
}
