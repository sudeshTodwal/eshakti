import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../../store/home/homeAction";
import "./login.styles.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FormInput from "../form-input/FormInput.component";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ open, onCloseModal, openRegister }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name.toLowerCase() === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name.toLowerCase() === "password") {
      setPassword(e.target.value);
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
      email: email,
      password: password,
    };

    dispatch(onLogin(data));
  };

  const onOpenRegiterModal = () => {
    openRegister();
    onCloseModal();
  };
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <ToastContainer />
      <div className="inner-container-login">
        <div className="title">
          <h2 className="title-text">Sign in or Register</h2>
        </div>
        <div className="content">
          <div className="left">
            <div className="form">
              <form onSubmit={onSubmit}>
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
                  <label htmlFor="password">Password</label>
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
                <div className="forgott-password-link">
                  <Link className="forgot-link" to="">
                    Forgot your Password ?
                  </Link>
                </div>
                <div className="form-element-group">
                  <FormInput
                    type="submit"
                    className="submit-btn"
                    name="submit-btn"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="right">
            <h3 className="area-title">New Here</h3>
            <div className="discription">
              <div className="heading-text">Registration is free and easy</div>
              <ul className="points">
                <li>Faster checkout</li>
                <li>Save multiple addresses</li>
                <li>View and track orders and more</li>
              </ul>
            </div>
            <button className="create-account-btn" onClick={onOpenRegiterModal}>
              Create An Account
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
