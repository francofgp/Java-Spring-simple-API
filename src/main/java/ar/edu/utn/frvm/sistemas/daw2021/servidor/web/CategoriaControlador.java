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

    // GET devuelve 1 dominio
    // GET filtros
    // Get filstros y paginacion
    // POST crear
    @PostMapping()
    public Categoria guardar(@RequestBody Categoria d) {
        return servicio.guardar(d);
    }

    // PUT crear
    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria d) {
        System.out.println(("getID:" + (d.getId())));
        System.out.println(("ID:" + (id)));
        if (d.getId() != id) {
            throw new RuntimeException("El id no coincide");
        }
        return servicio.actualizar(d);
    }

    // DELETE eliminar
    @DeleteMapping("/{id}")
    public Categoria eliminar(@PathVariable Long id) {
        return servicio.eliminar(id);
    }

}
