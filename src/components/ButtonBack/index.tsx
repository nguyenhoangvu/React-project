import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ButtonBack = () => {
  return (
    <a className="">
      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      <span className="left">Quay lại</span>
    </a>
  );
};

export default ButtonBack;
