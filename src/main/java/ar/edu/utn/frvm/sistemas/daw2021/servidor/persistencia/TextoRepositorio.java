package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Texto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;

@Repository
public interface TextoRepositorio extends PagingAndSortingRepository<Texto, Long> {
    // public interface TextoRepositorio extends CrudRepository<Texto, Long> {

    Iterable<Texto> findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
            String nombre, String fecha_modificacion, String categoria);

    /*
     * Iterable<Texto> findByNombreContainingIgnoreCase(String nombre, Pageable
     * pagina);
     */}
