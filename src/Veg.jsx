import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "./redux/cartSlice";
import { addToOrders } from "./redux/orderSlice";

// NOTIFICATIONS
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

// CSS
import "./Veg.css";

const products = [
  {
    id: 1,
    name: "Veg Biryani",
    price: 100,
    imageUrl: "Images/VegItems/Biryani.jpg",
    desc: "Aromatic rice cooked with spices and fresh vegetables.",
    category: "Veg",
  },
  {
    id: 2,
    name: "Veg Pizza",
    price: 120,
    imageUrl: "Images/VegItems/pizza.jpg",
    desc: "Cheesy pizza topped with colorful veggies.",
    category: "Veg",
  },
  {
    id: 3,
    name: "Puri",
    price: 40,
    imageUrl: "Images/VegItems/puri.jpg",
    desc: "Crispy deep-fried bread served hot.",
    category: "Veg",
  },
  {
    id: 4,
    name: "Veg Burger",
    price: 200,
    imageUrl: "Images/VegItems/burger.jpg",
    desc: "Soft bun with crispy veggie patty and sauces.",
    category: "Veg",
  },
  {
    id: 5,
    name: "Soup",
    price: 60,
    imageUrl: "Images/VegItems/soup.jpg",
    desc: "Healthy warm soup made with fresh ingredients.",
    category: "Veg",
  },
  {
    id: 6,
    name: "Samosa",
    price: 20,
    imageUrl: "Images/VegItems/samosa.jpg",
    desc: "Golden fried snack stuffed with spicy potatoes.",
    category: "Veg",
  },
  {
    id: 7,
    name: "Veg Skewers",
    price: 70,
    imageUrl: "Images/VegItems/skewers.jpg",
    desc: "Grilled vegetable skewers with smoky flavour.",
    category: "Veg",
  },
  {
    id: 8,
    name: "Voda",
    price: 30,
    imageUrl: "Images/VegItems/voda.jpg",
    desc: "Crispy South Indian snack served with chutney.",
    category: "Veg",
  },
  {
    id: 9,
    name: "Veg Noodles",
    price: 85,
    imageUrl: "Images/VegItems/noodles.jpg",
    desc: "Stir-fried noodles with fresh vegetables.",
    category: "Veg",
  },
  {
    id: 10,
    name: "Spring Roll",
    price: 50,
    imageUrl: "Images/VegItems/springroll.jpg",
    desc: "Crunchy rolls filled with veggies and spices.",
    category: "Veg",
  },
  {
    id: 11,
    name: "Watermelon",
    price: 100,
    imageUrl: "Images/VegItems/watermelons.jpg",
    desc: "Fresh juicy watermelon slices.",
    category: "Veg",
  },
  {
    id: 12,
    name: "Fried Rice",
    price: 120,
    imageUrl: "Images/VegItems/friedrice.jpg",
    desc: "Flavorful rice stir-fried with vegetables.",
    category: "Veg",
  },
  {
    id: 13,
    name: "Corn",
    price: 30,
    imageUrl: "Images/VegItems/Corn.jpg",
    desc: "Boiled corn seasoned with spices.",
    category: "Veg",
  },
  {
    id: 14,
    name: "Creamy Pasta",
    price: 120,
    imageUrl: "/Images/VegItems/Pasta.jpg",
    desc: "Creamy pasta cooked with herbs and veggies.",
    category: "Veg",
  },
  {
    id: 15,
    name: "Veg Shawarma",
    price: 110,
    imageUrl: "Images/VegItems/Shawarma Veg.jpg",
    desc: "Veg shawarma wrapped with sauces and veggies.",
    category: "Veg",
  },
  {
    id: 16,
    name: "Fresh Grapes",
    price: 100,
    imageUrl: "Images/VegItems/grapes.jpg",
    desc: "Sweet and fresh grapes full of nutrition.",
    category: "Veg",
  },
  {
    id: 17,
    name: "Mangoes",
    price: 150,
    imageUrl: "/Images/VegItems/mangoes.jpg",
    desc: "Juicy ripe mangoes full of flavour.",
    category: "Veg",
  },
  {
    id: 18,
    name: "Veg Cutlet",
    price: 35,
    imageUrl: "/Images/VegItems/cutlet.jpg",
    desc: "Crispy vegetable cutlet snack.",
    category: "Veg",
  },
  {
    id: 19,
    name: "French Fries",
    price: 120,
    imageUrl: "/Images/VegItems/fries.jpg",
    desc: "Crispy golden potato fries.",
    category: "Veg",
  },
  {
    id: 20,
    name: "Masala Dosa",
    price: 50,
    imageUrl: "/Images/VegItems/masla.jpg",
    desc: "South Indian dosa stuffed with spicy potato filling.",
    category: "Veg",
  },
  {
    id: 21,
    name: "Sambar",
    price: 30,
    imageUrl: "/Images/VegItems/sambar.jpg",
    desc: "Spicy South Indian lentil curry.",
    category: "Veg",
  },
  {
    id: 22,
    name: "Ragi Mudde",
    price: 45,
    imageUrl: "Images/VegItems/ragimudde.jpg",
    desc: "Healthy food made from Ragi Mudde",
    category: "Veg",
  },
  {
    id: 23,
    name: "Tiger Rice",
    price: 65,
    imageUrl: "Images/VegItems/tigerrice.jpg",
    desc: "Spicy And Flavourful rice cooked With Fresh Tiger Rice",
    category: "Veg",
  },
  {
    id: 24,
    name: "Ragi Java",
    price: 40,
    imageUrl: "Images/VegItems/java.jpg",
    desc: "Healthy food made from Ragi Java",
    category: "Veg",
  },
];

