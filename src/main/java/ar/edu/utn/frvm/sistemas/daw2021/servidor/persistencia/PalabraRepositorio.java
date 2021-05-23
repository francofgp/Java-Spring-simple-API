package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Palabra;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

@Repository
public interface PalabraRepositorio extends PagingAndSortingRepository<Palabra, Long> {
    Iterable<Palabra> findByPalabraContainingIgnoreCase(String palabra);

    Page<Palabra> findByPalabraContainingIgnoreCase(String palabra, Pageable page);

    Iterable<Palabra> findByPalabraContainingIgnoreCaseAndFechaModificacionContaining(String palabra,
            String fecha_modificacion);

    Iterable<Palabra> findByNivel(int nivel);
}
