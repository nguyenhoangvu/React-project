import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

type Props = {
  handleClickBuyButton: (clicked: boolean) => void;
};

const ButtonBuy: React.FC<Props> = ({ handleClickBuyButton }) => {
  const [buttonClicked, setButtonClick] = useState(false);

  const handleClick = () => {
    setButtonClick(!buttonClicked);
  };

  useEffect(() => {
    handleClickBuyButton ? handleClickBuyButton(buttonClicked) : {};
  }, [buttonClicked]);

  return (
    <div
      onClick={handleClick}
      className="fixed-action-btn"
      id="btn_gio_hang_san_pham"
    >
      <a className="fixed-action-btn-icon">
        <FontAwesomeIcon icon={faShoppingCart} size="1x" />
      </a>
    </div>
  );
};

export default ButtonBuy;
