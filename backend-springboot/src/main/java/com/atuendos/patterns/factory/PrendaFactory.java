package com.atuendos.patterns.factory;

import com.atuendos.model.Prenda;

public class PrendaFactory {

    public static Prenda crear(String referencia, String marca, String talla) {
        if (referencia == null || referencia.isBlank()) {
            throw new IllegalArgumentException("La referencia no puede estar vacía");
        }
        if (talla == null || talla.isBlank()) {
            throw new IllegalArgumentException("La talla no puede estar vacía");
        }

        Prenda p = new Prenda();
        p.setReferencia(referencia.trim());
        p.setMarca(marca != null ? marca.trim() : "");
        p.setTalla(talla.trim());
        p.setEstado("disponible");
        return p;
    }
}
