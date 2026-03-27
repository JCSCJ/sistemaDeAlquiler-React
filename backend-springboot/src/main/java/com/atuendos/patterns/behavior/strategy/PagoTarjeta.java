package com.atuendos.patterns.behavior.strategy;

public class PagoTarjeta implements EstrategiaPago {

    @Override
    public String procesarPago(double monto) {
        return String.format("Pago con tarjeta procesado: $%.2f. Esperando confirmación bancaria.", monto);
    }

    @Override
    public String getNombreMetodo() {
        return "tarjeta";
    }
}
