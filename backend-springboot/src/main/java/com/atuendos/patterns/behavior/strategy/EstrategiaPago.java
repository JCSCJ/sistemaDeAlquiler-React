package com.atuendos.patterns.behavior.strategy;

public interface EstrategiaPago {

    /**
     * @param monto
     * @return
     */
    String procesarPago(double monto);

    String getNombreMetodo();
}
