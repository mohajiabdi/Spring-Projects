package demomohaji.democa223;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RestController  // annotation
//@Controller
public class HelloController {
//   @GetMapping
    @GetMapping("/")// root url - localhost:8080
//    @ResponseBody
//    @RequestMapping(method = RequestMethod.GET, path = "/")
    public  String welcome(){
       return "Hello Assignment 2";
    }

    @GetMapping("/demo")  // root url - localhost:8080/demo
    public String show(){
        return "Spring boot";
    }

    @GetMapping("/api/v1")
    public String total(){
        return"API Version 1";
    }

    @GetMapping("/show-details")
    public String showDetails() {
        return "Contact.html"; // Name of your HTML file (contact.html)
    }
}
