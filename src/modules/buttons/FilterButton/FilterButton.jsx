import React from "react";
import sortIcon from "../../../assets/icons/sort.svg"

const FilterButton = ({ filter, toggleFilter }) => {
  return (
    <button
      style={{ margin: "0" }}
      className={`categoryButton ${filter.value === "default" ? "" : "selected"}`}
      onClick={() => toggleFilter(filter.id)}
    >
      <img className="categoryImg" src={filter.icon} alt={`${filter.id}Icon`} />
      {filter.name}
      <img className={`filterImg ${filter.value}`} style={{ marginLeft: "auto" }} src={sortIcon} alt="sortIcon" />
    </button>
  );
};

export default FilterButton;
