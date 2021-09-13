import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ButtonNext = () => {
  return (
    <a className="">
      <span className="right">Tiếp tục</span>
      <FontAwesomeIcon icon={faChevronRight} size="2x" />
    </a>
  );
};

export default ButtonNext;
