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

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Service
public class TextoServicio {
    @Autowired
    private TextoRepositorio repositorio;

    public Texto guardar(Texto d) {

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-M-dd");
        String strDate = dateFormat.format(date);
        // System.out.println("Converted String: " + strDate);

        // Date date = new Date();
        d.setFechaCreacion(date);
        d.setFechaModificacion(strDate);

        return repositorio.save(d);
    }

    public Iterable<Texto> listarTodos() {

        // Pageable
        // Sort
        // return repositorio.findAll(PageRequest.of(0, 5, Sort.by(Direction.DESC,
        // "nombre")));
        // return repositorio.findAll();
        return repositorio.findAll();
    }

    public Iterable<Texto> listarTodosPaginado() {

        // Pageable
        // Sort
        // return repositorio.findAll(PageRequest.of(0, 5, Sort.by(Direction.DESC,
        // "nombre")));
        // return repositorio.findAll();
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

        if (d.getFechaModificacion() == null) {
            d.setFechaModificacion(instanciaBD.get().getFechaModificacion());
        }
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

    public Iterable<Texto> findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
            String nombre, String fecha_modificacion, String c) {
        return repositorio
                .findByNombreContainingIgnoreCaseAndFechaModificacionContainingAndCategoria_NombreContainingIgnoreCase(
                        nombre, fecha_modificacion, c);
    }

    public Iterable<Texto> listarFiltradoPorNombre(String nombre) {

        return repositorio.findByNombreContainingIgnoreCase(nombre);
    }

    public Page<Texto> findByNombrePaginado(String nombre, Pageable page) {
        return repositorio.findByNombreContainingIgnoreCase(nombre, page);
    }

    public Iterable<Texto> listarTodos(Pageable page) {
        return repositorio.findAll(page);
    }

}
