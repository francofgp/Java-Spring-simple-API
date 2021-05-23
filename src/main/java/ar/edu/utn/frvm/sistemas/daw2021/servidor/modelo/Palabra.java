package ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;

import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Palabra {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String palabra;

    private Date fechaCreacion;
    private Date fechaUltimoRepaso;
    private Date fechaSiguienteRepaso;
    private String fechaModificacion;
    private String traduccion;

    private int cantidadDeRepasos;
    private int cantidadDeRepasosHastaProximoNivel;
    private int nivel;
    private Date fechaHastaDescenderNivel;

    @ManyToOne
    private Idioma idioma;

    @ManyToMany
    private List<Texto> texto;

}
