import React from "react";
import "../componentStyles/Footer.css";
import {
  Phone,
  Mail,
  Instagram,
  LinkedIn,
  YouTube,
  Facebook,
} from "@mui/icons-material";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" />
            Phone: +91 9123456789
          </p>
          <p>
            <Mail fontSize="small" />
            Email: shopeasy780@gmail.com
          </p>
        </div>

        {/* Section2 */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="" target="_blank">
              <Facebook className="social-icon" />
            </a>
            <a href="" target="_blank">
              <Instagram className="social-icon" />
            </a>
            <a href="" target="_blank">
              <LinkedIn className="social-icon" />
            </a>
            <a href="" target="_blank">
              <YouTube className="social-icon" />
            </a>
          </div>
        </div>

        {/* Section3 */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to <b>Shopeasy - where smart shopping starts!</b>
            <br />
            At ShopEasy, we aim to make your online shopping experience easy,
            fast, and reliable. From fashion and electronics to home essentials
            and more, we bring you a wide range of quality products at
            affordable prices. With secure payments, quick delivery, and
            friendly support, ShopEasy is your go-to destination for everything
            you need - all in one place.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; ShopEasy-All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
