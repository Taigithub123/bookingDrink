package com.example.booking.controller;

import com.example.booking.model.Category;
import com.example.booking.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")

public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;
    @GetMapping
    public List<Category> getAll (){
        return categoryRepository.findAll();
    }
    @PostMapping
    public Category createCategory (@RequestBody Category category) {
        return categoryRepository.save(category);
    }
    @DeleteMapping("/{id}")
    public void deleteCategory (@PathVariable Long id){
        categoryRepository.deleteById(id);
    }
    @PutMapping("/{id}")
    public Category updateCategory (@PathVariable Long id, @RequestBody Category category)
    {
        Category editCategory  = categoryRepository.findById(id).get();
        editCategory.setName(category.getName());
        return categoryRepository.save(editCategory);
    }
}
