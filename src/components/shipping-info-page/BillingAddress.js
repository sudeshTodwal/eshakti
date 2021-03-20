import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCart,
  removeCart,
  placeOrder,
  getCountryList,
  getStateList,
  getCityList,
  getShippingChargesList,
} from "../../store/home/homeAction";
import "./shippingInfopage.styles.scss";

import { Link } from "react-router-dom";
import CartProductCard from "../cart-product-card/CartProductCard.component";
import FormInput from "../form-input/FormInput.component";
import SelectFormElement from "../select-form-element/SelectFormElement.component";
import { ToastContainer, toast } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";

export default function BillingAddress({
  setBillingName,
  setBillingPhone,
  setBillingAlternate_phone,
  setBillingAddress,
  setBillingAddress_type,
  setBillingCity,
  setBillingCountry,
  setBillingState,
  setBillingZip_code,
  setBillingLandmark,
  setBillingShipping_id,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternate_phone, setAlternate_phone] = useState("");
  const [address, setAddress] = useState("");
  const [address_type, setAddress_type] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [landmark, setLandmark] = useState("");
  const [shipping_id, setShipping_id] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cart = useSelector((state) => state.home.cart);
  const countryList = useSelector((state) => state.home.countryList);

  const stateList = useSelector((state) => state.home.stateList);
  const cityList = useSelector((state) => state.home.cityList);
  const shippingChargesList = useSelector(
    (state) => state.home.shippingChargesList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCountryList());

    // dispatch(getCityList());
    dispatch(getShippingChargesList());
  }, []);

  const updateQunitity = (type, cart_id) => {
    let quantity;
    if (type === "add") {
      for (let i = 0; i < cart.length; i++) {
        if (cart_id === cart[i].cart_id) {
          quantity = cart[i].quantity + 1;
        }
      }
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart_id === cart[i].cart_id) {
          if (cart[i].quantity > 1) {
            quantity = cart[i].quantity - 1;
          }
        }
      }
    }
    let data = {
      quantity: quantity,
    };
    dispatch(updateCart(data, cart_id));
  };

  const cartGrandTotal = () => {
    let total = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
      }
    }
    return total;
  };

  const onPlaceOrder = (e) => {
    e.preventDefault();
    let cart_id = [];
    if (!cart.length > 0) {
      toast("Your cart is empty!", {
        type: toast.TYPE.ERROR,
        autoClose: 10000,
      });
      return false;
    }
    for (let i = 0; i < cart.length; i++) {
      cart_id.push(cart[i].cart_id);
    }

    let shipping_charge = 0;

    for (let i = 0; i < shippingChargesList.length; i++) {
      if (shipping_id == shippingChargesList[i].id) {
        shipping_charge = shippingChargesList[i].cost;
      }
    }

    let data = {
      totPrice: cartGrandTotal(),
      user_id: localStorage.getItem("es_user_id"),
      shipping_charge: shipping_charge,
      customization_charge: 0,
      cart_id: cart_id,
      shipping_address: {
        name: name,
        phone: phone,
        alternate_phone: alternate_phone,
        address: address,
        address2: address,
        address_type: address_type,
        city: city,
        country: country,
        state: state,
        zip_code: zip_code,
        landmark: landmark,
      },
      payment: {
        mode: "COD",
        status: "Unpaid",
      },
    };

    dispatch(placeOrder(data));
  };

  const selectCountry = (e) => {
    setCountry(e.target.value);
    setBillingCountry(e.target.value);
    dispatch(getStateList(e.target.value));
  };
  const selectState = (e) => {
    setState(e.target.value);
    setBillingState(e.target.value);
    dispatch(getCityList(e.target.value));
  };
  const selectCity = (e) => {
    setCity(e.target.value);
    setBillingCity(e.target.value);
  };
  const selectPincode = (e) => {
    setZip_code(e.target.value);
    setBillingZip_code(e.target.value);
    let data = {
      country_id: country,
      state_id: state,
      city_id: city,
      postal_code: e.target.value,
    };
    dispatch(getShippingChargesList(data));
  };
  const selectCharges = (e) => {
    setShipping_id(e.target.value);
    setBillingShipping_id(e.target.value);
  };
  return (
    <div>
      <div className="mid-title">
        <h2 className="title-text">Billing Address</h2>
      </div>

      <div className="inline-form-shipping-address">
        <FormInput
          type="text"
          placeholder="Full Name"
          className={"firstName"}
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setBillingName(e.target.value);
          }}
          required
        />
        {/* <FormInput
                  type={"text"}
                  placeholder={"Last Name"}
                  className="lastName"
                  name={"lastName"}
                /> */}
      </div>

      <FormInput
        type={"text"}
        placeholder={"Apartment, Suit, etc"}
        className="residency"
        name="address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setBillingAddress(e.target.value);
        }}
        required
      />
      {/* <FormInput
                type={"text"}
                placeholder={"City"}
                className={"city"}
                name={"city"}
              /> */}
      <div className="inline-form-field">
        <select onChange={selectCountry} required>
          <option>Select Country</option>
          {countryList &&
            countryList.map((country, key) => (
              <option key={key} value={country.id}>
                {country.name}
              </option>
            ))}
        </select>
        <select onChange={selectState} required>
          <option>Select State</option>
          {stateList &&
            stateList.map((state, key) => (
              <option key={key} value={state.id}>
                {state.name}
              </option>
            ))}
        </select>
      </div>
      <div className="inline-form-field" required>
        <select onChange={selectCity}>
          <option>Select City</option>
          {cityList &&
            cityList.map((city, key) => (
              <option key={key} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>

        <FormInput
          type={"text"}
          className="pincode"
          placeholder="PIN"
          value={zip_code}
          onChange={selectPincode}
          required
        />
      </div>
      {/* <div className="inline-form-field select-charges">
        <select onChange={selectCharges} required>
          <option>Select Charges</option>
          {shippingChargesList &&
            shippingChargesList.map((method, key) => (
              <option key={key} value={method.id}>
                {method.label}
              </option>
            ))}{" "}
        </select>
      </div> */}
    </div>
  );
}
