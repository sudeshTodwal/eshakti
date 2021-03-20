import React, { useState } from "react";
import "./searchPopup.styles.scss";

// react modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// react-redux
import { useDispatch, useSelector } from "react-redux";

import { searchProduct } from "../../store/home/homeAction";

// react icons
import { AiOutlineSearch, AiOutlineCloseSquare } from "react-icons/ai";
import ProductCard from "../productCard/ProductCard.component";
import { Link } from "react-router-dom";

export default function SearchPopup({ open, onClose }) {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");
  const searchedProducts =
    useSelector((state) => state.home.searchedProducts) || [];

  function onChangeInput(e) {
    setInputVal(e.target.value);
    dispatch(searchProduct({ pname: e.target.value }));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      classNames={{ modal: "search-popup-modal" }}
    >
      <div className="search-popup">
        <div className="search-input">
          <div className="input">
            <input
              type="text"
              placeholder="search any product"
              className="searchbox"
              onChange={onChangeInput}
            />
            <span className="search-icon" onClick={() => onClose()}>
              <Link to={`/search?keywords=${inputVal}`}>
                <AiOutlineSearch />
              </Link>
            </span>
          </div>
        </div>

        <div className="searched-items">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((eachProduct, index) => (
              <div key={index} onClick={onClose}>
                <ProductCard product={eachProduct} />
              </div>
            ))
          ) : (
            <h3>no searched products</h3>
          )}
        </div>
      </div>
    </Modal>
  );
}
