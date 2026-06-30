package com.akash.foodiezone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akash.foodiezone.model.MenuItem;
import com.akash.foodiezone.repository.MenuItemRepository;

@Service
public class MenuItemService {
	
	 @Autowired
	    private MenuItemRepository repository;

	    public List getAllItems() {
	        return repository.findAll();
	    }

	    public List getByCategory(String category) {
	        return repository.findByCategory(category);
	    }

	    public MenuItem saveItem(MenuItem item) {
	        return repository.save(item);
	    }
	}


