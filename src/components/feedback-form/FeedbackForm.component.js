import React, { useState } from "react";
import "./feedbackForm.styles.scss";

import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { giveFeedback } from "../../store/home/homeAction";

// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function FeedbackForm({ open, onCloseModal }) {
  const [suggestionTitle, setSuggestionTitle] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [ratingCount, setRatingCount] = useState(0);
  const [isPermittedToShow, setIsPermittedToShow] = useState(false);
  const { id } = useParams();
  // react redux usedispatch
  const dispatch = useDispatch();

  // notify toast
  const notifySuccess = () => toast.info("success");
  const notifyError = () => toast.error("something is wrong please try again");

  function handleSubmition(e) {
    e.preventDefault();

    const dataToSend = {
      product_id: id,
      title: suggestionTitle,
      comment: feedbackText,
      rate: ratingCount,
      permitStatus: isPermittedToShow,
    };

    if (suggestionTitle && feedbackText) {
      dispatch(giveFeedback(dataToSend, notifySuccess, notifyError));

      setSuggestionTitle("");
      setFeedbackText("");
      setRatingCount("");
      setIsPermittedToShow(false);
    }
  }

  return (
    <Modal open={open} setModal onClose={onCloseModal}>
      <ToastContainer></ToastContainer>
      <div className="feedback-form">
        <h5>Please share your feedback on the website and its ease of use.</h5>
        <form onSubmit={handleSubmition}>
          <input
            type="text"
            className="suggestion-title"
            placeholder="Title"
            value={suggestionTitle}
            onChange={(e) => setSuggestionTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter you comment or suggestion here"
            className="feedback-text-area"
            name="suggestion"
            cols="30"
            rows="5"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          ></textarea>
          <div className="rating">
            <div className="rating-stars">
              <fieldset className="rating">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star5"
                  title="Awesome - 5 stars"
                ></label>
                <input
                  type="radio"
                  id="star4half"
                  name="rating"
                  value="4.5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star4half"
                  title="Pretty good - 4.5 stars"
                ></label>
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star4"
                  title="Pretty good - 4 stars"
                ></label>
                <input
                  type="radio"
                  id="star3half"
                  name="rating"
                  value="3.5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star3half"
                  title="Meh - 3.5 stars"
                ></label>
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star3"
                  title="Meh - 3 stars"
                ></label>
                <input
                  type="radio"
                  id="star2half"
                  name="rating"
                  value="2.5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star2half"
                  title="Kinda bad - 2.5 stars"
                ></label>
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star2"
                  title="Kinda bad - 2 stars"
                ></label>
                <input
                  type="radio"
                  id="star1half"
                  name="rating"
                  value="1.5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="star1half"
                  title="Meh - 1.5 stars"
                ></label>
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="full"
                  htmlFor="star1"
                  title="Sucks big time - 1 star"
                ></label>
                <input
                  type="radio"
                  id="starhalf"
                  name="rating"
                  value="0.5"
                  onChange={(e) => setRatingCount(e.target.value)}
                />
                <label
                  className="half"
                  htmlFor="starhalf"
                  title="Sucks big time - 0.5 stars"
                ></label>
              </fieldset>
            </div>
          </div>
          <div className="permission">
            <input
              type="checkbox"
              name="permission-check"
              className="publish-permission"
              onChange={(e) => setIsPermittedToShow(e.target.checked)}
            />
            <label htmlFor="permition-check">
              I permit my feedback to be published
            </label>
          </div>
          <button className="submit" type="submit" onClick={onCloseModal}>
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
