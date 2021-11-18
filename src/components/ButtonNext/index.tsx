import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  handleNextButtonClicked: (clicked: string) => void;
  buttonCallback: string;
  isPay?: boolean;
  isSummaryPage?: boolean;
  isCheckTerm?: boolean;
  handlePaymentClicked?: (clicked: boolean) => void;
  buttonPaymentCallback?: boolean;
  isValidateFalse?: boolean;
  isConditionChecked?: boolean;
};

const A = styled.a`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #fff;
  line-height: 3.5rem;
  z-index: 1;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const SPAN = styled.span`
  float: left;
  color: #fff;
  line-height: 3.5rem;
  padding-right: 25px;
  margin-top: -2px;
`;

const ButtonNext: React.FC<Props> = ({
  handleNextButtonClicked,
  buttonCallback,
  isPay,
  isSummaryPage,
  isCheckTerm,
  handlePaymentClicked,
  buttonPaymentCallback,
  isValidateFalse,
  isConditionChecked,
}) => {
  const [buttonClicked, setButtonClicked] = useState("");
  const [buttonPaymentClicked, setButtonPaymentClicked] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Tiếp tục");

  const onClickBackButton = () => {
    setButtonClicked("next");
  };

  const onClickPayment = () => {
    setButtonPaymentClicked(!buttonPaymentClicked);
  };

  useEffect(() => {
    handleNextButtonClicked ? handleNextButtonClicked(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    handlePaymentClicked ? handlePaymentClicked(buttonPaymentClicked) : {};
  }, [buttonPaymentClicked]);

  useEffect(() => {
    setButtonClicked(buttonCallback);
  }, [buttonCallback]);

  useEffect(() => {
    if (isValidateFalse === true) setButtonClicked("");
  }, [isValidateFalse]);

  useEffect(() => {
    if (buttonPaymentCallback !== undefined)
      setButtonPaymentClicked(buttonPaymentCallback);
  }, [buttonPaymentCallback]);

  useEffect(() => {
    if (isPay === true) setButtonTitle("Thanh Toán");
  }, [isPay]);

  return (
    <>
      {isPay === false &&
        isSummaryPage === false &&
        isConditionChecked != true && (
          <A className="" onClick={onClickBackButton}>
            <SPAN className="right">{buttonTitle}</SPAN>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="2x"
              className="next-icon"
              style={{ height: "1rem" }}
            />
          </A>
        )}
      {isCheckTerm === true && isPay === true && isSummaryPage === true && (
        <A className="" onClick={onClickPayment}>
          <SPAN className="right">{buttonTitle}</SPAN>
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            className="next-icon"
            style={{ height: "1rem" }}
          />
        </A>
      )}
    </>
  );
};

export default ButtonNext;
