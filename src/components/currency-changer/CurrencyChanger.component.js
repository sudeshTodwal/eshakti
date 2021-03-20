import React, { useEffect } from "react";
import "./currency-changer.styles.scss";
import ReactCountryFlag from "react-country-flag";

import { useDispatch, useSelector } from "react-redux";

// react-cookie
import { useCookies } from "react-cookie";

// react modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function CurrencyChanger({ open, onClose, setOpen }) {
  const availableCurrencies = useSelector((state) => state.home.currencyRates);
  const [cookies, setCookies] = useCookies([
    "countryCode",
    "userSelectedCurrency",
  ]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      classNames={{ modal: "currency-changer-modal" }}
    >
      <div className="currency-changer-container">
        <div className="inner-container">
          {availableCurrencies !== undefined && availableCurrencies !== null
            ? availableCurrencies.currencyRates.map((eachCurrency, index) => (
                <div
                  className="each-currency"
                  key={index}
                  id={eachCurrency.currencyCode}
                  onClick={(e) => {
                    setCookies("userSelectedCurrency", e.currentTarget.id);
                    setCookies("currencySymbol", eachCurrency.currencySymbol);
                    setOpen(false);
                  }}
                >
                  <div className="inner-area">
                    <span className="flag">
                      <ReactCountryFlag
                        countryCode={eachCurrency.countryCode}
                        className="flag"
                        svg
                        style={{
                          width: "1.3em",
                          height: "1.8em",
                        }}
                        title="US"
                      />
                    </span>
                    <span className="country-name">
                      {eachCurrency.countryName}
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </Modal>
  );
}
