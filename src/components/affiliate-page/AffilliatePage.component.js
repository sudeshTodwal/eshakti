import React, { useEffect } from "react";
import "./affilliatePage.styles.scss";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react router
import { Link } from "react-router-dom";

// html parser
import ReactHtmlParser from "react-html-parser";

export default function AffilliatePage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);

  function fetchData() {
    dispatch(getPages());
  }

  let filtered, affiliatePage;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  // checking if affiliate data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "partner"
    );

    // find ou data for affilate program page
    affiliatePage = filtered[0].page.filter(
      (each) => each.page_name === "Affiliate Program"
    );
    affiliatePage = affiliatePage[0].contents;
  }

  // if affilate page content exist return this html

  if (affiliatePage) {
    return ReactHtmlParser(affiliatePage);
  }

  return (
    <div className="affilliate-page">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
