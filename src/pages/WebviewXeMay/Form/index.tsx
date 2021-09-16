import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormUserInfo from "./FormUserInfo";
import FormMotoInfo from "./FormMotoInfo";

interface IFormUserInfo {
  hideForm: boolean;
}

const FormUserInfoWrapper = styled.div<IFormUserInfo>`
  display: ${(props) => (props.hideForm === true ? "none" : "block")};
`;

interface IFormMotoInfo {
  showForm: boolean;
}

const FormMotoInfoWrapper = styled.div<IFormMotoInfo>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
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

  const [buttonFormMotoInfoClicked, setButtonFormMotoInfoClicked] =
    useState("");

  const [showFormMotoInfo, setShowFormMotoInfo] = useState(false);

  const handleButtonClick = (buttonClicked: string) => {
    setButtonFormUserInfoClicked(buttonClicked);
    if (buttonClicked === "next") {
      setShowFormMotoInfo(true);
      setButtonFormMotoInfoClicked("");
    }
  };

  useEffect(() => {
    handleDirectButtonClick
      ? handleDirectButtonClick(buttonFormUserInfoClicked)
      : {};
  }, [buttonFormUserInfoClicked]);

  useEffect(() => {
    if (pageCallback === true) setButtonFormUserInfoClicked("");
  }, [pageCallback]);

  const handleDisplayFormMotoInfo = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormMotoInfo(false);
      setButtonFormMotoInfoClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormUserInfoClicked("");
      }
    }
  };

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
        />
      </FormUserInfoWrapper>
      <FormMotoInfoWrapper showForm={showFormMotoInfo}>
        <FormMotoInfo
          handleButtonClick={handleDisplayFormMotoInfo}
          pageCallback={buttonFormMotoInfoClicked}
        />
      </FormMotoInfoWrapper>
    </form>
  );
};

export default FormXeMay;
