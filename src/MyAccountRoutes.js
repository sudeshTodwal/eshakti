import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyAccount from "./components/myAccount-page/MyAccount.component";
import UserProfile from "./components/user-profile/UserProfile.component";
import OrderHistoryList from "./components/orderhistory/OrderHistoryList.component";
import ManageAddress from "./components/manage-address/ManageAddress.component";
import OrderDetailsPage from "./components/order-details-page/OrderDetailsPage.component";

export default class MyAccountRoutes extends Component {
  render() {
    return (
      <div>
        <MyAccount>
          <Route
            exact
            path={`/my-account/my-profile`}
            render={() => <UserProfile />}
          />

          <Route
            exact
            path={`/my-account/my-orders`}
            render={() => <OrderHistoryList />}
          />
          <Route
            exact
            path={`/manage-address`}
            render={() => <ManageAddress />}
          />
          <Route
            exact
            path="/order-details/:orderId"
            render={() => <OrderDetailsPage />}
          />
        </MyAccount>
      </div>
    );
  }
}
