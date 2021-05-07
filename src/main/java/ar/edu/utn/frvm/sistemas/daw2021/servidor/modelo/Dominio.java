package ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

//el data me da metodos como get, setter, tostring
@Data
@Entity
@NoArgsConstructor // contructor vacio
public class Dominio {
    // @RequiredArgsConstructor //constructor con cada cosa

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nombreDominio;
    private Boolean vencido;

    // @Temporal()//que cosa queremos que nos mepee, ahora le pusimos todo
    private Date fechaCreacion;// = new Date();
    /*
     * public Long getId() { return id; }
     * 
     * public void setId(Long id) { this.id = id; }
     * 
     * public String getNombreDominio() { return nombreDominio; }
     * 
     * public void setNombreDominio(String nombreDominio) { this.nombreDominio =
     * nombreDominio; }
     */

    @ManyToOne
    private TipoDominio tipoDominio;

    @ManyToMany
    private List<Usuario> adminisitradores;
}
