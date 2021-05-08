package ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

//el data me da metodos como get, setter, tostring
@Data
@Entity
@NoArgsConstructor // contructor vacio
public class Texto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nombre;

    private Date fechaCreacion;
    private Date fechaModificacion;

    @ManyToOne
    private Categoria categoria;

    @ManyToOne
    private Idioma idioma;
}
