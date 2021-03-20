import React, { useEffect } from "react";
import "./eshakti-sizes.styles.scss";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// html parser
import ReactHtmlParser from "react-html-parser";

export default function EshaktiSizes() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);

  function fetchData() {
    dispatch(getPages());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  let filtered, eshaktiSizes;

  // checking if privacy policy data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "about"
    );

    // find ou data for affilate program page
    eshaktiSizes = filtered[0].page.filter(
      (each) => each.page_name === "Size Chart"
    );
    eshaktiSizes = eshaktiSizes[0].contents;
  }

  // if affilate page content exist return this html
  if (eshaktiSizes) {
    return ReactHtmlParser(eshaktiSizes);
  }

  return (
    <div className="eshakti-sizes">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
