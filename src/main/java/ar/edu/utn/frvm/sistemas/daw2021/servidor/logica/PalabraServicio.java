package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Palabra;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.PalabraRepositorio;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Date;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PalabraServicio {
    @Autowired
    private PalabraRepositorio repositorio;

    public Palabra guardar(Palabra d) {
        Date date = new Date();
        d.setFechaCreacion(date);
        d.setFechaModificacion(date);

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
        d.setFechaModificacion(instanciaBD.get().getFechaModificacion());
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

}