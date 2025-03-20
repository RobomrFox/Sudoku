package com.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan
@SpringBootApplication
public class GameApplication {
    /**
     * Main entry point of the Spring Boot application
     * @param args Command line arguments passed to the application
     */
    public static void main(String[] args) {
        // Bootstraps the Spring application context
        // Starts the embedded server (default: Tomcat)
        // Configures the application based on classpath dependencies
        SpringApplication.run(GameApplication.class, args);
    }
}