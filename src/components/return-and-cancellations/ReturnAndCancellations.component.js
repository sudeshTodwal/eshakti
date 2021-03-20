import React, { useEffect } from "react";
import "./returnAndCancellations.styles.scss";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react icons
import { IoMdArrowDropright } from "react-icons/io";

// html parser
import ReactHtmlParser from "react-html-parser";

export default function ReturnAndCancellations() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);

  function fetchData() {
    dispatch(getPages());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  let filtered, returnAndCancellation;

  // checking if privacy policy data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "orders"
    );

    // find ou data for affilate program page
    returnAndCancellation = filtered[0].page.filter(
      (each) => each.page_name === "Returns & Refunds"
    );
    returnAndCancellation = returnAndCancellation[0].contents;
  }

  // if affilate page content exist return this html

  if (returnAndCancellation) {
    return ReactHtmlParser(returnAndCancellation);
  }

  return (
    <div className="return-and-cancellations">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
