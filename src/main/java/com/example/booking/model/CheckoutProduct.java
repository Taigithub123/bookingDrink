package com.example.booking.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@RequiredArgsConstructor
@Data
@Entity
@Table(name = "checkout_products")
public class CheckoutProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Checkout checkout;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Product product;

    @Column(name = "quantity")
    private int quantity;
}
