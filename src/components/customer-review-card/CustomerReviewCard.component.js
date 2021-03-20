import React from "react";
import "./custom-review-card.styles.scss";

import ReactHtmlParser from "react-html-parser";

// react icons
import { BsStarFill } from "react-icons/bs";

// making rating stars
function generateStars(numberOfStars) {
  const stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(
      <span className="icon" key={i}>
        <BsStarFill />
      </span>
    );
  }
  return stars;
}

export default function CustomerReviewCard({ comment = {} }) {
  return (
    <div className="customer-review-card">
      <div className="stars">
        {comment.rate ? generateStars(comment.rate) : null}
        {/* <span className="icon">
          <BsStarFill />
        </span>
        <span className="icon">
          <BsStarFill />
        </span>
        <span className="icon">
          <BsStarFill />
        </span> */}
      </div>

      <div className="review-text">
        {comment.message
          ? ReactHtmlParser(comment.message)
          : ReactHtmlParser(comment.comment)}
      </div>
      <div className="review-owner-name">
        {comment.name ? comment.name : comment.userName}
      </div>
      <div className="review-date">{comment ? comment.date : ""} </div>
    </div>
  );
}
