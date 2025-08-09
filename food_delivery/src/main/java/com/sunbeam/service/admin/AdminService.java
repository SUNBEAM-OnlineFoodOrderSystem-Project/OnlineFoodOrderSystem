package com.sunbeam.service.admin;

import java.util.List;

import com.sunbeam.dto.admin.OrderResponseDTO;
import com.sunbeam.dto.admin.RestaurantResponseDTO;
import com.sunbeam.dto.admin.UserResponseDTO;
import com.sunbeam.model.Address;
import com.sunbeam.model.MenuItem;
import com.sunbeam.model.Payment;

public interface AdminService {
	List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUserStatus(int id, String status);

    List<RestaurantResponseDTO> getAllRestaurants();
    RestaurantResponseDTO updateRestaurantStatus(int id, String status);

    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO updateOrderStatus(int id, String status);
    
    List<MenuItem> getAllMenuItems();
    MenuItem updateMenuStatus(int id, String status);

    List<Payment> getAllPayments();

    List<Address> getAllUserAddresses();

}
