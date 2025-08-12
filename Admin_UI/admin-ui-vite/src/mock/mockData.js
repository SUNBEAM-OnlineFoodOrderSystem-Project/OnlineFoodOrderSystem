export const usersMock = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Customer", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Restaurant_User", status: "blocked" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Delivery_Partner", status: "active" },
];

export const restaurantsMock = [
  { id: 1, name: "Pizza Palace", city: "New York", status: "active" },
  { id: 2, name: "Burger Hub", city: "Chicago", status: "inactive" },
];

export const ordersMock = [
  { id: 101, user: "Alice Johnson", restaurant: "Pizza Palace", amount: 25.5, status: "placed" },
  { id: 102, user: "Bob Smith", restaurant: "Burger Hub", amount: 15.0, status: "delivered" },
];

export const menusMock = [
  { id: 201, restaurant: "Pizza Palace", item: "Margherita", price: 9.99, status: "active" },
  { id: 202, restaurant: "Burger Hub", item: "Cheeseburger", price: 7.99, status: "inactive" },
];

export const paymentsMock = [
  { id: 301, orderId: 101, amount: 25.5, method: "UPI", status: "paid" },
  { id: 302, orderId: 102, amount: 15.0, method: "COD", status: "success" },
];

export const addressesMock = [
  { id: 401, user: "Alice Johnson", address: "123 Main St, New York" },
  { id: 402, user: "Bob Smith", address: "55 Oak Ave, Chicago" },
];
