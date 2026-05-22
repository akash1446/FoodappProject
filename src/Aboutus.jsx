import React from "react";
import "./Aboutus.css";

const features = [
  {
    icon: "🎯",
    colorClass: "card--amber",
    title: "Our Mission",
    desc: "Deliver fresh, tasty, and hygienic food quickly while providing a premium and enjoyable ordering experience for every customer.",
  },
  {
    icon: "🚀",
    colorClass: "card--coral",
    title: "Fast Delivery",
    desc: "Lightning-fast delivery network that ensures your food arrives hot, fresh, and on time every single day.",
  },
  {
    icon: "🥗",
    colorClass: "card--teal",
    title: "Quality Food",
    desc: "Prepared with high-quality ingredients and strict hygiene standards to guarantee delicious and safe meals.",
  },
  {
    icon: "💳",
    colorClass: "card--blue",
    title: "Secure Payments",
    desc: "Pay safely using UPI, cards, wallets, or cash on delivery with complete payment security.",
  },
  {
    icon: "📍",
    colorClass: "card--green",
    title: "Live Tracking",
    desc: "Track your order in real-time from the restaurant kitchen directly to your doorstep.",
  },
  {
    icon: "❤️",
    colorClass: "card--pink",
    title: "24/7 Support",
    desc: "Friendly customer support available anytime to help with your orders, payments, or delivery queries.",
  },
];

const highlights = [
  { icon: "🌿", label: "Fresh Food" },
  { icon: "⚡", label: "Fast Delivery" },
  { icon: "🏷️", label: "Best Price" },
  { icon: "⭐", label: "Trusted Service" },
  { icon: "🎧", label: "24/7 Support" },
];

function Aboutus() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <header className="about-hero">
        <span></span>

        <div className="about-hero-content">
          <div className="about-hero__tag">Since 2020 • Hyderabad</div>

          <h1 className="about-hero__title">Foodie Express</h1>

          <p className="about-hero__sub">
            Experience delicious meals from your favorite restaurants delivered
            fast, fresh, and right to your doorstep.
          </p>

          {/* HERO STATS */}
          <div className="about-stats">
            <div className="about-stat-card">
              <h2>50K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="about-stat-card">
              <h2>120+</h2>
              <p>Restaurants</p>
            </div>

            <div className="about-stat-card">
              <h2>24/7</h2>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="about-body">
        {/* INTRO */}
        <div className="about-intro">
          <p>
            Welcome to <strong>Foodie Express</strong> — your trusted online
            food delivery platform. We connect food lovers with top-rated
            restaurants, bringing quality meals, fast delivery, and a seamless
            ordering experience together in one place.
          </p>
        </div>

        {/* SECTION LABEL */}
        <div className="about-heading-wrap">
          <p className="about-section-label">WHAT WE OFFER</p>

          <h2 className="about-main-heading">Premium Food Delivery Services</h2>
        </div>

        {/* FEATURES GRID */}
        <div className="about-grid">
          {features.map(({ icon, colorClass, title, desc }) => (
            <div key={title} className={`about-card ${colorClass}`}>
              <div className="about-card__icon" aria-hidden="true">
                {icon}
              </div>

              <h2 className="about-card__title">{title}</h2>

              <p className="about-card__desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <div className="about-banner">
          <div className="about-banner-content">
            <h3 className="about-banner__title">Why Choose Foodie Express?</h3>

            <p className="about-banner__sub">
              We focus on quality food, fast delivery, affordable pricing, and
              excellent customer support.
            </p>

            <ul className="about-pills" role="list">
              {highlights.map(({ icon, label }) => (
                <li key={label} className="about-pill">
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Aboutus;
