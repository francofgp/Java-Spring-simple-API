package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Idioma;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.IdiomaRepositorio;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IdiomaServicio {
    @Autowired
    private IdiomaRepositorio repositorio;

    public Idioma guardar(Idioma d) {
        return repositorio.save(d);
    }

    public Iterable<Idioma> listarTodos() {
        return repositorio.findAll();
    }

    public Optional<Idioma> listarUno(Long id) {
        return repositorio.findById(id);
    }

    public Idioma actualizar(Idioma d) {

        Optional<Idioma> instanciaBD = repositorio.findById(d.getId());
        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe");
        }
        return repositorio.save(d);
    }

    public Idioma eliminar(Long id) {
        Optional<Idioma> instanciaBD = repositorio.findById(id);
        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe:" + id);
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }

    public Iterable<Idioma> listarFiltradoPorNombre(String nombre) {
        return repositorio.findByNombreContainingIgnoreCase(nombre);
    }

}
