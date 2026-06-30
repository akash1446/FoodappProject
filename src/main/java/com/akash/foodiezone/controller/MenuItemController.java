package com.akash.foodiezone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akash.foodiezone.model.MenuItem;
import com.akash.foodiezone.service.MenuItemService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuItemController {

    @Autowired
    private MenuItemService service;

    @GetMapping
    public List getAllMenuItems() {
        return service.getAllItems();
    }

    @GetMapping("/category/{category}")
    public List getByCategory(
            @PathVariable String category) {
        return service.getByCategory(category);
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return service.saveItem(item);
    }
}

