import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "../user-profile/UserProfile.component";
import OrderHistoryList from "../orderhistory/OrderHistoryList.component";
import ManageAddress from "../manage-address/ManageAddress.component";
import OrderDetailsPage from "../order-details-page/OrderDetailsPage.component";
import MyAccount from "./MyAccount.component";

export default function MyAccountRoutes() {
  return (
    <div>
      <MyAccount>
        <Route exact path="/my-account/account" component={UserProfile} />
        <Route
          exact
          path={`/my-account/my-orders`}
          component={OrderHistoryList}
        />
        <Route
          exact
          path={`/my-account/manage-address`}
          component={ManageAddress}
        />
        <Route
          exact
          path="/my-account/order-details/:orderId"
          component={OrderDetailsPage}
        />
      </MyAccount>
    </div>
  );
}
