import React from "react";
import "./default-filter.styles.scss";

export default function DefaultFilter({ filterData, onFilterData }) {
  return (
    <div className="default-filter">
      <h2 className="title">{filterData.name || ""} </h2>

      <ul className="list">
        {filterData &&
          filterData.value.map((eachVal, index) => (
            <li className="list-item" key={index}>
              <div className="eachValue">
                <input
                  type="checkbox"
                  value={eachVal.id}
                  onClick={onFilterData.bind(this, filterData.name, eachVal.id)}
                />
                <label htmlFor={eachVal.id}>{eachVal.value}</label>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
