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
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    @DeleteMapping("/{id}")
    public Palabra eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

    // Filtros

    @GetMapping(params = { "nivel" })
    public Iterable<Palabra> listarFiltradoPorNivel(@RequestParam int nivel) {
        return servicio.listarFiltradoPorNivel(nivel);
    }

    @GetMapping(params = { "palabra" })
    public Iterable<Palabra> listarFiltradoPorNombre(@RequestParam String palabra) {
        return servicio.listarFiltradoPorNombre(palabra);
    }

    @GetMapping(params = { "palabra", "fecha_modificacion" })
    public Iterable<Palabra> listarFiltradoPorNombreCategoriayFechaModificacion(@RequestParam String palabra,
            @RequestParam("fecha_modificacion") String fecha_modificacion) {
        return servicio.findByPalabraContainingIgnoreCaseAndFechaModificacionContaining(palabra, fecha_modificacion);
    }

    // Paginacion

    @GetMapping(params = { "palabra", "page" })
    public Page<Palabra> findByNombrePaginado(@RequestParam String palabra, Pageable page) {
        return servicio.findByNombrePaginado(palabra, page);
    }

    // Sort

    @GetMapping(params = { "sort" })
    public Iterable<Palabra> listarTodosPaginados(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

}
