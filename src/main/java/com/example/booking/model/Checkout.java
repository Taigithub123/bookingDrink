package com.example.booking.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@RequiredArgsConstructor
@Data
@Table(name = "checkout")
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "checkout_id")
    private String checkoutId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private User user;

    @Column(name = "address", columnDefinition="TEXT")
    private String address;

    @Column(name="province")
    private String province;

    @Column(name="district")
    private String district;

    @Column(name="commune")
    private String commune;

    @Column(name="phone")
    private String phone;

    @Column(name = "total_price")
    private float totalPrice;
}
