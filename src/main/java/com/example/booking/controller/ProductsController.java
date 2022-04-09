package com.example.booking.controller;

import com.example.booking.dto.ProductDto;
import com.example.booking.model.Product;
import com.example.booking.repository.ProductRepository;
import com.example.booking.service.FilesStorageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/products") //tro den API
public class ProductsController {
    @Autowired
    ProductRepository productRepository; //autowired truc tiep ket noi voi productRepository
    @Autowired
    FilesStorageService storageService;
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        try{
            List<Product> products = new ArrayList<Product>();
            productRepository.findAll().forEach(products::add);
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProduct( @ModelAttribute ProductDto product){
        try {
            String fileName = storageService.save(product.getImage());
            Product newProduct = productRepository.save(new Product(product.getTitle(),product.getCategory(),product.getDescription(),product.getPrice(),fileName));
            return new ResponseEntity<>(newProduct,HttpStatus.CREATED); //HttpStatus.CREATED: tra ve httpstatus code 201:tao thanh cong
        }
        catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "/{id}", consumes = {MediaType.ALL_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Product> editProduct(@PathVariable Long id, @ModelAttribute ProductDto product){
        try {
            Optional<Product> currentProduct = productRepository.findById(id);

            if(currentProduct.isPresent()) {
                Product productEdit = currentProduct.get();
                productEdit.setTitle(product.getTitle());
                productEdit.setCategory(product.getCategory());
                productEdit.setDescription(product.getDescription());
                productEdit.setPrice(productEdit.getPrice());

                if(!product.getImage().isEmpty()){
                    String fileName = storageService.save(product.getImage());
                    productEdit.setImage(fileName);
                }

                productRepository.save(productEdit);
                return new ResponseEntity<>(productEdit,HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update")
    public String update(){
        return "update";
    }

    @GetMapping("/{id}")
    public Optional<Product> productDetail (@PathVariable Long id) {
        return productRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    public String destroy(@PathVariable Long id){
        productRepository.deleteById(id);
        return "ok";
    }
}
