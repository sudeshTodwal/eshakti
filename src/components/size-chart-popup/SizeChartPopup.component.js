import React from "react";
import "./size-chart-popup.styles.scss";

import SizeChart from "../../assets/images/sizechart.png";
import SizeChartMobile from "../../assets/images/sizechartMobile.png";

import useWindowSize from "../../hooks/useWindowSize";

// react modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function SizeChartPopup({ open, size_chart_img, onCloseModal }) {
  const displayWidth = useWindowSize();

  const { width } = displayWidth;

  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="sizeChartPopup">
        <div className="inner-container">
          <h5>Size Chart</h5>
          <p>These sizes correspond to your body measurement in inches</p>
          {width > 768 ? (
            <img
              src={size_chart_img}
              alt="sizeChart"
              className="size-chart-desktop"
            />
          ) : (
            <img src={size_chart_img} className="size-chart-mobile" />
          )}
        </div>
      </div>
    </Modal>
  );
}
