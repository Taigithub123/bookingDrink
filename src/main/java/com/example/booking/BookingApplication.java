package com.example.booking;

import com.example.booking.service.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class BookingApplication {

	@Resource
	FilesStorageService storageService;
	public static void main(String[] args) {
		SpringApplication.run(BookingApplication.class, args);
	}

}
