package com.atuendos.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numeroServicio;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    @ManyToMany
    @JoinTable(
        name = "alquiler_prendas",
        joinColumns = @JoinColumn(name = "alquiler_id"),
        inverseJoinColumns = @JoinColumn(name = "prenda_id")
    )
    private List<Prenda> prendas;

    private LocalDate fechaAlquiler;
    private LocalDate fechaSolicitud;
    private LocalDate fechaDevolucion;

    // "activo" | "terminado" | "cancelado"
    private String estado = "activo";

    // ── Strategy: método y monto de pago ──────────────────────────────────
    // "efectivo" | "tarjeta" | "transferencia"
    private String metodoPago;

    private Double monto;
}
