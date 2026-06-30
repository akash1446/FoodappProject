package com.akash.foodiezone.model;
import jakarta.persistence.*;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;   // "Biryani", "Starters" etc.
    private String description;
    private double price;
    private String imageUrl;
    private boolean available;
    
    public MenuItem() {
    	
    }
	public MenuItem(String name, String category, String description, double price, String imageUrl,
			boolean available) {
		super();
		this.name = name;
		this.category = category;
		this.description = description;
		this.price = price;
		this.imageUrl = imageUrl;
		this.available = available;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}

	@Override
	public String toString() {
		return "MenuItem [id=" + id + ", name=" + name + ", category=" + category + ", description=" + description
				+ ", price=" + price + ", imageUrl=" + imageUrl + ", available=" + available + "]";
	}
	
    
    
    

}