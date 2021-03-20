import React, { useState } from "react";
import "./search.styles.scss";

// react-redux
import { useDispatch, useSelector } from "react-redux";

import { searchProduct } from "../../store/home/homeAction";

// react icons
import { AiOutlineSearch, AiOutlineCloseSquare } from "react-icons/ai";
import ProductCard from "../productCard/ProductCard.component";

// react router
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const dispatch = useDispatch();
  let query = useQuery();
  const [inputVal, setInputVal] = useState(query.get("keywords"));
  const searchedProducts =
    useSelector((state) => state.home.searchedProducts) || [];

  function onChangeInput(e) {
    setInputVal(e.target.value);
  }

  function onClick() {
    dispatch(searchProduct({ pname: inputVal }));
  }

  return (
    <div className="search-page">
      <div className="search-input">
        <div className="input">
          <input
            type="text"
            placeholder="search any product"
            className="searchbox"
            onChange={onChangeInput}
          />
          <span className="search-icon" onClick={onClick}>
            <AiOutlineSearch />
          </span>
        </div>
      </div>

      <h4 className="search-text">Keywords : {inputVal}</h4>

      <div className="searched-items">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((eachProduct, index) => (
            <ProductCard product={eachProduct} key={index} />
          ))
        ) : (
          <h4 className="no-result">No results</h4>
        )}
      </div>
    </div>
  );
}
