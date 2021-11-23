import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/rootReducer";

import FormUserInfo from "./FormUserInfo";
import FormInsuredPerson from "./FormInsuredPerson";
import FormProductInfo from "./FormProduct";
import FormHealthStatus from "./FormHealthStatus";
import FormListProducts from "./FormListProducts";
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

interface IFormProductInfo {
  showForm: boolean;
}

const FormProductInfoWrapper = styled.div<IFormProductInfo>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
`;

interface IFormHealthStatus {
  showForm: boolean;
}

const FormHealthStatusWrapper = styled.div<IFormHealthStatus>`
  display: ${(props) => (props.showForm === true ? "block" : "none")};
`;

interface IFormListProducts {
  showForm: boolean;
}

const FormListProductsWrapper = styled.div<IFormListProducts>`
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
  const [buttonFormProductInfoClicked, setButtonFormProductInfoClicked] =
    useState("");
  const [buttonFormHealthStatusClicked, setButtonFormHealthStatusClicked] =
    useState("");
  const [buttonFormListProductsClicked, setButtonFormListProductsClicked] =
    useState("");
  const [buttonFormSummaryClicked, setButtonFormSummaryClicked] = useState("");

  const [showFormInsuredPerson, setShowFormInsuredPerson] = useState(false);
  const [showFormProductInfo, setShowFormProductInfo] = useState(false);
  const [showFormHealthStatus, setShowFormHealthStatus] = useState(false);
  const [showFormListProducts, setShowFormListProducts] = useState(false);
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
      if (showFormListProducts == true) {
        setShowFormListProducts(true);
        setButtonFormListProductsClicked("");
      } else {
        setShowFormInsuredPerson(true);
        setButtonFormInsuredPersonClicked("");
      }
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

  // show hide from insured person
  const handleDisplayFormInsuredPerson = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormInsuredPerson(false);
      setButtonFormInsuredPersonClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormUserInfoClicked("");
      } else if (buttonClicked === "next") {
        setShowFormProductInfo(true);
        setButtonFormProductInfoClicked("");
      }
    }
  };

  // show hide from product info
  const handleDisplayFormProductInfo = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormProductInfo(false);
      setButtonFormProductInfoClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormInsuredPersonClicked("");
        setShowFormInsuredPerson(true);
      } else if (buttonClicked === "next") {
        setShowFormHealthStatus(true);
        setButtonFormHealthStatusClicked("");
        setaddProductButtonCallback(false);
      }
    }
  };

  const handleDisplayFormHealthStatus = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormHealthStatus(false);
      setButtonFormHealthStatusClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormProductInfoClicked("");
        setShowFormProductInfo(true);
      } else if (buttonClicked === "next") {
        setShowFormListProducts(true);
        setButtonFormListProductsClicked("");
      }
    }
  };

  // show hide from ListProducts
  const handleDisplayFormListProducts = (buttonClicked: string) => {
    if (buttonClicked) {
      setShowFormListProducts(false);
      setButtonFormListProductsClicked(buttonClicked);
      if (buttonClicked === "back") {
        setButtonFormUserInfoClicked("");
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
        setButtonFormListProductsClicked("");
        setShowFormListProducts(true);
      } else if (buttonClicked === "next") {
        // setShowFormProductInfo(true);
        // setButtonFormProductInfoClicked("");
      }
    }
  };

  // add more product
  const handleAddMoreProduct = (isAddMore: boolean) => {
    if (isAddMore === true) {
      setShowFormInsuredPerson(isAddMore);
      setShowFormProductInfo(!isAddMore);
      setShowFormListProducts(!isAddMore);
      setButtonFormInsuredPersonClicked("");
      setaddProductButtonCallback(isAddMore);
    }
  };

  // modify product
  const handleModifyProduct = (isModify: boolean, productIndex: number) => {
    if (isModify && productIndex) {
      setShowFormInsuredPerson(isModify);
      setShowFormProductInfo(!isModify);
      setShowFormListProducts(!isModify);
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
      <FormProductInfoWrapper showForm={showFormProductInfo}>
        <FormProductInfo
          handleButtonClick={handleDisplayFormProductInfo}
          pageCallback={buttonFormProductInfoClicked}
          productName={productName}
          isAddProductButtonClicked={addProductButtonCallback}
          handleShowError={handleValidate}
        />
      </FormProductInfoWrapper>
      <FormHealthStatusWrapper showForm={showFormHealthStatus}>
        <FormHealthStatus
          handleButtonClick={handleDisplayFormHealthStatus}
          pageCallback={buttonFormHealthStatusClicked}
          productName={productName}
          isAddProductButtonClicked={addProductButtonCallback}
          handleShowError={handleValidate}
        />
      </FormHealthStatusWrapper>
      <FormListProductsWrapper showForm={showFormListProducts}>
        <FormListProducts
          handleButtonClick={handleDisplayFormListProducts}
          pageCallback={buttonFormListProductsClicked}
          handleAddMoreProduct={handleAddMoreProduct}
          buttonAddProductCallback={addProductButtonCallback}
          handleModifyProduct={handleModifyProduct}
          handleShowError={handleValidate}
        />
      </FormListProductsWrapper>
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
