package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Palabra;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.PalabraRepositorio;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Date;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PalabraServicio {
    @Autowired
    private PalabraRepositorio repositorio;

    public Palabra guardar(Palabra d) {

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-M-dd");
        String strDate = dateFormat.format(date);

        // Date date = new Date();
        d.setFechaCreacion(date);

        d.setFechaModificacion(strDate);

        return repositorio.save(d);
    }

    public Iterable<Palabra> listarTodos() {
        return repositorio.findAll();
    }

    public Optional<Palabra> listarUno(Long id) {
        return repositorio.findById(id);
    }

    public Palabra actualizar(Palabra d) {

        Optional<Palabra> instanciaBD = repositorio.findById(d.getId());

        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe");
        }

        d.setFechaCreacion(instanciaBD.get().getFechaCreacion());

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-M-dd");
        String strDate = dateFormat.format(date);

        d.setFechaModificacion(strDate);
        if (d.getPalabra() == null) {
            d.setPalabra(instanciaBD.get().getPalabra());
        }
        ;

        if (d.getTraduccion() == null) {
            d.setTraduccion(instanciaBD.get().getTraduccion());
        }
        if (d.getCantidadDeRepasos() == 0) {
            d.setCantidadDeRepasos(instanciaBD.get().getCantidadDeRepasos());
        }
        if (d.getCantidadDeRepasosHastaProximoNivel() == 0) {
            d.setCantidadDeRepasosHastaProximoNivel(instanciaBD.get().getCantidadDeRepasosHastaProximoNivel());
        }
        if (d.getNivel() == 0) {
            d.setNivel(instanciaBD.get().getNivel());
        }
        if (d.getFechaUltimoRepaso() == null) {
            d.setFechaUltimoRepaso(instanciaBD.get().getFechaUltimoRepaso());
        }
        if (d.getFechaSiguienteRepaso() == null) {
            d.setFechaSiguienteRepaso(instanciaBD.get().getFechaSiguienteRepaso());
        }
        if (d.getFechaHastaDescenderNivel() == null) {
            d.setFechaHastaDescenderNivel(instanciaBD.get().getFechaHastaDescenderNivel());
        }
        if (d.getTexto() == null) {
            d.setTexto(instanciaBD.get().getTexto());
        }

        return repositorio.save(d);
    }

    public Palabra eliminar(Long id) {
        Optional<Palabra> instanciaBD = repositorio.findById(id);
        if (!instanciaBD.isPresent()) {
            throw new RuntimeException("El id no existe:" + id);
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }

    public Iterable<Palabra> listarFiltradoPorNombre(String palabra) {

        return repositorio.findByPalabraContainingIgnoreCase(palabra);
    }

    public Iterable<Palabra> listarTodos(Pageable page) {
        return repositorio.findAll(page);
    }

    public Page<Palabra> findByNombrePaginado(String palabra, Pageable page) {
        return repositorio.findByPalabraContainingIgnoreCase(palabra, page);
    }

    public Iterable<Palabra> findByPalabraContainingIgnoreCaseAndFechaModificacionContaining(String palabra,
            String fecha_modificacion) {
        return repositorio.findByPalabraContainingIgnoreCaseAndFechaModificacionContaining(palabra, fecha_modificacion);
    }

    public Iterable<Palabra> listarFiltradoPorNivel(int nivel) {

        return repositorio.findByNivel(nivel);
    }

}