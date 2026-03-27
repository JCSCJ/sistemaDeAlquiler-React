package com.atuendos.patterns.singleton;

import org.springframework.stereotype.Component;

@Component
public class ContadorAlquilerSingleton {

    private int contador = 1;

    private ContadorAlquilerSingleton() {}

    public synchronized int siguiente() {
        return contador++;
    }

    public int actual() {
        return contador;
    }
}
