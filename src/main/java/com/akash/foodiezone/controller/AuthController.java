package com.akash.foodiezone.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://foodapp-project-umber.vercel.app")
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