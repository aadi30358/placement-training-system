package com.example.pts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PtsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PtsBackendApplication.class, args);
    }

}
