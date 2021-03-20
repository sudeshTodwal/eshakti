import React from "react";
import "./recomended-product-details-popup.styles.scss";

// react modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function RecomendedProductDetailPopup({
  open,
  onCloseModal,
  content,
}) {
  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="recomended-product-detail">
        <div className="left">
          <img
            src="https://img1.eshakti.com/clothimages/CL0080925MP.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <h5>lorem ipsum title</h5>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          mollitia cumque deleniti ducimus, ea veniam blanditiis explicabo!
          Voluptatem sed tempora sit quaerat iste perspiciatis. Saepe quasi nam
          explicabo. Deleniti, excepturi.
        </div>
      </div>
    </Modal>
  );
}
