import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  handleBackButtonClicked: (clicked: string) => void;
  buttonCallback: string;
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
  align-items: center;
`;

const SPAN = styled.span`
  float: left;
  color: #fff;
  line-height: 3.5rem;
`;

const ButtonBack: React.FC<Props> = ({
  handleBackButtonClicked,
  buttonCallback,
}) => {
  const [buttonClicked, setButtonClicked] = useState("");

  const onClickBackButton = () => {
    setButtonClicked("back");
  };

  useEffect(() => {
    handleBackButtonClicked ? handleBackButtonClicked(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    setButtonClicked(buttonCallback);
  }, [buttonCallback]);

  return (
    <A className="" onClick={onClickBackButton}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        size="2x"
        className="back-icon"
        style={{ height: "1rem" }}
      />
      <SPAN className="left">Quay lại</SPAN>
    </A>
  );
};

export default ButtonBack;
