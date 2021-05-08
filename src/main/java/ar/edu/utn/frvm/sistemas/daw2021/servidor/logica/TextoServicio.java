package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Texto;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.TextoRepositorio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.IdiomaRepositorio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.CategoriaRepositorio;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Date;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TextoServicio {
    @Autowired
    private TextoRepositorio repositorio;

    public Texto guardar(Texto d) {
        Date date = new Date();
        d.setFechaCreacion(date);
        d.setFechaModificacion(date);

        return repositorio.save(d);
    }

    public Iterable<Texto> listarTodos() {
        return repositorio.findAll();
    }

    public Optional<Texto> listarUno(Long id) {
        return repositorio.findById(id);
    }

    public Texto actualizar(Texto d) {

        Optional<Texto> instanciaBD = repositorio.findById(d.getId());

        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe");
        }

        d.setFechaCreacion(instanciaBD.get().getFechaCreacion());
        d.setFechaModificacion(instanciaBD.get().getFechaModificacion());

        if (d.getCategoria() == null) {
            // Long categoria = d.getCategoria();

            d.setCategoria(instanciaBD.get().getCategoria());

        }

        if (d.getNombre() == null) {
            // Long categoria = d.getCategoria();

            d.setNombre(instanciaBD.get().getNombre());

        }

        if (d.getIdioma() == null) {
            d.setIdioma(instanciaBD.get().getIdioma());

        }

        return repositorio.save(d);
    }

    public Texto eliminar(Long id) {
        Optional<Texto> instanciaBD = repositorio.findById(id);
        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe:" + id);
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }

}