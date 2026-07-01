import React from "react";
import "./Aboutus.css";

const features = [
  {
    icon: "🍔",
    colorClass: "card--amber",
    title: "Delicious Food",
    desc: "Enjoy mouth-watering dishes prepared with fresh ingredients and rich flavors from top restaurants.",
  },

  {
    icon: "⚡",
    colorClass: "card--coral",
    title: "Fast Delivery",
    desc: "Get your favorite meals delivered quickly and safely to your doorstep anytime you order.",
  },

  {
    icon: "🥗",
    colorClass: "card--teal",
    title: "Fresh & Healthy",
    desc: "We maintain high hygiene standards and use quality ingredients for every meal we deliver.",
  },

  {
    icon: "💳",
    colorClass: "card--blue",
    title: "Secure Payments",
    desc: "Pay securely using UPI, debit cards, credit cards, wallets, or cash on delivery.",
  },

  {
    icon: "📍",
    colorClass: "card--green",
    title: "Live Tracking",
    desc: "Track your food order in real-time from the restaurant directly to your location.",
  },

  {
    icon: "🎧",
    colorClass: "card--pink",
    title: "24/7 Support",
    desc: "Our customer support team is always ready to help you with orders and delivery issues.",
  },
];

const highlights = [
  { icon: "🍕", label: "Tasty Meals" },

  { icon: "🚀", label: "Quick Delivery" },

  { icon: "⭐", label: "Top Rated Service" },

  { icon: "💰", label: "Affordable Prices" },

  { icon: "❤️", label: "Customer Satisfaction" },
];

function Aboutus() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}

      <header className="about-hero">
        <div className="about-overlay"></div>

        <div className="about-hero-content">
          <div className="about-hero__tag">
            🔥 India’s Favorite Food Delivery Platform
          </div>

          <h1 className="about-hero__title">
            Fresh Food <span>Delivered Fast</span>
          </h1>

          <p className="about-hero__sub">
            Discover delicious meals from your favorite restaurants with
            lightning-fast delivery and premium customer experience.
          </p>

          <div className="about-hero-buttons">
            <button className="primary-btn">Order Now</button>

            <button className="secondary-btn">Explore Menu</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <main className="about-body">
        {/* INTRO SECTION */}

        <section className="about-intro">
          <h2>Welcome To Foodie Express</h2>

          <p>
            Foodie Express connects food lovers with top-rated restaurants to
            deliver fresh, tasty, and hygienic meals right to your doorstep. We
            combine quality food, fast delivery, secure payments, and excellent
            support to create the best online food ordering experience.
          </p>
        </section>

        {/* SECTION HEADING */}

        <div className="about-heading-wrap">
          <p className="about-section-label">OUR SERVICES</p>

          <h2 className="about-main-heading">
            Why Customers Love Foodie Express
          </h2>
        </div>

        {/* FEATURES GRID */}

        <div className="about-grid">
          {features.map(({ icon, colorClass, title, desc }) => (
            <div key={title} className={`about-card ${colorClass}`}>
              <div className="about-card__icon">{icon}</div>

              <h3 className="about-card__title">{title}</h3>

              <p className="about-card__desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNER */}

        <section className="about-banner">
          <div className="about-banner-content">
            <h2 className="about-banner__title">
              Experience Fast & Reliable Food Delivery
            </h2>

            <p className="about-banner__sub">
              We deliver happiness with tasty meals, fast service, affordable
              pricing, and trusted customer support.
            </p>

            <div className="about-pills">
              {highlights.map(({ icon, label }) => (
                <div key={label} className="about-pill">
                  <span>{icon}</span>

                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Aboutus;
