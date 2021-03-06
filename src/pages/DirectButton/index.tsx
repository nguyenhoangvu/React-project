import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ButtonBack from "../../components/ButtonBack";
import ButtonNext from "../../components/ButtonNext";

type Props = {
  handleButtonClick: (clicked: string) => void;
  buttonCallback: string;
  isPay?: boolean;
  isSummaryPage?: boolean;
  isCheckTerm?: boolean;
  handlePayment?: (pay: boolean) => void;
  buttonPaymentCallback?: boolean;
  isValidateFalse?: boolean;
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
  isPay,
  isSummaryPage,
  isCheckTerm,
  handlePayment,
  buttonPaymentCallback,
  isValidateFalse,
}) => {
  const [clickButton, setClickButton] = useState("");
  const [paymentClicked, setPaymentClicked] = useState(false);

  const handleButtonClicked = (clicked: string) => {
    setClickButton(clicked);
  };

  const handlePaymentClicked = (paymentClicked: boolean) => {
    setPaymentClicked(paymentClicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(clickButton) : {};
  }, [clickButton]);

  useEffect(() => {
    setClickButton(buttonCallback);
  }, [buttonCallback]);

  useEffect(() => {
    handlePayment ? handlePayment(paymentClicked) : {};
  }, [paymentClicked]);

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
            isPay={isPay}
            isSummaryPage={isSummaryPage}
            isCheckTerm={isCheckTerm}
            handlePaymentClicked={handlePaymentClicked}
            buttonPaymentCallback={buttonPaymentCallback}
            isValidateFalse={isValidateFalse}
          />
        </LI>
      </UL>
    </ButtonWrapper>
  );
};

export default DirectButton;
