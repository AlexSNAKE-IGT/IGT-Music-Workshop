import React from "react";

const ProfileButton = ({ category, selectedMainPageItem, onClick, isFetching }) => {
    return (
        <button
            style={{ margin: "0" }}
            className={`categoryButton ${selectedMainPageItem === category.id ? "selected" : ""}`}
            onClick={() => {
            onClick(category.id);
        }}
            disabled={isFetching}
            >
            <img className="categoryImg" src={category.icon} alt={`${category.id}Icon`} />
            {category.name}
        </button>
        );
};

export default ProfileButton;
