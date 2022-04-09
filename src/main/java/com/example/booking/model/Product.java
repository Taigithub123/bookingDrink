package com.example.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity //dinh nghia kieu model
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //cho id tu dong tang
    private long id;
    @Column(name = "title")
    private String title;
    @ManyToOne
    private Category category;
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Column(name = "price")
    private float price;
    @Column (name  ="image")
    private String image;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt")
    private Date createdAt;

    public Product(String title,Category category, String description, float price, String image) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category  = category;
    }
}
