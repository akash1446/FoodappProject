package com.akash.foodiezone.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    private String customerName;
    private Long customerPhone;
    private String deliveryAddress;
    private double totalAmount;
    private String status; 
    @Lob
    @Column(name = "items_summary",length = 4000)
    private String itemsSummary;  // e.g. "Biryani x2, Naan x1"

    @Column(name = "order_time")
    private LocalDateTime orderTime = LocalDateTime.now();

    public Order() {
    }

    public Order(Long customerId, String customerName, Long customerPhone, String deliveryAddress,
            double totalAmount, String status, String itemsSummary, LocalDateTime orderTime) {
        super();
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.deliveryAddress = deliveryAddress;
        this.totalAmount = totalAmount;
        this.status = status;
        this.itemsSummary = itemsSummary;
        this.orderTime = orderTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(Long customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getItemsSummary() {
        return itemsSummary;
    }

    public void setItemsSummary(String itemsSummary) {
        this.itemsSummary = itemsSummary;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    @Override
    public String toString() {
        return "Order [id=" + id + ", customerId=" + customerId + ", customerName=" + customerName
                + ", customerPhone=" + customerPhone + ", deliveryAddress=" + deliveryAddress
                + ", totalAmount=" + totalAmount + ", status=" + status + ", itemsSummary=" + itemsSummary
                + ", orderTime=" + orderTime + "]";
    }
}