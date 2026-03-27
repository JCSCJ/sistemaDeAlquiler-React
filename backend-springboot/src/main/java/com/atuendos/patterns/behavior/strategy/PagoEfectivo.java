package com.atuendos.patterns.behavior.strategy;

public class PagoEfectivo implements EstrategiaPago {

    @Override
    public String procesarPago(double monto) {
        return String.format("Pago en efectivo procesado: $%.2f", monto);
    }

    @Override
    public String getNombreMetodo() {
        return "efectivo";
    }
}
