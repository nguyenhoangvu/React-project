import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormUserInfo from "./FormUserInfo";

interface IFormUserInfo {
  hideForm: boolean;
}

const FormUserInfoWrapper = styled.div<IFormUserInfo>`
  display: ${(props) => (props.hideForm === true ? "none" : "block")};
`;

type Props = {
  handleDirectButtonClick: (clicked: string) => void;
  pageCallback: boolean;
};

const FormXeMay: React.FC<Props> = ({
  handleDirectButtonClick,
  pageCallback,
}) => {
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

  useEffect(() => {
    if (pageCallback === true) setButtonFormUserInfoClicked("");
  }, [pageCallback]);

  return (
    <form>
      <FormUserInfoWrapper
        hideForm={
          buttonFormUserInfoClicked !== "" && buttonFormUserInfoClicked !== null
        }
      >
        <FormUserInfo
          handleButtonClick={handleButtonClick}
          pageCallback={buttonFormUserInfoClicked}
        ></FormUserInfo>
      </FormUserInfoWrapper>
    </form>
  );
};

export default FormXeMay;
