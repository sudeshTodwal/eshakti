import React, { useEffect } from "react";
import "./orderDetailsPage.styles.scss";
import { getOrderDetails } from "../../store/home/homeAction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  const orderDetails = useSelector((state) => state.home.order_details);
  console.log(orderDetails);

  if (orderDetails !== undefined) {
    return (
      <div className="order-details">
        <div className="top-bar">
          <div className="order-id">Order ID : {orderDetails.order_id} </div>
          <div className="date">{orderDetails.created_at}</div>
          <div className="download-invoice">
            <button>
              <span>Download Invoice</span>
            </button>
          </div>
        </div>
        <div className="order-details-content">
          <div className="left">
            <div className="user-details common">
              <h4>USER DETAILS</h4>
              <ul>
                <li className="name">
                  <span className="key">Name : </span>
                  <span className="value">
                    {orderDetails.shipping_address.name}
                  </span>
                </li>
                <li className="phone">
                  <span className="key">Phone : </span>
                  <span className="value">
                    {orderDetails.shipping_address.phone}
                  </span>
                </li>
                <li>
                  <span className="key">AlterNate : </span>
                  <span className="value">
                    {orderDetails.shipping_address.alternate_phone}
                  </span>
                </li>
              </ul>
            </div>

            <div className="address-details common">
              <h4>Billing Address</h4>
              <ul>
                <li className="address">
                  <span className="key">Address : </span>
                  <span className="value">
                    {orderDetails.shipping_address.billing_address}
                  </span>
                </li>
                <li className="address">
                  <span className="key">Address2 : </span>
                  <span className="value">
                    {orderDetails.shipping_address.billing_address2}
                  </span>
                </li>

                <li className="phone">
                  <span className="key">Phone : </span>
                  <span className="value">
                    {orderDetails.shipping_address.billing_phone}
                  </span>
                </li>
                <li className="alternative-phone">
                  <span className="key">Alternate :</span>
                  <span className="value">
                    {" "}
                    {orderDetails.shipping_address.alternate_phone}
                  </span>
                </li>
              </ul>
            </div>

            <div className="address-details common">
              <h4>Shipping ADDRESS</h4>
              <ul>
                <li className="address">
                  <span className="key">Address : </span>
                  <span className="value">
                    {orderDetails.shipping_address.address}
                  </span>
                </li>
                <li className="address">
                  <span className="key">Address : </span>
                  <span className="value">
                    {orderDetails.shipping_address.address2}
                  </span>
                </li>
                <li className="phone">
                  <span className="key">Phone : </span>
                  <span className="value">
                    {" "}
                    {orderDetails.shipping_address.billing_phone}
                  </span>
                </li>
                <li className="alternative-phone">
                  <span className="key">Alternate : </span>
                  <span className="value">
                    {orderDetails.shipping_address.alternate_phone}
                  </span>
                </li>
              </ul>
            </div>

            <div className="payment-details common">
              <h4>PAYMENT DETAILS</h4>
              <ul>
                <li className="subtotal">
                  <span className="key">Sub Total : </span>
                  <span className="value">25$</span>
                </li>
                <li className="discount-amount">
                  <span className="key">Discount: </span>
                  <span className="value">2$</span>
                </li>
                <li className="alternative-phone">
                  <span className="key">Shipping Charges : </span>
                  <span className="value"> 23$</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right">
            {orderDetails.order_item.map((eachItem, index) => (
              <div className="cart-product-card" key={index}>
                <div className="inner-container">
                  <div className="product-img">
                    <img src={eachItem.thumbnail} alt="img" />
                  </div>
                  <div className="product-details">
                    <div className="product-name">
                      <p className="primary-text">{eachItem.product_name}</p>
                      <p className="variations">
                        {eachItem.customized_attribute !== undefined &&
                        eachItem.customized_attribute !== null ? (
                          <span className="eachVariation">
                            <b>Bottom Style </b>:{" "}
                            {eachItem.customized_attribute.bottom_style}{" "}
                          </span>
                        ) : null}

                        {eachItem.customized_attribute !== undefined &&
                        eachItem.customized_attribute !== null ? (
                          <span className="eachVariation">
                            <b> Neck Style </b>:{" "}
                            {eachItem.customized_attribute.neck_style}
                          </span>
                        ) : null}

                        {eachItem.customized_attribute !== undefined &&
                        eachItem.customized_attribute !== null ? (
                          <span className="eachVariation">
                            <b>Sleeve Style </b>:{" "}
                            {eachItem.customized_attribute.sleeve_style}
                          </span>
                        ) : null}

                        {/* attributes for single product */}
                        {eachItem.product_attribute.length > 0 &&
                        eachItem.product_attribute.length !== undefined &&
                        eachItem.product_attribute.length !== null
                          ? eachItem.product_attribute.map(
                              (eachAttr, index) => (
                                <p className="variations">
                                  <span className="eachVariation" key={index}>
                                    {" "}
                                    <b>{eachAttr.attribute_name}</b> :{" "}
                                    {eachAttr.attribute_value}{" "}
                                  </span>
                                </p>
                              )
                            )
                          : null}
                      </p>
                    </div>
                    <div className="price">
                      {orderDetails.currency_sign}
                      {eachItem.total_price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="order-details"></div>;
  }
}
