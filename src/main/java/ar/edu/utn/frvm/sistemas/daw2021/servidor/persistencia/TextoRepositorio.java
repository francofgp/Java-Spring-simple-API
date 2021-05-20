package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Texto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.List;

@Repository
public interface TextoRepositorio extends PagingAndSortingRepository<Texto, Long> {

        Iterable<Texto> findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
                        String nombre, String fecha_modificacion, String categoria);

        Iterable<Texto> findByNombreContainingIgnoreCase(String nombre);

        Page<Texto> findByNombreContainingIgnoreCase(String nombre, Pageable page);

}
