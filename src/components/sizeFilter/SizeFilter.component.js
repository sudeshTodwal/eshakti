import React from "react";
import "./sizefilter.styles.scss";

export default function SizeFilter({ filterData }) {
  return (
    <div className="size-filter">
      <h2 className="title">{filterData.name || ""}</h2>
      <div className="size-list">
        {filterData.value.map((eachVal, index) => (
          <div className="each-size" key={index}>
            <div className="eachValue">
              <input type="checkbox" value={eachVal.id} />
              <label htmlFor={eachVal.id}>{eachVal.value} </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
