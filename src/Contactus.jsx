import React from "react";
import "./Contactus.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contactus() {
  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <div className="contact-hero">
        <h1>Contact Us</h1>

        <p>Have Any questions or suggestions? Let’s talk!</p>
      </div>

      {/* CONTACT CONTENT */}
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-info">
          <h2>Reach Out Directly</h2>

          <div className="info-item">
            <FaEnvelope className="icon email" />

            <p>
              <span>Email:</span>guduriakash9@gmail.com
            </p>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="icon phone" />

            <p>
              <span>Phone:</span> +91 8125561511
            </p>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon location" />

            <p>
              <span>Address:</span> 208 Alareddyguda, Ameerpet, Hyderabad,
              Telangana, India
            </p>
          </div>

          <div className="business-hours">
            <h3>Business Hours</h3>

            <p>Mon - Sat: 8:59 AM - 9:00 PM</p>

            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-section">
          <h2>Send Message</h2>

          <form className="contact-form">
            <input type="text" placeholder="Enter your name" />

            <input type="email" placeholder="Enter your email" />

            <textarea rows="6" placeholder="Write your message..."></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactus;