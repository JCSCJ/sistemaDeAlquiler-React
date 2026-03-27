package com.atuendos.patterns.behavior.strategy;

public class PagoTransferencia implements EstrategiaPago {

    @Override
    public String procesarPago(double monto) {
        return String.format("Transferencia bancaria registrada: $%.2f. Pendiente de verificación.", monto);
    }

    @Override
    public String getNombreMetodo() {
        return "transferencia";
    }
}
