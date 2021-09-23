import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
  faShoppingCart,
  faCamera,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

type Props = {
  handleClickBuyButton: (clicked: boolean) => void;
  pageCallback: boolean;
  buttonIcon: string;
  buttonLable?: string;
};

interface IActionButton {
  buttonIcon: string;
}

const ActionButton = styled.div<IActionButton>`
  position: fixed;
  right: 1.4375rem;
  bottom: ${(props) =>
    props.buttonIcon === "buy" ? "2.3125rem" : "8.3125rem"};
  padding-top: 0.9375rem;
  margin-bottom: 0;
  z-index: 997;
`;
interface IIconStyle {
  buttonIcon: string;
}
const IconStyle = styled.a<IIconStyle>`
  background-color: #005790;
  border: none;
  color: white;
  padding: ${(props) =>
    props.buttonIcon === "buy" ? "1rem" : "1.5rem 1.0625rem 1rem 1.125rem"};
  text-align: center;
  text-decoration: none;
  border-radius: 50%;
`;

const SPAN = styled.span`
  color: #005790;
  font-size: 1.0625rem;
  font-weight: 700;
  margin-right: 1rem;
`;

const ButtonBuy: React.FC<Props> = ({
  handleClickBuyButton,
  pageCallback,
  buttonIcon,
  buttonLable,
}) => {
  const [buttonClicked, setButtonClick] = useState(false);

  const handleClick = () => {
    setButtonClick(!buttonClicked);
  };

  useEffect(() => {
    handleClickBuyButton ? handleClickBuyButton(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  return (
    <ActionButton onClick={handleClick} buttonIcon={buttonIcon}>
      {buttonLable !== "" && <SPAN>{buttonLable}</SPAN>}
      {buttonIcon === "buy" && (
        <IconStyle buttonIcon={buttonIcon}>
          <FontAwesomeIcon icon={faShoppingCart} size="1x" />
        </IconStyle>
      )}
      {buttonIcon === "camera" && (
        <IconStyle buttonIcon={buttonIcon}>
          <FontAwesomeIcon icon={faCamera} size="2x" />
        </IconStyle>
      )}
      {buttonIcon === "plus" && (
        <IconStyle buttonIcon={buttonIcon}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </IconStyle>
      )}
    </ActionButton>
  );
};

export default ButtonBuy;
