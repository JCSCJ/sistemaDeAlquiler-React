package com.atuendos.patterns.behavior.strategy;

public class ContextoPago {

    public static String procesar(String metodoPago, double monto) {
        EstrategiaPago estrategia = seleccionar(metodoPago);
        return estrategia.procesarPago(monto);
    }

    public static EstrategiaPago seleccionar(String metodoPago) {
        if (metodoPago == null) return new PagoEfectivo();

        return switch (metodoPago.toLowerCase()) {
            case "tarjeta"       -> new PagoTarjeta();
            case "transferencia" -> new PagoTransferencia();
            default              -> new PagoEfectivo();
        };
    }
}
