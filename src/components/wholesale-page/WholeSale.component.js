import React, { useEffect, useState } from "react";
import "./whole-sale.styles.scss";

// react icons
import { BsDot } from "react-icons/bs";

// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-scroll
import Scroll from "react-scroll";
import { Link } from "react-scroll";

import { b2bEnquiry } from "../../store/home/homeAction";

// react redux
import { useDispatch, useSelector } from "react-redux";

export default function WholeSale() {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [annualRevnue, setAnnualRevnue] = useState("");
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [extraDetails, setExtraDetails] = useState("");

  const dispatch = useDispatch();

  // notify toast
  const notifySubmition = () =>
    toast.info("Thanks for contacting us, we'll reach to you soon");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const dataToSend = {
      name: personName,
      store_name: storeName,
      email: email,
      phone: phone,
      address: address,
      annual_revenue: annualRevnue,
      description: extraDetails,
    };

    dispatch(b2bEnquiry(dataToSend, notifySubmition));

    // making empty all the values of form fields
    setStoreName("");
    setPersonName("");
    setPhone("");
    setAddress("");
    setAnnualRevnue("");
    setExtraDetails("");
    setEmail("");
  }

  return (
    <div className="whole-sale">
      <ToastContainer />
      <div className="title-text">
        <p>Retailers/Resellers</p>
        <h1 className="title">A Big opprtunity to grow your business</h1>
      </div>

      <div className="content">
        <div className="write-us">
          <div className="left">
            <img
              src="https://img1.eshakti.com/bannerimages/wholesalemain.jpg"
              alt=""
            />
          </div>
          <div className="right">
            <h3>What's New Here</h3>
            <ul className="key-points">
              <li>
                <span className="icon">
                  <BsDot />
                </span>
                <span className="text">
                  Clothes to your customers' size and style!
                </span>
              </li>
              <li>
                <span className="icon">
                  <BsDot />
                </span>
                <span className="text">
                  Clothes to your customers' size and style!
                </span>
              </li>
              <li>
                <span className="icon">
                  <BsDot />
                </span>
                <span className="text">
                  Clothes to your customers' size and style!
                </span>
              </li>
              <li>
                <span className="icon">
                  <BsDot />
                </span>
                <span className="text">
                  Clothes to your customers' size and style!
                </span>
              </li>
            </ul>
            <div className="btn-part">
              <Link to="enquireyForm" smooth={true}>
                <button className="write-us-btn">
                  <span>Write US Today</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="custom-clothing">
          <div className="left">
            <h3>eShakti</h3>
            <p>The #1 custom-clothing brand online now comes to you!</p>
          </div>
          <div className="right">
            <img
              src="https://images.theconversation.com/files/293774/original/file-20190924-54793-157i3zo.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
              alt=""
            />
          </div>
        </div>

        <div className="enquiry-form" id="enquireyForm">
          <div className="title-area">
            <h3 className="title-text">eShakti B2B Inquiry Form</h3>
            <p>
              Thank you for your interest in eShakti. May we request you to fill
              up a few details. Our representative will be in touch with you
              once we receive your information.
            </p>
          </div>

          <div className="form">
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <label htmlFor="#">Name of the Store</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="#">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label htmlFor="#">Annual Revenue in USD</label>
                <input
                  type="number"
                  value={annualRevnue}
                  onChange={(e) => setAnnualRevnue(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label htmlFor="">Name of Contact Person</label>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="">Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="">Phone Number (with Area Code)</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="#">Anything else you would like to add:</label>
                <textarea
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
