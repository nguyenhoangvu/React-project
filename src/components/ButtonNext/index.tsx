import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  handleNextButtonClicked: (clicked: string) => void;
  buttonCallback: string;
  isPay?: boolean;
  isSummaryPage?: boolean;
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
  justify-content: space-evenly;
`;

const SPAN = styled.span`
  float: left;
  color: #fff;
  line-height: 3.5rem;
`;

const ButtonNext: React.FC<Props> = ({
  handleNextButtonClicked,
  buttonCallback,
  isPay,
  isSummaryPage,
}) => {
  const [buttonClicked, setButtonClicked] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Tiếp tục");

  const onClickBackButton = () => {
    setButtonClicked("next");
  };

  useEffect(() => {
    handleNextButtonClicked ? handleNextButtonClicked(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    setButtonClicked(buttonCallback);
  }, [buttonCallback]);

  useEffect(() => {
    if (isPay === true) setButtonTitle("Thanh Toán");
  }, [isPay]);

  return (
    <A className="" onClick={onClickBackButton}>
      {isPay === false && isSummaryPage === false && (
        <SPAN className="right">{buttonTitle}</SPAN>
      )}
      {isPay === false && isSummaryPage === false && (
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          className="next-icon"
          style={{ height: "3.5rem" }}
        />
      )}
    </A>
  );
};

export default ButtonNext;
