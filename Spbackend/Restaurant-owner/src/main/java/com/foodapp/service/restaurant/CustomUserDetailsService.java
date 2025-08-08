package com.foodapp.service.restaurant;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.foodapp.model.User;
import com.foodapp.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService 
{

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
             //  List.of(new SimpleGrantedAuthority("Restaurant_User_ " + user.getRole().getRoleName()))
                
               // List.of(new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase())) 
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName()))
                
        );
    }
	
}
