import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/rootReducer";

import FormUserInfo from "./FormUserInfo";
import FormInsuredPerson from "./FormInsuredPerson";
import FormTNDS from "./FormProduct";
import FormHealthStatus from "./FormHealthStatus";
import FormListMoto from "./FormListProducts";
import FormSummary from "./FormSummary";
import Error from "../../../components/Error";

interface IFormUserInfo {
  hideForm: boolean;
}

const FormUserInfoWrapper = styled.div<IFormUserInfo>`
  display: ${(props) => (props.hideForm === true ? "none" : "block")};
`;

interface IFormInsuredPerson {
  showForm: boolean;
}

const FormInsuredPersonWrapper = styled.div<IFormInsuredPerson>`
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

const FormSucKhoe: React.FC<Props> = ({
  handleDirectButtonClick,
  pageCallback,
}) => {
  const [buttonFormUserInfoClicked, setButtonFormUserInfoClicked] =
    useState("");

  const [buttonFormInsuredPersonClicked, setButtonFormInsuredPersonClicked] =
    useState("");
  const [buttonFormTNDSClicked, setButtonFormTNDSClicked] = useState("");
  const [buttonFormListMotoClicked, setButtonFormListMotoClicked] =
    useState("");
  const [buttonFormSummaryClicked, setButtonFormSummaryClicked] = useState("");

  const [showFormInsuredPerson, setShowFormInsuredPerson] = useState(false);
  const [showFormTNDS, setShowFormTNDS] = useState(false);
  const [showFormListMoto, setShowFormListMoto] = useState(false);
  const [showFormSummary, setShowFormSummary] = useState(false);
  const [addProductButtonCallback, setaddProductButtonCallback] =
    useState(false);
  const [productName, setProductName] = useState("product_1");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalProductFromRoot = useSelector(
    (state: RootState) => state.reducer.total_product
  );

  const modifyProductFromRoot = useSelector(
    (state: RootState) => state.reducer.modify_product
  );

  const listProductFromRoot = useSelector((state: RootState) => state);

  useEffect(() => {
    console.log("vu listProductFromRoot: ", listProductFromRoot);
  }, [listProductFromRoot]);

  useEffect(() => {
    if (modifyProductFromRoot !== 0) {
      setProductName("product_" + modifyProductFromRoot);
    } else setProductName("product_" + totalProductFromRoot);
  }, [totalProductFromRoot, modifyProductFromRoot]);

  // show hide form user info
  const handleButtonClick = (buttonClicked: string) => {
    setButtonFormUserInfoClicked(buttonClicked);
    if (buttonClicked === "next") {
      setShowFormInsuredPerson(true);
      setButtonFormInsuredPersonClicked("");
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
  const handleDisplayFormInsuredPerson = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormInsuredPerson(false);
      setButtonFormInsuredPersonClicked(buttonClicked);
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
        setButtonFormInsuredPersonClicked("");
        setShowFormInsuredPerson(true);
      } else if (buttonClicked === "next") {
        setShowFormListMoto(true);
        setButtonFormListMotoClicked("");
        setaddProductButtonCallback(false);
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

  // add more product
  const handleAddMoreProduct = (isAddMore: boolean) => {
    if (isAddMore === true) {
      setShowFormInsuredPerson(isAddMore);
      setShowFormTNDS(!isAddMore);
      setShowFormListMoto(!isAddMore);
      setButtonFormInsuredPersonClicked("");
      setaddProductButtonCallback(isAddMore);
    }
  };

  // modify product
  const handleModifyProduct = (isModify: boolean, productIndex: number) => {
    if (isModify && productIndex) {
      setShowFormInsuredPerson(isModify);
      setShowFormTNDS(!isModify);
      setShowFormListMoto(!isModify);
      setButtonFormInsuredPersonClicked("");
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
      <FormInsuredPersonWrapper showForm={showFormInsuredPerson}>
        <FormInsuredPerson
          handleButtonClick={handleDisplayFormInsuredPerson}
          pageCallback={buttonFormInsuredPersonClicked}
          productName={productName}
          isAddProductButtonClicked={addProductButtonCallback}
          handleShowError={handleValidate}
        />
      </FormInsuredPersonWrapper>
      <FormTNDSWrapper showForm={showFormTNDS}>
        <FormTNDS
          handleButtonClick={handleDisplayFormTNDS}
          pageCallback={buttonFormTNDSClicked}
          productName={productName}
          isAddProductButtonClicked={addProductButtonCallback}
          handleShowError={handleValidate}
        />
      </FormTNDSWrapper>
      <FormListMotoWrapper showForm={showFormListMoto}>
        <FormListMoto
          handleButtonClick={handleDisplayFormListMoto}
          pageCallback={buttonFormListMotoClicked}
          handleAddMoreProduct={handleAddMoreProduct}
          buttonAddProductCallback={addProductButtonCallback}
          handleModifyProduct={handleModifyProduct}
          handleShowError={handleValidate}
        />
      </FormListMotoWrapper>
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

export default FormSucKhoe;