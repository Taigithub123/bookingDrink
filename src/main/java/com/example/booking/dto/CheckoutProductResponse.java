package com.example.booking.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class CheckoutProductResponse {
    private Long id;
    private Long checkoutId;
    private Long productId;
    private Long userId;
    private int quantity;
}
