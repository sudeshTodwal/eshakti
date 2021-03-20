import React from "react";
import "./news-card.styles.scss";

import { Link } from "react-router-dom";

export default function NewsCard() {
  return (
    <div className="news-card">
      <div className="card-img">
        <div
          className="img"
          style={{
            backgroundImage: `url("https://img1.eshakti.com/bannerimages/6link.png")`,
          }}
        ></div>
      </div>
      <div className="date-and-company">
        <div className="date">March 25, 2019</div>
        <div className="company">
          <div
            className="img"
            style={{
              backgroundImage: `url(
                  "https://img1.eshakti.com/bannerimages/6logo.jpg?v=2"
                )`,
            }}
          ></div>
        </div>
      </div>
      <div className="title">
        A CUSTOMIZED DRESS -- WITH POCKETS? COMING RIGHT UP, FROM ESHAKTI
      </div>
      <div className="description">
        If you’ve ever waited eagerly for the UPS guy to deliver your new outfit
        -- only to find the dress that looked so gorgeous on the web is the
        wrong color for your complexion, and too tight besides -- you’ll
        understand the appeal of eShakti.
      </div>
      <div className="read-more">
        <Link to="/" className="link">
          Read more
        </Link>
      </div>
    </div>
  );
}
