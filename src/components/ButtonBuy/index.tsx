import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { ADDPRODUCT } from "../../redux/types";

import {
  faShoppingCart,
  faCamera,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

type Props = {
  handleClickButton: (clicked: boolean) => void;
  pageCallback: boolean;
  buttonIcon: string;
  buttonLable?: string;
  buttonPlusCallBack?: boolean;
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
  handleClickButton,
  pageCallback,
  buttonIcon,
  buttonLable,
  buttonPlusCallBack,
}) => {
  const [buttonClicked, setButtonClick] = useState(false);
  const [buttonAddProductClicked, setButtonAddProductClick] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setButtonClick(!buttonClicked);
    if (buttonIcon === "plus") {
      setButtonAddProductClick(!buttonAddProductClicked);
      dispatch({
        type: ADDPRODUCT,
      });
    }
  };

  useEffect(() => {
    handleClickButton ? handleClickButton(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    handleClickButton ? handleClickButton(buttonAddProductClicked) : {};
  }, [buttonAddProductClicked]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  useEffect(() => {
    if (buttonPlusCallBack !== undefined)
      setButtonAddProductClick(buttonPlusCallBack);
  }, [buttonPlusCallBack]);

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
