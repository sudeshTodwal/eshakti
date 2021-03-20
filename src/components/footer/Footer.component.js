import React from "react";
import "./footer.styles.scss";

// react router
import { Link } from "react-router-dom";

import { FaGreaterThan, FaVimeoV, FaPinterest } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdWatchLater } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { IoIosSend, IoIosArrowForward } from "react-icons/io";

export default function Footer() {
  return (
    <div className="footer">
      <div className="inner_container">
        <div className="order common">
          <h4>Order</h4>
          <ul>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/payment-and-shipping">Shipping and Payment</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/return-and-cancellation">Return and Refunds</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/privacy-policy">Privacy And Policy</Link>
            </li>
          </ul>
        </div>
        <div className="partner common">
          <h4>Partner</h4>
          <ul>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/become-affilliate">Affilliate Program</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/whole-sale">Wholesale</Link>
            </li>
          </ul>
        </div>
        <div className="about common">
          <h4>About</h4>
          <ul>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/about-us">eShakti</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/how-it-works">How Customisation works</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/eshakti-sizes">Size Chart</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/media-speaks">Media Speaks</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/customers-speaks"> Customers Speaks</Link>
            </li>
            <li>
              <span className="right_arrow_icon">
                <IoIosArrowForward />
              </span>
              <Link to="/how-to-measure"> How to Measure</Link>
            </li>
          </ul>
        </div>
        <div className="contact common">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <span className="icon phone">
                <FiPhone />
              </span>
              <span className="text">852 854 987</span>
            </li>
            <li>
              <span className="icon watch">
                <MdWatchLater />
              </span>
              <span className="text">(Mon-Fri 8am to 4pm PST)</span>
            </li>

            <li className="social_icons">
              <span className="social_icon">
                <FiFacebook />
              </span>
              <span className="social_icon">
                <AiOutlineTwitter />
              </span>
              <span className="social_icon">
                <FaVimeoV />
              </span>
              <span className="social_icon">
                <FaPinterest />
              </span>
            </li>
          </ul>
          <div className="newsletter">
            <h4>Newsletter</h4>
            <div className="input_box">
              <input type="input" placeholder="Enter Your Email" />
              <button>
                <span>
                  <IoIosSend />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
