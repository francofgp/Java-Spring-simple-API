package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.ServicioSaludo;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;

@RestController
@RequestMapping("/hola")
public class ControladorHelloWorld {

    /* esto auto instancia esto */
    @Autowired
    private ServicioSaludo servicio;

    @GetMapping
    public String saludar(int horario) {

        return servicio.saludar();
        /*
         * return "Нет бога, кроме Аллаха";
         */
    }

    @PostMapping
    public Dominio saludarPost() {
        return servicio.getDominio();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public String saludarPUT() {
        return servicio.saludar().toUpperCase();
    }

}
