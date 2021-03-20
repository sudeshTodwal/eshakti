import React, { useEffect } from "react";
import "./how-it-works.styles.scss";

// react icons
import { FiPlayCircle } from "react-icons/fi";
// react router link
import { Link } from "react-router-dom";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// html parser
import ReactHtmlParser from "react-html-parser";

export default function HowItWorks() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);
  function fetchData() {
    dispatch(getPages());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  let filtered, howItWorks;

  // checking if privacy policy data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "about"
    );

    // find ou data for affilate program page
    howItWorks = filtered[0].page.filter(
      (each) => each.page_name === "How Customization Works"
    );
    howItWorks = howItWorks[0].contents;
  }

  // if affilate page content exist return this html

  if (howItWorks) {
    return ReactHtmlParser(howItWorks);
  }

  return (
    <div className="how-it-works">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
