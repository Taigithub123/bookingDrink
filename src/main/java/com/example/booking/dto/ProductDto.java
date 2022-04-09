package com.example.booking.dto;

import com.example.booking.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Optional;

@Data
public class ProductDto {
    private String title;
    private Category category;
    private String description;
    private float price;
    private MultipartFile image;
}
