import React, { useState } from "react";
import Styles from "./topNav.styles.scss";

import Login from "../login/Login.component";
import SignUp from "../signup/SignUp";
import CurrencyChanger from "../currency-changer/CurrencyChanger.component";

// react-cookie
import { useCookies } from "react-cookie";

// importing react icons
import { BiCaretDown, BiPhoneCall, BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoCodepen, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { GrFacebookOption, GrTwitter, GrPinterest } from "react-icons/gr";
import { RiInstagramFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";

export default function TopNav() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openCurrencyChanger, setOpenCurrencyChanger] = useState(false);
  const [cookie] = useCookies();

  const history = useHistory();

  const onOpenLoginModal = () => setOpenLogin(true);
  const onCloseLoginModal = () => setOpenLogin(false);

  const onOpenRegisterModal = () => setOpenRegister(true);
  const onCloseRegisterModal = () => setOpenRegister(false);

  const onOpenCurrencyChangerModal = () => setOpenCurrencyChanger(true);
  const onCloseCurrencyChangerModal = () => setOpenCurrencyChanger(false);

  const logout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="top_nav">
      {/* login modal component */}
      <Login
        open={openLogin}
        openRegister={onOpenRegisterModal}
        onCloseModal={onCloseLoginModal}
      />
      <SignUp open={openRegister} onCloseModal={onCloseRegisterModal} />

      <CurrencyChanger
        open={openCurrencyChanger}
        onClose={onCloseCurrencyChangerModal}
        setOpen={setOpenCurrencyChanger}
      />

      <div className="inner-container-topbar">
        <div className="left_items">
          <div
            className="currency_selector"
            onClick={() => onOpenCurrencyChangerModal()}
          >
            <span className="name">
              {cookie.userSelectedCurrency !== undefined
                ? cookie.userSelectedCurrency
                : "USD"}{" "}
            </span>
            <span className="dropDownIcon">
              {cookie.currencySymbol !== undefined
                ? cookie.currencySymbol
                : "$"}{" "}
              <BiCaretDown />
            </span>
          </div>
          <div
            className="email_address"
            onClick={() =>
              window.open("mailto:support@eshakti.com?subject=Subject&body=''")
            }
          >
            <span className="icon">
              <HiOutlineMail />
            </span>
            <span className="text">customerchampion@eshakti.com</span>
          </div>
          <div className="phone">
            <a className="link" href="tel:+1-855 374 2584">
              <span className="icon">
                <BiPhoneCall />
              </span>
              <span className="text">855 374 2584</span>
            </a>
          </div>
        </div>
        <div className="right_items">
          {localStorage.getItem("es_login") === "true" ? (
            <>
              <div className="my_account">
                <span className="icon">
                  <BiUser />
                </span>
                <Link to="/my-account/account" className="link">
                  <span className="text">My Account</span>
                </Link>
              </div>
              <div className="login" onClick={logout}>
                <span className="icon">
                  <IoMdLogOut />
                </span>
                <span className="text">Logout</span>
              </div>
            </>
          ) : (
            <>
              <div className="my_account" onClick={() => onOpenRegisterModal()}>
                <span className="icon">
                  <BiUser />
                </span>
                <span className="text">Sign Up</span>
              </div>
              <div className="login" onClick={() => onOpenLoginModal()}>
                <span className="icon">
                  <IoMdLogIn />
                </span>
                <span className="text">Login</span>
              </div>
            </>
          )}
          <div className="social_media_icons">
            <a href="#" className="icon">
              <GrFacebookOption />
            </a>
            <a href="#" className="icon">
              <GrTwitter />
            </a>
            <a href="#" className="icon">
              <RiInstagramFill />
            </a>
            <a href="#" className="icon">
              <GrPinterest />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
