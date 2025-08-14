import React from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import {
  ShoppingCartOutlined,
  FlashOnOutlined,
  SecurityOutlined,
  HeadsetMicOutlined,
  CheckroomOutlined,
  LaptopMacOutlined,
  HomeOutlined,
  StarOutlineOutlined,
  FavoriteOutlined,
  LocalShippingOutlined,
  SupportAgentOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import "../pageStyles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      <PageTitle title="About Us" />

      <div className="about-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2>
                  Welcome to <span className="brand-name">ShopEasy</span>
                </h2>
                <p className="main-description">
                  At ShopEasy, we aim to make your online shopping experience
                  easy, fast, and reliable. From fashion and electronics to home
                  essentials and more, we bring you a wide range of quality
                  products at affordable prices. With secure payments, quick
                  delivery, and friendly support, ShopEasy is your go-to
                  destination for everything you need - all in one place.
                </p>
              </div>
              <div className="welcome-image">
                <div className="image-placeholder">
                  <ShoppingCartOutlined className="large-icon" />
                  <span>Smart Shopping Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose ShopEasy?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <ShoppingCartOutlined />
                </div>
                <h3>Easy Shopping</h3>
                <p>
                  Simple and intuitive interface that makes shopping a breeze
                  for everyone.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FlashOnOutlined />
                </div>
                <h3>Fast & Reliable</h3>
                <p>
                  Quick browsing, fast checkout, and reliable delivery to your
                  doorstep.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <SecurityOutlined />
                </div>
                <h3>Secure Payments</h3>
                <p>
                  Safe and secure payment options to protect your financial
                  information.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <HeadsetMicOutlined />
                </div>
                <h3>Friendly Support</h3>
                <p>
                  Our customer support team is always ready to help you with any
                  queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">What We Offer</h2>
            <div className="categories-grid">
              <div className="category-item">
                <div className="category-icon">
                  <CheckroomOutlined />
                </div>
                <h3>Fashion</h3>
                <p>
                  Latest trends in clothing, shoes, and accessories for men,
                  women, and kids.
                </p>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <LaptopMacOutlined />
                </div>
                <h3>Electronics</h3>
                <p>
                  Smartphones, laptops, gadgets, and electronic accessories at
                  great prices.
                </p>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <HomeOutlined />
                </div>
                <h3>Home Essentials</h3>
                <p>
                  Everything you need for your home - furniture, decor, kitchen
                  items, and more.
                </p>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <StarOutlineOutlined />
                </div>
                <h3>And More</h3>
                <p>
                  Books, sports, beauty products, and many other categories to
                  explore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title">Our Commitment</h2>
            <div className="values-content">
              <div className="value-item">
                <div className="value-icon">
                  <VerifiedUserOutlined />
                </div>
                <div className="value-info">
                  <h3>Quality Products</h3>
                  <p>
                    We carefully select every product to ensure you get the best
                    quality at affordable prices.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <LocalShippingOutlined />
                </div>
                <div className="value-info">
                  <h3>Quick Delivery</h3>
                  <p>
                    Fast and reliable delivery service to get your orders to you
                    as soon as possible.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <SupportAgentOutlined />
                </div>
                <div className="value-info">
                  <h3>Customer Satisfaction</h3>
                  <p>
                    Your happiness is our priority. We're committed to providing
                    excellent service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-content">
              <div className="stats-text">
                <h2>Our Journey So Far</h2>
                <p>
                  ShopEasy has grown tremendously since our launch, serving
                  thousands of happy customers across India. Our commitment to
                  quality, affordability, and excellent service has made us a
                  trusted name in online shopping.
                </p>
              </div>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">Products</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50,000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-icon">
                <FavoriteOutlined />
              </div>
              <h2>Our Mission</h2>
              <p>
                To create the most convenient and reliable online shopping
                platform where customers can find everything they need at
                competitive prices, backed by exceptional customer service and a
                seamless shopping experience that brings joy to every purchase.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
