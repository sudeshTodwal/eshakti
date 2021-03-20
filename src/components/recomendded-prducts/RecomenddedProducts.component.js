import React, { useState } from "react";
import "./recomenddedProducts.styles.scss";

// react slidy for slider
import ReactSlidy from "react-slidy";
import "react-slidy/lib/index.scss";

export default function RecomendedProducts({
  openRecomendedPopup,
  items,
  matchedProduct,
}) {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="recommended-products">
      <div className="title">Recommeded Products</div>
      <ReactSlidy numOfSlides={3} sanitize={false}>
        {matchedProduct && matchedProduct.length > 0
          ? matchedProduct.map((product) => (
              <div className="recommended-item">
                <img
                  src={
                    product.product_thumbnail && product.product_thumbnail[0]
                  }
                  alt="technical"
                />
                <div className="details">
                  <div className="top">
                    <input
                      type="checkbox"
                      value="hello"
                      onChange={(e) => setSelectedItem(e.target.value)}
                    />
                    <div className="old-price">${product.total_price}</div>
                    <div className="new-price">${product.total_price}</div>
                  </div>
                  <div className="bottom">
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            ))
          : null}

        {/* <div className="recommended-item">
          <img
            src="https://img1.eshakti.com/clothimages/CL0082009MP.jpg"
            alt="technical"
          />
          <div className="details">
            <div className="top">
              <input
                type="checkbox"
                value="hello"
                onChange={(e) => setSelectedItem(e.target.value)}
              />
              <div className="old-price">$23</div>
              <div className="new-price">$20</div>
            </div>
            <div className="bottom">
              <span>View Details</span>
            </div>
          </div>
        </div>
        <div className="recommended-item">
          <img
            src="https://img1.eshakti.com/clothimages/CL0082009MP.jpg"
            alt="technical"
          />
          <div className="details">
            <div className="top">
              <input
                type="checkbox"
                value="hello"
                onChange={(e) => setSelectedItem(e.target.value)}
              />
              <div className="old-price">$23</div>
              <div className="new-price">$20</div>
            </div>
            <div className="bottom">
              <span onClick={openRecomendedPopup}>View Details</span>
            </div>
          </div>
        </div>
        <div className="recommended-item">
          <img
            src="https://img1.eshakti.com/clothimages/CL0082009MP.jpg"
            alt="technical"
          />
          <div className="details">
            <div className="top">
              <input
                type="checkbox"
                value="hello"
                onChange={(e) => setSelectedItem(e.target.value)}
              />
              <div className="old-price">$23</div>
              <div className="new-price">$20</div>
            </div>
            <div className="bottom">
              {" "}
              <span>View Details</span>
            </div>
          </div>
        </div>
        <div className="recommended-item">
          <img
            src="https://img1.eshakti.com/clothimages/CL0082009MP.jpg"
            alt="technical"
          />
          <div className="details">
            <div className="top">
              <input
                type="checkbox"
                value="hello"
                onChange={(e) => setSelectedItem(e.target.value)}
              />
              <div className="old-price">$23</div>
              <div className="new-price">$20</div>
            </div>
            <div className="bottom">
              <span>View Details</span>
            </div>
          </div>
        </div> */}
      </ReactSlidy>
    </div>
  );
}
