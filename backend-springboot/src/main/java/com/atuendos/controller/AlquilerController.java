package com.atuendos.controller;

import com.atuendos.model.Alquiler;
import com.atuendos.patterns.behavior.command.*;
import com.atuendos.patterns.behavior.strategy.ContextoPago;
import com.atuendos.repository.AlquilerRepository;
import com.atuendos.repository.PrendaRepository;
import com.atuendos.service.AlquilerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alquileres")
@CrossOrigin
public class AlquilerController {

    private final AlquilerService    service;
    private final GestorComandos     gestorComandos;   // Command
    private final AlquilerRepository alquilerRepo;
    private final PrendaRepository   prendaRepo;

    public AlquilerController(AlquilerService service,
                              GestorComandos gestorComandos,
                              AlquilerRepository alquilerRepo,
                              PrendaRepository prendaRepo) {
        this.service        = service;
        this.gestorComandos = gestorComandos;
        this.alquilerRepo   = alquilerRepo;
        this.prendaRepo     = prendaRepo;
    }

    @GetMapping
    public List<Alquiler> listar() {
        return service.listarAlquileres();
    }

    @GetMapping("/activos")
    public List<Alquiler> activos() {
        return service.listarActivos();
    }

    @GetMapping("/terminados")
    public List<Alquiler> terminados() {
        return service.listarTerminados();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Alquiler> porCliente(@PathVariable Long clienteId) {
        return service.listarPorCliente(clienteId);
    }

    /**
     * POST /alquileres
     * Usa: Command (CrearAlquilerComando) + Strategy (ContextoPago)
     *
     * Body esperado:
     * {
     *   "cliente":      { "id": 1 },
     *   "empleado":     { "id": 2 },
     *   "prendas":      [{ "id": 1 }, { "id": 2 }],
     *   "fechaAlquiler":"2024-03-15",
     *   "metodoPago":   "tarjeta",
     *   "monto":        150000
     * }
     */
    @PostMapping
    public Map<String, Object> guardar(@RequestBody Alquiler alquiler) {

        // Strategy: procesar el pago según el método recibido
        String confirmacionPago = ContextoPago.procesar(
            alquiler.getMetodoPago(),
            alquiler.getMonto() != null ? alquiler.getMonto() : 0.0
        );

        // Command: encapsular y ejecutar la creación del alquiler
        CrearAlquilerComando comando = new CrearAlquilerComando(service, alquiler);
        gestorComandos.ejecutar(comando);
        Alquiler creado = comando.getResultado();

        return Map.of(
            "alquiler",          creado,
            "confirmacionPago",  confirmacionPago
        );
    }

    /**
     * PUT /alquileres/{id}/terminar
     * Usa: Command (TerminarAlquilerComando)
     */
    @PutMapping("/{id}/terminar")
    public Alquiler terminar(@PathVariable Long id) {
        gestorComandos.ejecutar(new TerminarAlquilerComando(service, id));
        return service.listarAlquileres().stream()
            .filter(a -> a.getId().equals(id))
            .findFirst()
            .orElseThrow();
    }

    /**
     * PUT /alquileres/{id}/cancelar
     * Usa: Command (CancelarAlquilerComando)
     */
    @PutMapping("/{id}/cancelar")
    public void cancelar(@PathVariable Long id) {
        gestorComandos.ejecutar(
            new CancelarAlquilerComando(alquilerRepo, prendaRepo, id)
        );
    }

    /**
     * GET /alquileres/historial
     * Devuelve el historial de comandos ejecutados en esta sesión.
     */
    @GetMapping("/historial")
    public List<String> historial() {
        return gestorComandos.getHistorial();
    }
}
