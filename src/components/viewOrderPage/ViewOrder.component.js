import React from "react";

export default function ViewOrder() {
  return (
    <div className="view-order">
      <div className="page-title">
        <h3 className="order-info">Order Info</h3>
        <div className="main-content">
          <div className="order-summery">
            <div className="title">Your Order summary</div>
            <div className="content">
              <div className="date"></div>
              <div className="order-number"></div>
              <div className="order-total"></div>
              <div className="delivery-address"></div>
            </div>
          </div>

          <div className="products">
            <div className="eachproduct">
              <div className="product-image">
                <img
                  src="http://eshakti.ewtlive.in/dashboard/product/thumbnail/601940228241a1.jpg"
                  alt=""
                />
              </div>
              <div className="product-details">
                Ottoman Rib-Knit Two-Tone Stripe Dress
              </div>
              <div className="product-unit-price">40.00</div>
              <div className="product-qty">2</div>
              <div className="product-subtotal">203.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
