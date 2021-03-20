import React, { useState } from "react";
import "./productTabList.scss";
import CustomerReviewCard from "../customer-review-card/CustomerReviewCard.component";

export default function ProductTabList({
  productDetail,
  reviews,
  additionalInfo,
}) {
  const [currentTab, setCurrectTab] = useState(1);

  return (
    <div className="tabs-main-wrapper">
      <div className="tabs-header">
        <div className="tab-absolute">
          <div
            className={`tab ${currentTab === 1 ? "active" : null}`}
            onClick={() => setCurrectTab(1)}
          >
            Description
          </div>
          <div
            className={`tab ${currentTab === 2 ? "active" : null}`}
            onClick={() => setCurrectTab(2)}
          >
            Additional Information
          </div>
          <div
            className={`tab ${currentTab === 3 ? "active" : null}`}
            onClick={() => setCurrectTab(3)}
          >
            Reviews {`(${reviews !== undefined ? reviews.length : 0})`}
          </div>
        </div>
      </div>
      <div className="tabs-content">
        {currentTab === 1 ? (
          productDetail ? (
            <p dangerouslySetInnerHTML={{ __html: productDetail }}></p>
          ) : (
            <div>no data available yet</div>
          )
        ) : null}

        {currentTab === 2 ? (
          additionalInfo !== undefined ? (
            additionalInfo.length > 0 ? (
              additionalInfo.map((eachDetail, index) => (
                <p className="each-additional" key={index}>
                  {eachDetail.name}:- {eachDetail.value}
                </p>
              ))
            ) : (
              <div> no data available yet</div>
            )
          ) : null
        ) : null}
        {currentTab === 3 ? (
          <div className="reviews">
            {reviews !== undefined ? (
              reviews.length > 0 ? (
                reviews.map((eachComment, index) => (
                  <CustomerReviewCard key={index} comment={eachComment} />
                ))
              ) : (
                <div className="no-data-available"> no data available yet</div>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
