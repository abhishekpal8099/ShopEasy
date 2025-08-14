import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import "../pageStyles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll contact you soon.");

    // Clear form fields after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <Navbar />
      <PageTitle title="Contact Us" />

      <div className="contact-content">
        <section className="contact-form-section">
          <div className="container">
            <h2 className="section-title">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <section className="contact-info-section">
          <div className="container">
            <h2 className="section-title">Contact Information</h2>
            <div className="contact-info">
              <div className="info-item">
                <h3>Email</h3>
                <p>shopeasy780@gmail.com</p>
              </div>
              <div className="info-item">
                <h3>Phone</h3>
                <p>+91 9123456789</p>
              </div>
              <div className="info-item">
                <h3>Address</h3>
                <p>123 Business Street, Kanpur, UP, India</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
