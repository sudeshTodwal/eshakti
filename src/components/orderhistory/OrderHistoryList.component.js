import React, { useEffect } from "react";

import { getOrdersList } from "../../store/home/homeAction";

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// react-cookies
import { useCookies } from "react-cookie";

export default function OrderHistoryList() {
  // using action dispatcher and selector to get and set state
  const dispatch = useDispatch();

  const [cookies] = useCookies();
  const currencyRates = useSelector((state) => state.home.currencyRates);

  const userOrdersList = useSelector((state) => state.home.userOrdersList);

  const userId = localStorage.getItem("es_user_id");

  useEffect(() => {
    dispatch(getOrdersList(userId));
  }, []);

  console.log(userOrdersList, "userorders");

  if (userOrdersList === undefined) {
    return (
      <div className="my-orders-slot">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  function getConvertedPrice(pricetoconvert) {
    const userSelectedCurrency = cookies.userSelectedCurrency;
    const baseCurrency = "USD";
    const rates = currencyRates && currencyRates.currencyRates;

    if (
      baseCurrency === userSelectedCurrency &&
      userSelectedCurrency !== undefined
    ) {
      return pricetoconvert + " $";
    }

    if (userSelectedCurrency !== undefined) {
      const filterdRate =
        rates &&
        rates.filter(
          (eachRate) => eachRate.currencyCode === userSelectedCurrency
        );

      return `${(filterdRate[0].currencyValue * pricetoconvert).toFixed(2)} ${
        filterdRate[0].currencySymbol
      }`;
    }
    return pricetoconvert + " $";
  }

  return (
    <>
      <div className="my-orders-slot">
        <p className="info-side-title">My orders</p>
        {userOrdersList && userOrdersList.length > 0 ? (
          userOrdersList.map((order, index) => (
            <div className="each-order" key={index}>
              {/* <div className="img-and-common-details">
                <div className="order-img">
                  <img
                    width={150}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFvT5KiIRBpnM2L6FAAaSioCofkvQML1IIA&usqp=CAU"
                    alt=""
                  />
                </div>
              </div> */}
              <div className="details">
                <div className="common-details">
                  <div className="name common-title-text">Order ID</div>

                  <div className="orderId">#{order.order_id}</div>
                </div>
                <div className="order-date">
                  <span className="ordered-title-text common-title-text">
                    Ordered On
                  </span>
                  <span className="value-text">
                    {" "}
                    {order.created_at && order.created_at.slice(0, 10)}
                  </span>
                </div>
                <div className="price">
                  {" "}
                  <span className="price-title-text common-title-text">
                    Price
                  </span>
                  <div className="value-text">
                    {getConvertedPrice(order.total_price)}
                  </div>
                </div>
                <div className="status">
                  {" "}
                  <span className="common-title-text">Status</span>
                  <div className="status">{order.status}</div>
                </div>
                <div className="view-order-btn">
                  {" "}
                  <Link to={`/my-account/order-details/${order.id}`}>
                    <div className="details-btn">View Order</div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-order-history-text">
            <h4>You don't have any order History</h4>
            <Link to="/" className="link ">
              <button className="back-to-shop-btn"> Back to shopping</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
