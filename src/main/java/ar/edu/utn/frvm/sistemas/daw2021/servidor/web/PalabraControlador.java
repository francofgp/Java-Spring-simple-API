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
import org.springframework.web.bind.annotation.RestController;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.PalabraServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Palabra;

@RestController
@RequestMapping("/palabras") /* MAPEO de URL */
public class PalabraControlador {
    @Autowired
    private PalabraServicio servicio;

    @GetMapping
    public Iterable<Palabra> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Palabra> listarUno(@PathVariable Long id) {
        return servicio.listarUno(id);

    }

    @PostMapping()
    public Palabra guardar(@RequestBody Palabra d) {
        return servicio.guardar(d);
    }

    @PutMapping("/{id}")
    public Palabra actualizar(@PathVariable Long id, @RequestBody Palabra d) {

        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    // DELETE eliminar
    @DeleteMapping("/{id}")
    public Palabra eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

}
