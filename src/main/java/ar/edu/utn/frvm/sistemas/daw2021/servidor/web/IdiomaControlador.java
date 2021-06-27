package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.IdiomaServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Idioma;

@CrossOrigin
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
    public Optional<Idioma> listarUno(@PathVariable Long id) {
        return servicio.listarUno(id);

    }

    @PostMapping()
    public Idioma guardar(@RequestBody Idioma d) {
        return servicio.guardar(d);
    }

    @PutMapping("/{id}")
    public Idioma actualizar(@PathVariable Long id, @RequestBody Idioma d) {
        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    @DeleteMapping("/{id}")
    public Idioma eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

    // filtros

    @GetMapping(params = { "nombre" })
    public Iterable<Idioma> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    // Paginacion

    @GetMapping(params = { "nombre", "page" })
    public Page<Idioma> findByNombrePaginado(@RequestParam String nombre, Pageable page) {
        return servicio.findByNombrePaginado(nombre, page);
    }

    // sort

    @GetMapping(params = { "sort" })
    public Iterable<Idioma> listarTodosPaginados(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

}
