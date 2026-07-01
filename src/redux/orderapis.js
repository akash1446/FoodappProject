const BASE_URL = "http://localhost:8083/api";

export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Order creation failed");
  }
  return res.json();
};

export const getOrdersByCustomer = async (customerId) => {
  const res = await fetch(`${BASE_URL}/orders/${customerId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Fetching orders failed");
  }
  return res.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Status update failed");
  }
  return res.json();
};

export const deleteOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete order");
  }
};

export const clearOrdersForCustomer = async (customerId) => {
  const res = await fetch(`${BASE_URL}/orders/customer/${customerId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to clear orders");
  }
};
