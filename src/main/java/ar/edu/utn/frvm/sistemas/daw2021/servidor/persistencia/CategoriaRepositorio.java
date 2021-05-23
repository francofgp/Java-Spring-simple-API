package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Categoria;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface CategoriaRepositorio extends PagingAndSortingRepository<Categoria, Long> {
    Iterable<Categoria> findByNombreContainingIgnoreCase(String nombre);
    Page<Categoria> findByNombreContainingIgnoreCase(String nombre,Pageable page);
}
