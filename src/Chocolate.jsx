import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import { addToOrders } from "./redux/orderSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

import "./Chocolate.css";

function Chocolate() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
  // CHOCOLATE PRODUCTS
  // =========================
  const products = [
    {
      id: 66,
      name: "Almonds",
      price: 90,
      imageUrl: "Images/Chocolate/almonds.jpg",
      desc: "Delicious almond chocolate with rich taste.",
    },
    {
      id: 67,
      name: "Butter Mix",
      price: 25,
      imageUrl: "Images/Chocolate/buttermix.jpg",
      desc: "Creamy butter mix chocolate snack.",
    },
    {
      id: 68,
      name: "Dairy Milk",
      price: 20,
      imageUrl: "Images/Chocolate/dairymilk.jpg",
      desc: "Smooth and creamy milk chocolate.",
    },
    {
      id: 69,
      name: "Diamond",
      price: 30,
      imageUrl: "Images/Chocolate/diamond.jpg",
      desc: "Tasty chocolate treat.",
    },
    {
      id: 70,
      name: "Premium Diamond",
      price: 40,
      imageUrl: "Images/Chocolate/diamond.jpg",
      desc: "Premium chocolate delight.",
    },
    {
      id: 71,
      name: "Five Star",
      price: 15,
      imageUrl: "Images/Chocolate/fivestar.jpg",
      desc: "Soft caramel chocolate bar.",
    },
    {
      id: 72,
      name: "Fuse",
      price: 45,
      imageUrl: "Images/Chocolate/Fuse.jpg",
      desc: "Crunchy nut caramel chocolate.",
    },
    {
      id: 73,
      name: "KitKat",
      price: 30,
      imageUrl: "Images/Chocolate/kitkat.jpg",
      desc: "Crispy wafer chocolate snack.",
    },
    {
      id: 74,
      name: "Kopiko",
      price: 85,
      imageUrl: "Images/Chocolate/kopiko.jpg",
      desc: "Coffee-flavoured candy.",
    },
    {
      id: 75,
      name: "Milka",
      price: 40,
      imageUrl: "Images/Chocolate/milka.jpg",
      desc: "Smooth milk chocolate.",
    },
    {
      id: 76,
      name: "MilkyBar",
      price: 150,
      imageUrl: "Images/Chocolate/Milkybar.jpg",
      desc: "White chocolate delight.",
    },
    {
      id: 77,
      name: "Munch",
      price: 100,
      imageUrl: "Images/Chocolate/munch.jpg",
      desc: "Crunchy wafer bar.",
    },
    {
      id: 78,
      name: "Oreo",
      price: 30,
      imageUrl: "Images/Chocolate/oreo.jpg",
      desc: "Chocolate biscuit snack.",
    },
    {
      id: 79,
      name: "Pocky",
      price: 50,
      imageUrl: "Images/Chocolate/pocky.jpg",
      desc: "Chocolate sticks.",
    },
    {
      id: 80,
      name: "Snickers",
      price: 40,
      imageUrl: "Images/Chocolate/snickers.jpg",
      desc: "Peanut caramel bar.",
    },
    {
      id: 81,
      name: "Stiko",
      price: 60,
      imageUrl: "Images/Chocolate/stiko.jpg",
      desc: "Sweet crunchy snack.",
    },
    {
      id: 82,
      name: "Ferrero Rocher",
      price: 450,
      imageUrl: "Images/Chocolate/ferrerorocher.jpg",
      desc: "Hazelnut milk chocolate balls.",
    },
    {
      id: 83,
      name: "Bournville",
      price: 90,
      imageUrl: "Images/Chocolate/Bournville.jpg",
      desc: "Rich dark chocolate experience.",
    },
    {
      id: 84,
      name: "Lotte Choco Pie",
      price: 120,
      imageUrl: "Images/Chocolate/chocopie.jpg",
      desc: "Marshmallow filled chocolate cake.",
    },
    {
      id: 85,
      name: "Kinder Joy",
      price: 45,
      imageUrl: "Images/Chocolate/kinder.jpg",
      desc: "Chocolate cream with a surprise toy.",
    },
  ];

  // =========================
  // ALERT FUNCTION
  // =========================
  const showCelebration = (item) => {
    Swal.fire({
      icon: "success",
      title: "Chocolate Added 🍫",
      text: `${item.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(addToOrders(item));

    toast.success(`🍫 ${item.name} added to cart!`);

    showCelebration(item);
  };

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (n) => {
    setCurrentPage(n);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="store-wrapper">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="Images/Chocolate/video.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="header-section">
        <h2>🍫 Chocolate Items</h2>
      </div>

      <div className="grid-container">
        {currentItems.map((item) => (
          <div key={item.id} className="grid-card">
            <div className="img-holder">
              <img src={item.imageUrl} alt={item.name} />
            </div>

            <div className="card-info">
              <h3>{item.name}</h3>

              {/* ⭐ RATING ADDED */}
              <p className="rating">{renderStars(getRating(item.id))}</p>

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
      </div>

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

export default Chocolate;
