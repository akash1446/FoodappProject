import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "./redux/cartSlice";
import { addToOrders } from "./redux/orderSlice";

// Notifications & Effects
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

// Styling
import "./Milk.css";

const milkitems = [
  {
    id: 46,
    name: "Milk",
    price: 50,
    imageUrl: "/Images/MilkItems/milk.jpg",
    description: "Fresh full cream milk.",
    category: "Milk",
  },
  {
    id: 47,
    name: "Curd",
    price: 40,
    imageUrl: "/Images/MilkItems/curd.jpg",
    description: "Thick and fresh curd.",
    category: "Milk",
  },
  {
    id: 48,
    name: "Butter",
    price: 120,
    imageUrl: "/Images/MilkItems/butter-milk.jpg",
    description: "Creamy butter.",
    category: "Milk",
  },
  {
    id: 49,
    name: "Condensed Milk",
    price: 150,
    imageUrl: "/Images/MilkItems/condsenedmilk.jpg",
    description: "Sweet condensed milk.",
    category: "Milk",
  },
  {
    id: 50,
    name: "Diary",
    price: 200,
    imageUrl: "/Images/MilkItems/diary.jpg",
    description: "Soft diary.",
    category: "Milk",
  },
  {
    id: 51,
    name: "Fresh Milk",
    price: 500,
    imageUrl: "/Images/MilkItems/fresh.jpg",
    description: "Pure fresh milk.",
    category: "Milk",
  },
  {
    id: 52,
    name: "Milk Mate",
    price: 30,
    imageUrl: "/Images/MilkItems/milkmate.jpg",
    description: "Milk enhancer.",
    category: "Milk",
  },
  {
    id: 53,
    name: "Nido",
    price: 60,
    imageUrl: "/Images/MilkItems/nido.jpg",
    description: "Fortified milk.",
    category: "Milk",
  },
  {
    id: 54,
    name: "Silk",
    price: 100,
    imageUrl: "/Images/MilkItems/silk.jpg",
    description: "Smooth and creamy.",
    category: "Milk",
  },
  {
    id: 55,
    name: "Milk Powder",
    price: 300,
    imageUrl: "/Images/MilkItems/milkpowder.jpg",
    description: "Instant milk.",
    category: "Milk",
  },
  {
    id: 56,
    name: "Whole Milk",
    price: 180,
    imageUrl: "/Images/MilkItems/wholemilk.jpg",
    description: "Nutritious whole milk.",
    category: "Milk",
  },
  {
    id: 57,
    name: "Parmalat",
    price: 250,
    imageUrl: "/Images/MilkItems/parmalat.jpg",
    description: "Fresh milk.",
    category: "Milk",
  },
  {
    id: 58,
    name: "Cowa Milk",
    price: 80,
    imageUrl: "/Images/MilkItems/cowamilk.jpg",
    description: "Delicious milk.",
    category: "Milk",
  },
  {
    id: 59,
    name: "Lassi",
    price: 50,
    imageUrl: "/Images/MilkItems/lassi.jpg",
    description: "Traditional drink.",
    category: "Milk",
  },
  {
    id: 60,
    name: "Chocolate Milk",
    price: 350,
    imageUrl: "public/Images/MilkItems/chocolate.jpg",
    description: "Delicious chocolate-flavored milk.",
    category: "Milk",
  },
  {
    id: 61,
    name: "Milkshake",
    price: 90,
    imageUrl: "/Images/MilkItems/shake.jpg",
    description: "Flavored drink.",
    category: "Milk",
  },
  {
    id: 62,
    name: "Arokya Milk",
    price: 70,
    imageUrl: "/Images/MilkItems/aroky.jpg",
    description: "Delicious milk.",
    category: "Milk",
  },
  {
    id: 63,
    name: "Yogurt",
    price: 60,
    imageUrl: "/Images/MilkItems/yogurt.jpg",
    description: "Healthy yogurt.",
    category: "Milk",
  },
  {
    id: 64,
    name: "Hastun Curd",
    price: 140,
    imageUrl: "/Images/MilkItems/hastuncurd.jpg",
    description: "Traditional curd.",
    category: "Milk",
  },
  {
    id: 65,
    name: "Toned Milk",
    price: 200,
    imageUrl: "/Images/MilkItems/toned.jpg",
    description: "Toned milk.",
    category: "Milk",
  },
];

function Milk() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // =========================
  // ⭐ RATING (ADDED ONLY)
  // =========================
  const getRating = (id) => {
    const rating = Math.min(3 + (id % 3) + Math.random(), 5);
    return Math.round(rating);
  };

  const renderStars = (rating) => {
    return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
  };

  // =========================
  // SWEET ALERT
  // =========================
  const showEffect = (item) => {
    Swal.fire({
      icon: "success",
      title: "Added to Cart 🥛",
      text: `${item.name} added successfully!`,
      confirmButtonColor: "#27ae60",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(addToOrders(item));

    toast.success(`🥛 ${item.name} added successfully!`);
    showEffect(item);
  };

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(milkitems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = milkitems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="store-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* VIDEO */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src="Images/MilkItems/milkvideo.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      {/* HEADER */}
      <div className="header-section">
        <h1>🥛 Milk Products</h1>
      </div>

      {/* PRODUCTS */}
      <div className="list-container">
        {currentItems.map((item) => (
          <div key={item.id} className="grid-card">
            <div className="img-box">
              <img src={item.imageUrl} alt={item.name} />
            </div>

            <div className="card-info">
              <h3>{item.name}</h3>

              {/* ⭐ RATING ADDED */}
              <p className="rating">{renderStars(getRating(item.id))}</p>

              <p className="price">₹{item.price}</p>
              <p className="desc">{item.description}</p>

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={currentPage === n ? "active" : ""}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Milk;
