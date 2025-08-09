package com.sunbeam.service.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dto.admin.OrderResponseDTO;
import com.sunbeam.dto.admin.RestaurantResponseDTO;
import com.sunbeam.dto.admin.UserResponseDTO;
import com.sunbeam.model.Address;
import com.sunbeam.model.MenuItem;
import com.sunbeam.model.Order;
import com.sunbeam.model.Payment;
import com.sunbeam.model.Restaurant;
import com.sunbeam.model.User;
import com.sunbeam.repository.MenuItemRepository;
import com.sunbeam.repository.OrderRepository;
import com.sunbeam.repository.PaymentRepository;
import com.sunbeam.repository.RestaurantRepository;
import com.sunbeam.repository.UserAddressRepository;
import com.sunbeam.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RestaurantRepository restaurantRepo;
	@Autowired
	private OrderRepository orderRepo;

	@Autowired
	private MenuItemRepository menuRepo;
	@Autowired
	private PaymentRepository paymentRepo;
	@Autowired
	private UserAddressRepository addressRepo;

	// 1️⃣ Users
	public List<UserResponseDTO> getAllUsers() {
		return userRepo.findAll().stream().map(u -> new UserResponseDTO(u.getId(), u.getFullName(), u.getEmail(),
				u.getPhoneNumber(), u.getStatus().name())).collect(Collectors.toList());
	}

	public UserResponseDTO updateUserStatus(int id, String status) {
		User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		user.setStatus(User.Status.valueOf(status));
		User updated = userRepo.save(user);
		return new UserResponseDTO(updated.getId(), updated.getFullName(), updated.getEmail(), updated.getPhoneNumber(),
				updated.getStatus().name());
	}

	// 2️⃣ Restaurants
	public List<RestaurantResponseDTO> getAllRestaurants() {
		return restaurantRepo.findAll().stream()
				.map(r -> new RestaurantResponseDTO(r.getId(), r.getName(), r.getRating(), r.getStatus().name()))
				.collect(Collectors.toList());
	}

	public RestaurantResponseDTO updateRestaurantStatus(int id, String status) {
		Restaurant r = restaurantRepo.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
		r.setStatus(Restaurant.Status.valueOf(status));
		Restaurant updated = restaurantRepo.save(r);
		return new RestaurantResponseDTO(updated.getId(), updated.getName(), updated.getRating(),
				updated.getStatus().name());
	}

	// 3️⃣ Orders
	public List<OrderResponseDTO> getAllOrders() {
		return orderRepo.findAll().stream().map(o -> new OrderResponseDTO(o.getId(), o.getUserId(), o.getRestaurantId(),
				o.getTotalAmount(), o.getNetAmount(), o.getStatus().name())).collect(Collectors.toList());
	}

	public OrderResponseDTO updateOrderStatus(int id, String status) {
		Order o = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		o.setStatus(Order.OrderStatus.valueOf(status));
		Order updated = orderRepo.save(o);
		return new OrderResponseDTO(updated.getId(), updated.getUserId(), updated.getRestaurantId(),
				updated.getTotalAmount(), updated.getNetAmount(), updated.getStatus().name());
	}

	// ------------------ MENUS ------------------
	public List<MenuItem> getAllMenuItems() {
		return menuRepo.findAll();
	}

	public MenuItem updateMenuStatus(int id, String status) {
		MenuItem menu = menuRepo.findById(id).orElseThrow(() -> new RuntimeException("Menu not found"));
		menu.setStatus(MenuItem.Status.valueOf(status));
		return menuRepo.save(menu);
	}

	// ------------------ PAYMENTS ------------------
	public List<Payment> getAllPayments() {
		return paymentRepo.findAll();
	}

	// ------------------ USER ADDRESSES ------------------
	public List<Address> getAllUserAddresses() {
		return addressRepo.findAll();
	}
}
