import React from "react";
import "./brands-filter.styles.scss";
import { Link } from "react-router-dom";

export default function BrandFilter({ filterData, onFilterData }) {
  return (
    <div className="brand-names-filter">
      <h2 className="title">{filterData.name || ""}</h2>

      <ul className="list">
        {filterData &&
          filterData.value.map((eachVal, index) => {
            return (
              <li className="list-item" key={index}>
                <div
                  className="eachValue"
                  onClick={onFilterData.bind(this, filterData.name, eachVal.id)}
                >
                  <input type="checkbox" value={eachVal.id} />
                  <label htmlFor={eachVal.id}>{eachVal.value}</label>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
