package com.sunbeam.controllers.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.admin.OrderResponseDTO;
import com.sunbeam.dto.admin.RestaurantResponseDTO;
import com.sunbeam.dto.admin.UserResponseDTO;
import com.sunbeam.model.Address;
import com.sunbeam.model.MenuItem;
import com.sunbeam.model.Payment;
import com.sunbeam.service.admin.AdminService;
import com.sunbeam.util.ResponseUtil;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Users
    @GetMapping("/users")
    public ResponseUtil<List<UserResponseDTO>> getAllUsers() {
        return ResponseUtil.apiSuccess(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}/status")
    public ResponseUtil<UserResponseDTO> updateUserStatus(@PathVariable int id, @RequestParam String status) {
        return ResponseUtil.apiSuccess(adminService.updateUserStatus(id, status));
    }

    // Restaurants
    @GetMapping("/restaurants")
    public ResponseUtil<List<RestaurantResponseDTO>> getAllRestaurants() {
        return ResponseUtil.apiSuccess(adminService.getAllRestaurants());
    }

    @PutMapping("/restaurants/{id}/status")
    public ResponseUtil<RestaurantResponseDTO> updateRestaurantStatus(@PathVariable int id, @RequestParam String status) {
        return ResponseUtil.apiSuccess(adminService.updateRestaurantStatus(id, status));
    }

    // Orders
    @GetMapping("/orders")
    public ResponseUtil<List<OrderResponseDTO>> getAllOrders() {
        return ResponseUtil.apiSuccess(adminService.getAllOrders());
    }

    @PutMapping("/orders/{id}/status")
    public ResponseUtil<OrderResponseDTO> updateOrderStatus(@PathVariable int id, @RequestParam String status) {
        return ResponseUtil.apiSuccess(adminService.updateOrderStatus(id, status));
    }
    
 // ----------- Menus -----------
    @GetMapping("/menus")
    public ResponseUtil<List<MenuItem>> getAllMenus() {
        return ResponseUtil.apiSuccess(adminService.getAllMenuItems());
    }

    @PutMapping("/menus/{id}/status")
    public ResponseUtil<MenuItem> updateMenuStatus(@PathVariable int id, @RequestParam String status) {
        return ResponseUtil.apiSuccess(adminService.updateMenuStatus(id, status));
    }

    // ----------- Payments -----------
    @GetMapping("/payments")
    public ResponseUtil<List<Payment>> getAllPayments() {
        return ResponseUtil.apiSuccess(adminService.getAllPayments());
    }

    // ----------- User Addresses -----------
    @GetMapping("/addresses")
    public ResponseUtil<List<Address>> getAllUserAddresses() {
        return ResponseUtil.apiSuccess(adminService.getAllUserAddresses());
    }
}