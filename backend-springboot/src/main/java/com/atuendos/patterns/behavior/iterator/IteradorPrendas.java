package com.atuendos.patterns.behavior.iterator;

import com.atuendos.model.Prenda;

import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Predicate;

public class IteradorPrendas implements Iterator<Prenda> {

    private final List<Prenda>      prendas;
    private final Predicate<Prenda> filtro;
    private int                     posicion = 0;
    private Prenda                  siguiente = null;

    public IteradorPrendas(List<Prenda> prendas) {
        this(prendas, p -> true);
    }

    public IteradorPrendas(List<Prenda> prendas, Predicate<Prenda> filtro) {
        this.prendas = prendas;
        this.filtro  = filtro;
        avanzar();
    }

    private void avanzar() {
        siguiente = null;
        while (posicion < prendas.size()) {
            Prenda candidata = prendas.get(posicion++);
            if (filtro.test(candidata)) {
                siguiente = candidata;
                break;
            }
        }
    }

    @Override
    public boolean hasNext() {
        return siguiente != null;
    }

    @Override
    public Prenda next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No hay más prendas en el iterador");
        }
        Prenda actual = siguiente;
        avanzar();
        return actual;
    }
}
