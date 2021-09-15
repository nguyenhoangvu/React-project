import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormUserInfo from "./FormUserInfo";

interface IFormUserInfo {
  showForm: boolean;
}

const FormUserInfoWrapper = styled.div<IFormUserInfo>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
`;

type Props = {
  handleDirectButtonClick: (clicked: string) => void;
};

const FormXeMay: React.FC<Props> = ({ handleDirectButtonClick }) => {
  const [buttonFormUserInfoClicked, setButtonFormUserInfoClicked] =
    useState("");

  const handleButtonClick = (buttonClicked: string) => {
    setButtonFormUserInfoClicked(buttonClicked);
  };

  useEffect(() => {
    handleDirectButtonClick
      ? handleDirectButtonClick(buttonFormUserInfoClicked)
      : {};
  }, [buttonFormUserInfoClicked]);

  return (
    <form>
      <FormUserInfoWrapper
        showForm={
          buttonFormUserInfoClicked !== "" &&
          buttonFormUserInfoClicked !== undefined
        }
      >
        <FormUserInfo handleButtonClick={handleButtonClick}></FormUserInfo>
      </FormUserInfoWrapper>
    </form>
  );
};

export default FormXeMay;
