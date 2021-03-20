import React, { useEffect } from "react";
import "./shipping-and-payment.styles.scss";

import { IoMdArrowDropright } from "react-icons/io";

// actions
import { getPages } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

// html parser
import ReactHtmlParser from "react-html-parser";

export default function ShippingAndPayment() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home.staticPages);

  function fetchData() {
    dispatch(getPages());
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  let filtered, paymentAndShippingContent;

  // checking if privacy policy data exist in state
  if (state !== undefined) {
    // filter data with the name of partner
    filtered = state.filter(
      (each) => each.page_group.toLowerCase() === "orders"
    );

    // find ou data for affilate program page
    paymentAndShippingContent = filtered[0].page.filter(
      (each) => each.page_name === "Payments & Shipping"
    );
    paymentAndShippingContent = paymentAndShippingContent[0].contents;
  }

  // if affilate page content exist return this html
  if (paymentAndShippingContent) {
    return ReactHtmlParser(paymentAndShippingContent);
  }

  return (
    <div className="shipping-and-payment">
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
