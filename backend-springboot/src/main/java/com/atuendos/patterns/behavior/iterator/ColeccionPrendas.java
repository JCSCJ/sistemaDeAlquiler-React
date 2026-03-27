package com.atuendos.patterns.behavior.iterator;

import com.atuendos.model.Prenda;

import java.util.List;
import java.util.function.Predicate;

public class ColeccionPrendas {

    private final List<Prenda> prendas;

    public ColeccionPrendas(List<Prenda> prendas) {
        this.prendas = prendas;
    }

    public IteradorPrendas iterador() {
        return new IteradorPrendas(prendas);
    }

    public IteradorPrendas iteradorPorEstado(String estado) {
        return new IteradorPrendas(prendas,
            p -> estado.equalsIgnoreCase(p.getEstado()));
    }

    public IteradorPrendas iteradorPorTalla(String talla) {
        return new IteradorPrendas(prendas,
            p -> talla.equalsIgnoreCase(p.getTalla()));
    }

    public IteradorPrendas iteradorConFiltro(Predicate<Prenda> filtro) {
        return new IteradorPrendas(prendas, filtro);
    }
}
