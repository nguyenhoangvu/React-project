import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormUserInfo from "./FormUserInfo";
import FormMotoInfo from "./FormMotoInfo";
import FormTNDS from "./FormTNDS";
import FormListMoto from "./FormListMoto";
import FormSummary from "./FormSummary";

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

interface IFormTNDS {
  showForm: boolean;
}

const FormTNDSWrapper = styled.div<IFormTNDS>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
`;

interface IFormListMoto {
  showForm: boolean;
}

const FormListMotoWrapper = styled.div<IFormListMoto>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
`;

interface IFormSummary {
  showForm: boolean;
}

const FormSummaryWrapper = styled.div<IFormSummary>`
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
  const [buttonFormTNDSClicked, setButtonFormTNDSClicked] = useState("");
  const [buttonFormListMotoClicked, setButtonFormListMotoClicked] =
    useState("");
  const [buttonFormSummaryClicked, setButtonFormSummaryClicked] = useState("");

  const [showFormMotoInfo, setShowFormMotoInfo] = useState(false);
  const [showFormTNDS, setShowFormTNDS] = useState(false);
  const [showFormListMoto, setShowFormListMoto] = useState(false);
  const [showFormSummary, setShowFormSummary] = useState(false);

  // show hide form user info
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

  // show hide from moto info
  const handleDisplayFormMotoInfo = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormMotoInfo(false);
      setButtonFormMotoInfoClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormUserInfoClicked("");
      } else if (buttonClicked === "next") {
        setShowFormTNDS(true);
        setButtonFormTNDSClicked("");
      }
    }
  };

  // show hide from TNDS
  const handleDisplayFormTNDS = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormTNDS(false);
      setButtonFormTNDSClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormMotoInfoClicked("");
        setShowFormMotoInfo(true);
      } else if (buttonClicked === "next") {
        setShowFormListMoto(true);
        setButtonFormListMotoClicked("");
      }
    }
  };

  // show hide from ListMoto
  const handleDisplayFormListMoto = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormListMoto(false);
      setButtonFormListMotoClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormTNDSClicked("");
        setShowFormTNDS(true);
      } else if (buttonClicked === "next") {
        setShowFormSummary(true);
        setButtonFormSummaryClicked("");
      }
    }
  };

  // show hide from Summary
  const handleDisplayFormSummary = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormSummary(false);
      setButtonFormSummaryClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormListMotoClicked("");
        setShowFormListMoto(true);
      } else if (buttonClicked === "next") {
        // setShowFormTNDS(true);
        // setButtonFormTNDSClicked("");
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
      <FormTNDSWrapper showForm={showFormTNDS}>
        <FormTNDS
          handleButtonClick={handleDisplayFormTNDS}
          pageCallback={buttonFormTNDSClicked}
        />
      </FormTNDSWrapper>
      <FormListMotoWrapper showForm={showFormListMoto}>
        <FormListMoto
          handleButtonClick={handleDisplayFormListMoto}
          pageCallback={buttonFormListMotoClicked}
        />
      </FormListMotoWrapper>
      <FormSummaryWrapper showForm={showFormSummary}>
        <FormSummary
          handleButtonClick={handleDisplayFormSummary}
          pageCallback={buttonFormSummaryClicked}
        />
      </FormSummaryWrapper>
    </form>
  );
};

export default FormXeMay;