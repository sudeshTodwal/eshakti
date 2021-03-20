import React from "react";
import "./midBanner.styles.scss";

export default function MidBanner() {
  return (
    <div className="mid_banner">
      <div className="banner_img">
        {/* mid-banner will be here in background */}
        {/* <Image src="/images/img-12.png" layout="fill" objectFit="cover" /> */}
        <button className="button">
          <span>Shop Now</span>
        </button>
      </div>
    </div>
  );
}
