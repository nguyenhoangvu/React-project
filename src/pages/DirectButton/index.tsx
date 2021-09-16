import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ButtonBack from "../../components/ButtonBack";
import ButtonNext from "../../components/ButtonNext";

type Props = {
  handleButtonClick: (clicked: string) => void;
  buttonCallback: string;
};

const ButtonWrapper = styled.div`
  position: fixed;
  transition: transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53),
    background-color 0s linear 0.2s;
  text-align: center;
  width: 100%;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  z-index: 997;
  background-color: #005790;
  padding: 0;
  height: 3.5rem;
`;

const UL = styled.ul`
  display: flex;
  top: 0;
  bottom: 0;
  z-index: 1;
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
  margin: 0;
  padding-left: 0;
`;

const LI = styled.li`
  flex: 1;
  display: inline-block;
  margin: 0;
  height: 100%;
`;

const DirectButton: React.FC<Props> = ({
  handleButtonClick,
  buttonCallback,
}) => {
  const [clickButton, setClickButton] = useState("");

  const handleButtonClicked = (clicked: string) => {
    setClickButton(clicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(clickButton) : {};
  }, [clickButton]);

  useEffect(() => {
    setClickButton(buttonCallback);
  }, [buttonCallback]);

  return (
    <ButtonWrapper>
      <UL>
        <LI>
          <ButtonBack
            handleBackButtonClicked={handleButtonClicked}
            buttonCallback={clickButton}
          />
        </LI>
        <LI>
          <ButtonNext
            handleNextButtonClicked={handleButtonClicked}
            buttonCallback={clickButton}
          />
        </LI>
      </UL>
    </ButtonWrapper>
  );
};

export default DirectButton;
