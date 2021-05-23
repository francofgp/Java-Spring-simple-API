package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;



import org.springframework.data.domain.Page;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Idioma;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

@Repository
public interface IdiomaRepositorio extends PagingAndSortingRepository<Idioma, Long> {

    public Iterable<Idioma> findByNombreContainingIgnoreCase(String nombre);

    public Page<Idioma> findByNombreContainingIgnoreCase(String nombre, Pageable page);

}
