import React, { useEffect } from "react";
import "./customer-speak-page.styles.scss";

import CustomerReviewCard from "../customer-review-card/CustomerReviewCard.component";

// actions
import { getCustomerSpeaksComments } from "./../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

export default function CustomerSpeakPage() {
  const dispatch = useDispatch();

  const customerComments = useSelector(
    (state) => state.home.customerSpeaksComments
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCustomerSpeaksComments());
  }, []);

  return (
    <div className="customer-speaks">
      <h1 className="main-title">Customer Speaks</h1>
      <p className="page-desc">
        We love to hear from you just email us with whatever you'd like to share
        – whether it’s feedback on our products, customer service.
      </p>
      <div className="content">
        {customerComments &&
          customerComments.map((comment, index) => (
            <CustomerReviewCard key={index} comment={comment} />
          ))}

        <CustomerReviewCard />
      </div>
    </div>
  );
}
