package com.akash.foodiezone.service;

import com.akash.foodiezone.model.User;
import com.akash.foodiezone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User registerUser(User user) {
        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        return repository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = repository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}