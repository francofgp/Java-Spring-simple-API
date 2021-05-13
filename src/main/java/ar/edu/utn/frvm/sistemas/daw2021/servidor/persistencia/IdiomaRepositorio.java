package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Idioma;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface IdiomaRepositorio extends CrudRepository<Idioma, Long> {


    public Iterable<Idioma> findByNombreContainingIgnoreCase(String nombre);


    //@Query("")
    //public Idioma findByNombre(String nombreIdioma);
    
    
}
