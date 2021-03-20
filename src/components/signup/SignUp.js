import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onRegister } from "../../store/home/homeAction";
import "./signup.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FormInput from "../form-input/FormInput.component";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ open, onCloseModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name.toLowerCase() === "name") {
      var text = e.target.value.replace(/[^a-z ]/gi, "");

      setName(text);
    }
    if (e.target.name.toLowerCase() === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name.toLowerCase() === "phone") {
      var text = e.target.value.replace(/[^0-9+]/gi, "");
      setPhone(text);
    }

    if (e.target.name.toLowerCase() === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name.toLowerCase() === "c_password") {
      setConfirmPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast("Password should minimum of 6 character", {
        type: toast.TYPE.ERROR,
        autoClose: 10000,
      });
      return false;
    }

    let data = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      c_password: c_password,
    };

    dispatch(onRegister(data));
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <ToastContainer />
      <div className="inner-container-signup">
        <div className="title">
          <h2 className="title-text">Register</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="content">
            <div className="left">
              <div className="form">
                <div className="form-element-group">
                  <label htmlFor="username">Name</label>
                  <FormInput
                    type="text"
                    placeholder="Name"
                    className="username"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="[a-zA-Z]{1,}"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="main-wrap">
              <div className="left">
                <div className="form">
                  <div className="form-element-group">
                    <label htmlFor="email">Email</label>
                    <FormInput
                      type="email"
                      placeholder="Email"
                      className="username"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      required
                    />
                  </div>

                  <div className="form-element-group">
                    <label htmlFor="username">Password</label>
                    <FormInput
                      type="password"
                      placeholder={"Password"}
                      className="username"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="form">
                  <div className="form-element-group">
                    <label htmlFor="phone">Phone</label>
                    <FormInput
                      type="text"
                      placeholder="Phone"
                      className="phone"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-element-group">
                    <label htmlFor="username">Confirm Password</label>
                    <FormInput
                      type="password"
                      placeholder={"Confirm Password"}
                      className="username"
                      name="c_password"
                      value={c_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="left">
              <div className="form">
                <div className="form-element-group">
                  <div className="form-element-group">
                    <FormInput
                      type="submit"
                      className="submit-btn"
                      name="submit-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SignUp;
