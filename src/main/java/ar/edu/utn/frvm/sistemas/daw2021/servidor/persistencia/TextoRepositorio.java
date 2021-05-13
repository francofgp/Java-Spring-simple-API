package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Texto;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface TextoRepositorio extends CrudRepository<Texto, Long> {

    Iterable<Texto> findByNombreContainingIgnoreCaseAndCategoria_NombreContainingIgnoreCase(String nombre,
            String categoria);

}
