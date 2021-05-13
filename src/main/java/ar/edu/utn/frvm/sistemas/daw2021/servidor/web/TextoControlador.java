package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.TextoServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Texto;

@RestController
@RequestMapping("/textos") /* MAPEO de URL */
public class TextoControlador {
    @Autowired
    private TextoServicio servicio;

    @GetMapping
    public Iterable<Texto> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Texto> listarUno(@PathVariable Long id) {
        return servicio.listarUno(id);

    }

    @GetMapping(params = { "nombre", "categoria" })
    public Iterable<Texto> listarFiltradoPorNombreYCategoria(@RequestParam String nombre,
            @RequestParam(value = "categoria") String c) {
        return servicio.findByNombreContainingIgnoreCaseAndCategoria_NombreContainingIgnoreCase(nombre, c);
    }

    @PostMapping()
    public Texto guardar(@RequestBody Texto d) {
        return servicio.guardar(d);
    }

    @PutMapping("/{id}")
    public Texto actualizar(@PathVariable Long id, @RequestBody Texto d) {

        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    // DELETE eliminar
    @DeleteMapping("/{id}")
    public Texto eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

}
