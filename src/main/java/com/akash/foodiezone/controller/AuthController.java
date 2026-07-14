package com.akash.foodiezone.controller;

import org.springframework.web.bind.annotation.*;

import com.akash.foodiezone.dto.LoginRequest;
import com.akash.foodiezone.dto.RegisterRequest;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://foodapp-w2.netlify.app")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        System.out.println(request.getEmail());

        return "Login Successful";
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        System.out.println(request.getEmail());

        return "Registration Successful";
    }
}