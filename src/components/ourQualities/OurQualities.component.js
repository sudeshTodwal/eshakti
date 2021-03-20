import React from "react";
import "./ourQualities.styles.scss";

// react icons
import { FiTruck } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { AiOutlineTag } from "react-icons/ai";
import { MdPayment } from "react-icons/md";

export default function OurQualities() {
  return (
    <div className="our_qualities">
      <div className="inner_container">
        <div className="shipping">
          <div className="icon">
            <FiTruck />
          </div>
          <div className="description">
            <h4>free shipping</h4>
            <p>Free shipping over all the local area order above 200$</p>
          </div>
        </div>
        <div className="return">
          <div className="icon">
            <BiLike />
          </div>
          <div className="description">
            <h4>30 Days Return</h4>
            <p>Free shipping over all the local area order above 200$</p>
          </div>
        </div>
        <div className="support">
          <div className="icon">
            <AiOutlineTag />
          </div>
          <div className="description">
            <h4>24/7 Support</h4>
            <p>Free shipping over all the local area order above 200$</p>
          </div>
        </div>
        <div className="payment">
          <div className="icon">
            <MdPayment />
          </div>
          <div className="description">
            <h4>Secure Payment</h4>
            <p>Free shipping over all the local area order above 200$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
