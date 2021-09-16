import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  handleNextButtonClicked: (clicked: string) => void;
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
`;

const SPAN = styled.span`
  float: left;
  color: #fff;
  line-height: 3.5rem;
`;

const ButtonNext: React.FC<Props> = ({
  handleNextButtonClicked,
  buttonCallback,
}) => {
  const [buttonClicked, setButtonClicked] = useState("");

  const onClickBackButton = () => {
    setButtonClicked("next");
  };

  useEffect(() => {
    handleNextButtonClicked ? handleNextButtonClicked(buttonClicked) : {};
  }, [buttonClicked]);

  useEffect(() => {
    setButtonClicked(buttonCallback);
  }, [buttonCallback]);

  return (
    <A className="" onClick={onClickBackButton}>
      <SPAN className="right">Tiếp tục</SPAN>
      <FontAwesomeIcon
        icon={faChevronRight}
        size="2x"
        className="next-icon"
        style={{ height: "3.5rem" }}
      />
    </A>
  );
};

export default ButtonNext;
