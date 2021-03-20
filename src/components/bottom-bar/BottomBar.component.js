import React from "react";
import "./bottomBar.styles.scss";
import PaymentAcceptedImg from "../../assets/images/payments.png";

export default function BottomBar() {
  return (
    <div className="bottom_bar">
      <div className="inner_area">
        <div className="copyright_text">
          <span className="copyright_icon"> &copy;</span>
          copyright 2021 All rights are reserved
        </div>
        <div className="payment">
          <img src={PaymentAcceptedImg} alt="payment accepted" />
        </div>
      </div>
    </div>
  );
}
