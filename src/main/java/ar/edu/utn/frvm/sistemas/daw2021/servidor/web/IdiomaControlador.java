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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.IdiomaServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Idioma;

@RestController
@RequestMapping("/idiomas") /* MAPEO de URL */
public class IdiomaControlador {
    @Autowired
    private IdiomaServicio servicio;

    @GetMapping
    public Iterable<Idioma> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Idioma> listarUno(@PathVariable(name = "identificador") Long id) {
        return servicio.listarUno(id);

    }

    // GET devuelve 1 dominio
    // GET filtros
    // Get filstros y paginacion
    // POST crear
    @PostMapping()
    public Idioma guardar(@RequestBody Idioma d) {
        return servicio.guardar(d);
    }

    // PUT crear
    @PutMapping("/{id}")
    public Idioma actualizar(@PathVariable Long id, @RequestBody Idioma d) {
        System.out.println(("getID:" + (d.getId())));
        System.out.println(("ID:" + (id)));
        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    // DELETE eliminar
    @DeleteMapping("/{id}")
    public Idioma eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

}