function Veg() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // PRICE FILTER SLIDER 💰
  // =========================
  const highestPrice = Math.max(...products.map((p) => p.price));
  const [maxPrice, setMaxPrice] = useState(highestPrice);

  const itemsPerPage = 6;

  // =========================
  // RATING FUNCTION ⭐
  // =========================
  const getRating = (id) => {
    const rating = (3 + (id % 3) + Math.random()).toFixed(1);
    return Math.min(rating, 5);
  };

  // =========================
  // FILTER BY PRICE
  // =========================
  const filteredProducts = products.filter((item) => item.price <= maxPrice);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(addToOrders(item));

    toast.success(`Added ${item.name}!`, {
      position: "bottom-right",
      autoClose: 1000,
      theme: "colored",
    });

    Swal.fire({
      title: "Success!",
      text: `${item.name} added successfully.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // =========================
  // PAGE CHANGE
  // =========================
  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // PRICE CHANGE
  // =========================
  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1); // reset to page 1 whenever the filter changes
  };

  return (
    <div className="veg-wrapper">
      <ToastContainer />

      {/* BACKGROUND VIDEO */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src="Images/Videos/animation.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      {/* HEADER */}
      <div className="header-section">
        <h2>🥦 Fresh Veg Menu</h2>
      </div>

      {/* PRICE FILTER SLIDER */}
      <div className="price-filter">
        <p className="price-filter-label">Max Price: ₹{maxPrice}</p>
        <input
          type="range"
          min="0"
          max={highestPrice}
          step="5"
          value={maxPrice}
          onChange={handlePriceChange}
          className="price-slider"
        />
      </div>

      {/* GRID */}
      <div className="grid-container">
        {currentItems.map((item, index) => (
          <div className="grid-card" key={item.id || index}>
            <div className="img-box">
              <img src={item.imageUrl} alt={item.name} />
            </div>

            <div className="card-info">
              <h3>{item.name}</h3>

              {/* ⭐ RATING ADDED */}
              <p className="rating">⭐ {getRating(item.id)} / 5</p>

              <p className="desc">{item.desc}</p>

              <p className="price">₹{item.price}</p>

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <p className="no-results">No items match this price range.</p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={currentPage === num ? "active" : ""}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Veg;
