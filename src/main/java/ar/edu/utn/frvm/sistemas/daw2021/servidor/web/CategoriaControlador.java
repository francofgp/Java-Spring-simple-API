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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.CategoriaServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Categoria;

@RestController
@RequestMapping("/categorias") /* MAPEO de URL */
public class CategoriaControlador {
    @Autowired
    private CategoriaServicio servicio;

    @GetMapping
    public Iterable<Categoria> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Categoria> listarUno(@PathVariable Long id) {
        return servicio.listarUno(id);

    }

    @PostMapping()
    public Categoria guardar(@RequestBody Categoria d) {
        return servicio.guardar(d);
    }

    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria d) {
        System.out.println(("getID:" + (d.getId())));
        System.out.println(("ID:" + (id)));
        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    @DeleteMapping("/{id}")
    public Categoria eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

    // Filtros

    @GetMapping(params = { "nombre" })
    public Iterable<Categoria> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    // Paginacion

    @GetMapping(params = { "nombre", "page" })
    public Page<Categoria> findByNombrePaginado(@RequestParam String nombre, Pageable page) {
        return servicio.findByNombrePaginado(nombre, page);
    }

    // sort
    @GetMapping(params = { "sort" })
    public Iterable<Categoria> listarTodosPaginados(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

}
