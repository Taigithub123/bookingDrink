package com.example.booking.repository;

import com.example.booking.model.CheckoutProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutProductRepository extends JpaRepository<CheckoutProduct, Long> {
    List<CheckoutProduct> findAllByCheckout_id(Long checkoutId);
}
