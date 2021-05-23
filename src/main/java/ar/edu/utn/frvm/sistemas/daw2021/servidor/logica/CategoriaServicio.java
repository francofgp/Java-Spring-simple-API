package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Categoria;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.CategoriaRepositorio;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class CategoriaServicio {
    @Autowired
    private CategoriaRepositorio repositorio;

    public Categoria guardar(Categoria d) {
        return repositorio.save(d);
    }

    public Iterable<Categoria> listarTodos() {
        return repositorio.findAll();
    }

    public Optional<Categoria> listarUno(Long id) {
        return repositorio.findById(id);
    }

    public Categoria actualizar(Categoria d) {

        Optional<Categoria> instanciaBD = repositorio.findById(d.getId());

        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe");
        }

        return repositorio.save(d);
    }

    public Categoria eliminar(Long id) {
        Optional<Categoria> instanciaBD = repositorio.findById(id);
        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe:" + id);
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }

    public Iterable<Categoria> listarFiltradoPorNombre(String nombre) {

        return repositorio.findByNombreContainingIgnoreCase(nombre);
    }

    public Iterable<Categoria> listarTodos(Pageable page) {
        return repositorio.findAll(page);
    }

    public Page<Categoria> findByNombrePaginado(String nombre, Pageable page) {
        return repositorio.findByNombreContainingIgnoreCase(nombre, page);
    }




}
