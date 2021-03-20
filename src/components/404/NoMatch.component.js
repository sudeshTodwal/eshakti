import React from "react";
import "./noMatch.styles.scss";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div className="no-match">
      <div className="text">
        <h2 className="title-text">404</h2>
        <div className="no-match-text">
          The page you requested does not exist or has moved
        </div>

        <Link className="go-to-home" to="/">
          Go Back To Home
        </Link>
      </div>
    </div>
  );
}
