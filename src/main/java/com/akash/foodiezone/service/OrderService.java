package com.akash.foodiezone.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akash.foodiezone.dto.OrderDTO;
import com.akash.foodiezone.model.Order;
import com.akash.foodiezone.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(OrderDTO dto) {
        Order order = new Order();
        order.setOrderTime(LocalDateTime.now());
        order.setCustomerName(dto.getCustomerName());
        order.setCustomerPhone(dto.getCustomerPhone());     // fix: was missing
        order.setCustomerId(dto.getCustomerId());            // fix: was missing
        order.setDeliveryAddress(dto.getDeliveryAddress());
        order.setTotalAmount(dto.getTotalAmount());
        order.setItemsSummary(dto.getItemsSummary());
        order.setStatus(dto.getStatus() != null ? dto.getStatus() : "Pending");
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    public void clearOrdersByCustomer(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        orderRepository.deleteAll(orders);
    }
}