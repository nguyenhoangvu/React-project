import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/rootReducer";

import FormUserInfo from "./FormUserInfo";
import FormCarInfo from "./FormCarInfo";
import FormTNDS from "./FormTNDS";
import FormSummary from "./FormSummary";
import Error from "../../../components/Error";

interface IFormUserInfo {
  hideForm: boolean;
}

const FormUserInfoWrapper = styled.div<IFormUserInfo>`
  display: ${(props) => (props.hideForm === true ? "none" : "block")};
`;

interface IFormCarInfo {
  showForm: boolean;
}

const FormCarInfoWrapper = styled.div<IFormCarInfo>`
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

const FormOto: React.FC<Props> = ({
  handleDirectButtonClick,
  pageCallback,
}) => {
  const [buttonFormUserInfoClicked, setButtonFormUserInfoClicked] =
    useState("");

  const [buttonFormCarInfoClicked, setButtonFormCarInfoClicked] = useState("");
  const [buttonFormTNDSClicked, setButtonFormTNDSClicked] = useState("");
  const [buttonFormListMotoClicked, setButtonFormListMotoClicked] =
    useState("");
  const [buttonFormSummaryClicked, setButtonFormSummaryClicked] = useState("");

  const [showFormCarInfo, setShowFormCarInfo] = useState(false);
  const [showFormTNDS, setShowFormTNDS] = useState(false);
  const [showFormSummary, setShowFormSummary] = useState(false);

  const [productName, setProductName] = useState("product_1");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalProductFromRoot = useSelector(
    (state: RootState) => state.reducer.total_product
  );

  useEffect(() => {
    setProductName("product_" + totalProductFromRoot);
  }, [totalProductFromRoot]);

  // show hide form user info
  const handleButtonClick = (buttonClicked: string) => {
    setButtonFormUserInfoClicked(buttonClicked);
    if (buttonClicked === "next") {
      setShowFormCarInfo(true);
      setButtonFormCarInfoClicked("");
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
  const handleDisplayFormCarInfo = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormCarInfo(false);
      setButtonFormCarInfoClicked(buttonClicked);
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
        setButtonFormCarInfoClicked("");
        setShowFormCarInfo(true);
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
        setButtonFormTNDSClicked("");
        setShowFormTNDS(true);
      } else if (buttonClicked === "next") {
        // setShowFormTNDS(true);
        // setButtonFormTNDSClicked("");
      }
    }
  };

  // validate
  const handleValidate = (isError: boolean, errorMsg: string) => {
    setIsShowError(isError);
    setErrorMsg(errorMsg);
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
          productName={productName}
          handleShowError={handleValidate}
        />
      </FormUserInfoWrapper>
      <FormCarInfoWrapper showForm={showFormCarInfo}>
        <FormCarInfo
          handleButtonClick={handleDisplayFormCarInfo}
          pageCallback={buttonFormCarInfoClicked}
          productName={productName}
          handleShowError={handleValidate}
        />
      </FormCarInfoWrapper>
      <FormTNDSWrapper showForm={showFormTNDS}>
        <FormTNDS
          handleButtonClick={handleDisplayFormTNDS}
          pageCallback={buttonFormTNDSClicked}
          productName={productName}
          handleShowError={handleValidate}
        />
      </FormTNDSWrapper>
      <FormSummaryWrapper showForm={showFormSummary}>
        <FormSummary
          handleButtonClick={handleDisplayFormSummary}
          pageCallback={buttonFormSummaryClicked}
        />
      </FormSummaryWrapper>
      <Error isShowError={isShowError} errorContent={errorMsg} />
    </form>
  );
};

export default FormOto;
