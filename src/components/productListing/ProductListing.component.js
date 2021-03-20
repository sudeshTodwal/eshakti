import React from "react";
import "./productListing.styles.scss";

// importing react router
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// html parser
import ReactHtmlParser from "react-html-parser";

//product card component
import ProductCard from "../productCard/ProductCard.component";

export default function ProductListing({ title, description, products }) {
  return (
    <div className="product_listing">
      <div className="inner-container">
        <div className="heading_text">
          <h2 className="title">{title}</h2>
          <div className="description">{ReactHtmlParser(description)}</div>
        </div>
        <div className="products">
          {products.map((eachProduct, index) => (
            <ProductCard key={index} product={eachProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
