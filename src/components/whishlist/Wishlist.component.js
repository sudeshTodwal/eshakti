import React, { useEffect } from "react";
import "./wishlist.styles.scss";

import ProductCard from "../productCard/ProductCard.component";

// react icons
import { BsHeartFill } from "react-icons/bs";

import { getWishList } from "../../store/home/homeAction";

// react redux
import { useSelector, useDispatch } from "react-redux";

export default function Wishlist() {
  const whishlist = useSelector((state) => state.home.userWishList);
  const dispatch = useDispatch();

  useEffect(() => {
    const userID = localStorage.getItem("es_user_id");
    dispatch(getWishList(userID));
  }, []);

  // console.log(whishlist.home.userWishList, "data");
  return (
    <div className="wishlist">
      <div className="inner-container">
        <h2 className="wishlist-title">Your Wishlist</h2>

        <div className="listing">
          {Array.isArray(whishlist) && whishlist.length ? (
            whishlist.map((eachProduct, index) => (
              <div className="item" key={index}>
                <span className="heartIcon">
                  <BsHeartFill />
                </span>
                <ProductCard product={eachProduct} />
              </div>
            ))
          ) : (
            <h4 className="no-items">No Items in your whishlist</h4>
          )}
        </div>
      </div>
    </div>
  );
}
