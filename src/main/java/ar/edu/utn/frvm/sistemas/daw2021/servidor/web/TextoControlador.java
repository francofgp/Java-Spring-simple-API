package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

import java.util.Optional;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    // api generica//

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

    @DeleteMapping("/{id}")
    public Texto eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

    // Filtros

    @GetMapping(params = { "nombre" })
    public Iterable<Texto> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    @GetMapping(params = { "nombre", "categoria" })
    public Iterable<Texto> listarFiltradoPorNombreCategoriayFechaModificacion(@RequestParam String nombre,
            @RequestParam(value = "categoria") String c) {
        return servicio.findByNombreContainingIgnoreCaseAndCategoria_NombreContainingIgnoreCase(nombre, c);
    }

    @GetMapping(params = { "nombre", "categoria", "fecha_modificacion" })
    public Iterable<Texto> listarFiltradoPorNombreCategoriayFechaModificacion(@RequestParam String nombre,
            @RequestParam(value = "categoria") String c,
            @RequestParam("fecha_modificacion") String fecha_modificacion) {
        return servicio
                .findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
                        nombre, fecha_modificacion, c);
    }

    /*
     * @GetMapping(params = { "nombre", "categoria", "fecha_modificacion", "page" })
     * // <----ESE PAGE NO SIRVE PARA NADA // PERO SI LO SACO TIRA ERROR ASI QUE //
     * LO DEJE. public Iterable<Texto>
     * listarFiltradoPorNombreCategoriaFechaModificacion(@RequestParam String
     * nombre,
     * 
     * @RequestParam(value = "categoria") String c,
     * 
     * @RequestParam("fecha_modificacion") String fecha_modificacion) { return
     * servicio
     * .findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
     * nombre, fecha_modificacion, c); }
     */

    // Paginacion

    @GetMapping(params = { "nombre", "page" })
    public Page<Texto> findByNombrePaginado(@RequestParam String nombre, Pageable page) {
        return servicio.findByNombrePaginado(nombre, page);
    }

    // Sort

    @GetMapping(params = { "sort" })
    public Iterable<Texto> listarTodosPaginados(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }
}
