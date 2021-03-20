import React, { useEffect, useState } from "react";

// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import {
  updateProfilePic,
  getUserDetails,
  updateUserDetails,
} from "../../store/home/homeAction";

import ImageUploader from "react-images-upload";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const signedInUserDetails = useSelector((state) => state.home.signedInUser);

  async function getupdatedUserDetails() {
    const userId = await localStorage.getItem("es_user_id");
    dispatch(getUserDetails(userId));
  }

  // onchange method to get picture from your system and set in to state
  const onDrop = (picture) => {
    const files = picture;
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append("image", file);
    });

    formData.append("id", localStorage.getItem("es_user_id"));
    dispatch(updateProfilePic(formData));
    getupdatedUserDetails();
  };

  useEffect(() => {
    getupdatedUserDetails();
  }, []);

  useEffect(() => {
    if (signedInUserDetails) {
      setEmail(signedInUserDetails.user.email);
      setName(signedInUserDetails.user.name);
      setPhone(signedInUserDetails.user.phone);
      setCountry(signedInUserDetails.user.country);
    }
  }, [signedInUserDetails]);

  // notification
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  // on update this data will be passed to server
  const onUpdate = (e) => {
    e.preventDefault();
    const dataToUpdate = {
      id: localStorage.getItem("es_user_id"),
      name: name,
      email: null,
      phone: phone,
      password: password,
      new_password: confirmPassword,
      country: country,
    };

    dispatch(updateUserDetails(dataToUpdate, notifySuccess, notifyError));
  };

  return (
    <>
      <ToastContainer />
      <div className="personal-info-slot">
        <div className="profile-img">
          {signedInUserDetails && (
            <img
              src={
                signedInUserDetails.userProfileImg ||
                `http://eshakti.ewtlive.in/dashboard/${signedInUserDetails.user.profile_pic}`
              }
              width={100}
              height={100}
              alt=""
            />
          )}

          {/* <button className="change-profile-pic-btn">change profile pic</button> */}
          <ImageUploader
            withIcon={false}
            label={false}
            onChange={onDrop}
            buttonClassName="change-profile-pic-btn"
            buttonText={"Update Image"}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>

        <form>
          <div className="input-control-inline">
            <div className="email common">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>

            <div className="country common">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="input-control-inline">
            <div className="name common">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="phonenumber common">
              <label htmlFor="number">Phone</label>
              <input
                type="number"
                name="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="input-control-inline">
            <div className="name common">
              <label htmlFor="name">Current password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="phonenumber common">
              <label htmlFor="number">New-Password</label>
              <input
                type="password"
                name="new-password"
                value={confirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="btn">
            <button type="submit" onClick={onUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
