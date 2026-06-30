package com.akash.foodiezone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akash.foodiezone.dto.OrderDTO;
import com.akash.foodiezone.model.Order;
import com.akash.foodiezone.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	  @Autowired
	    private OrderService orderService;

	    @PostMapping
	    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO dto) {
	        Order saved = orderService.createOrder(dto);
	        return ResponseEntity.ok(saved);
	    }

	    @GetMapping("/customer/{customerId}")
	    public ResponseEntity<List<Order>> getOrders(@PathVariable Long customerId) {
	        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
	    }

	    @PutMapping("/id/status")
	    public ResponseEntity<Order> updateStatus(
	            @PathVariable Long orderId,
	            @RequestBody Map<String, String> body) {
	        Order updated = orderService.updateStatus(orderId, body.get("status"));
	        return ResponseEntity.ok(updated);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
	        orderService.deleteOrder(orderId);
	        return ResponseEntity.noContent().build();
	    }

	    @DeleteMapping("/customer/{customerId}")
	    public ResponseEntity<Void> clearOrders(@PathVariable Long customerId) {
	        orderService.clearOrdersByCustomer(customerId);
	        return ResponseEntity.noContent().build();
	    }
	}
