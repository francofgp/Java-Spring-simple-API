package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;

@Service
public class ServicioSaludo {

    public String saludar() {
        int hora = 10;
        if (hora > 6 && hora < 14) {
            return "Buen dia";
        }
        return "Que ondara";
    }

    public Dominio getDominio() {
        return new Dominio();
    }

}
