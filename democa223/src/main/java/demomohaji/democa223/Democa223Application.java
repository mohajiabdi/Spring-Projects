package demomohaji.democa223;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication    // annotation
//@Configuration
//@EnableAutoConfiguration
//@ComponentScans({})
public class Democa223Application {

	public static void main(String[] args) {
		SpringApplication.run(Democa223Application.class, args);
	}

}
