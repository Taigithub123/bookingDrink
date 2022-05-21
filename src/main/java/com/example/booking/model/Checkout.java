package com.example.booking.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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

//    @Column(name="province")
//    private String province;
//
//    @Column(name="district")
//    private String district;
//
//    @Column(name="commune")
//    private String commune;

    @Column(name="phone")
    private String phone;

    @Column(name = "total_price")
    private float totalPrice;
    @Column(name = "status")
    private String status;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
