import React, { useState, useEffect } from "react";
import "./my-account.styles.scss";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// react redux
import { useSelector } from "react-redux";

export default function MyAccount({ children }) {
  const state = useSelector((state) => state);

  return (
    <div className="my-account">
      <div className="inner-container">
        <div className="navigation">
          <h4 className="navigation-title">My Account</h4>
          <div className="nav-list-container">
            <div className="nav-list">
              <Link to={`/my-account/account`} className="link">
                Profile
              </Link>
              <Link to={`/my-account/my-orders`} className="link">
                My Orders
              </Link>
              <Link to={`/my-account/manage-address`} className="link">
                Manage Address
              </Link>
            </div>
          </div>
        </div>
        <div className="info-side">{children}</div>
      </div>
    </div>
  );
}
