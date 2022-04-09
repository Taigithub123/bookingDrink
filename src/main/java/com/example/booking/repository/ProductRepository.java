package com.example.booking.repository;

import com.example.booking.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// interface cho phep dinh nghia phuong thuc, khi nao extends thi viet code xu ly ben trong class da extends
public interface ProductRepository extends JpaRepository<Product,Long> {

}
