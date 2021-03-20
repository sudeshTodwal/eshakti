import React, { useEffect } from "react";
import "./about-us.styles.scss";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// html parser
import ReactHtmlParser from "react-html-parser";

// our custom components
import CustomerReviewCard from "../customer-review-card/CustomerReviewCard.component";

export default function AboutUs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);

  function fetchData() {
    dispatch(getPages());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  let filtered, aboutUs;

  // checking if privacy policy data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "about"
    );

    // find ou data for affilate program page
    aboutUs = filtered[0].page.filter((each) => each.page_name === "eshakti");
    aboutUs = aboutUs[0].contents;
  }

  // if affilate page content exist return this html

  if (aboutUs) {
    return ReactHtmlParser(aboutUs);
  }

  return (
    <div className="about-us">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
