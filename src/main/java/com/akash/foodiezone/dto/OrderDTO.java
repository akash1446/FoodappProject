package com.akash.foodiezone.dto;

public class OrderDTO {
    private Long customerId;
    private String customerName;
    private long customerPhone;
    private String deliveryAddress;
    private Double totalAmount;
    private String itemsSummary;
    private String status;

    public OrderDTO() {
    	
    }
	
	public OrderDTO(Long customerId, String customerName, long customerPhone, String deliveryAddress,
			Double totalAmount, String itemsSummary, String status) {
		super();
		this.customerId = customerId;
		this.customerName = customerName;
		this.customerPhone = customerPhone;
		this.deliveryAddress = deliveryAddress;
		this.totalAmount = totalAmount;
		this.itemsSummary = itemsSummary;
		this.status = status;
	}

	// Getters & Setters
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    
    

    public long getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(Long customerPhone) {
		this.customerPhone = customerPhone;
	}

	public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getItemsSummary() { return itemsSummary; }
    public void setItemsSummary(String itemsSummary) { this.itemsSummary = itemsSummary; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
	@Override
	public String toString() {
		return "OrderDTO [customerId=" + customerId + ", customerName=" + customerName + ", deliveryAddress="
				+ deliveryAddress + ", totalAmount=" + totalAmount + ", itemsSummary=" + itemsSummary + ", status="
				+ status + "]";
	}
    
    
}