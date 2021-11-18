import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../../../redux/store/rootReducer";
import { MODIFYORDERID } from "../../../../redux/types";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import ButtonSummary from "../../../../components/ButtonSummary";
import HrLine from "../../../../components/HrLine";
import ButtonBuy from "../../../../components/ButtonBuy";
import { formatFee } from "../../../../common/formatFee";
import { motoInfo } from "../../../../utils/objectMoto";
import { generateSignature } from "../../../../adapters/apis/commonAPIs";
import { createMotoContract } from "../../../../adapters/apis/motoAPIs";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  handleAddMoreProduct?: (add: boolean) => void;
  handleModifyProduct?: (modify: boolean, productIndex: number) => void;
  buttonAddProductCallback: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const TotalFeeStyle = styled.div`
  color: #2196f3;
`;

const FormListProducts: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  handleAddMoreProduct,
  buttonAddProductCallback,
  handleModifyProduct,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [buttonAddProductClick, setButtonAddProductClick] = useState(false);
  const [totalFee, setTotalFee] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.reducer);

  let totalFeeFromRoot = dataRedux.listProducts.find(
    (o) => o.key === "total_fee_tnds"
  );

  const handleDisplayForm = (buttonClicked: string) => {
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      let productInfos = motoInfo(dataRedux);
      generateSignature(productInfos)
        .then((res: any) => {
          if (!res.isError) {
            productInfos.signature = res.result.signature;
            createMotoContract(productInfos)
              .then((response: any) => {
                if (!response.isError && response.result.orderId !== "") {
                  let totalFee = formatFee(response.result.feeAmount);
                  setOrderId(response.result.orderId);
                  if (totalFeeFromRoot) {
                    if (totalFee.localeCompare(totalFeeFromRoot.value) == 0) {
                      setButtonClick(buttonClicked);
                    } else {
                      setIsShowError(true);
                      setErrorMsg("Lỗi tính phí xe");
                    }
                  }
                }
              })
              .catch((err) => {
                setIsShowError(true);
                setErrorMsg("Lỗi nhập xe");
              });
          }
        })
        .catch((err) => {
          setIsShowError(true);
          setErrorMsg("Lỗi nhập xe");
        });
    }
  };

  useEffect(() => {
    dispatch({
      type: MODIFYORDERID,
      payload: orderId,
    });
  }, [orderId]);

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  useEffect(() => {
    handleShowError ? handleShowError(isShowError, errorMsg) : {};
    let timer1: any;
    if (isShowError === true) {
      timer1 = setTimeout(() => setIsShowError(!isShowError), 3000);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [isShowError, errorMsg]);

  const handleClickAddProductButton = (clicked: boolean) => {
    setButtonAddProductClick(clicked);
  };

  useEffect(() => {
    handleAddMoreProduct ? handleAddMoreProduct(buttonAddProductClick) : {};
  }, [buttonAddProductClick]);

  useEffect(() => {
    if (totalFeeFromRoot !== undefined) {
      setTotalFee(totalFeeFromRoot.value);
    }
  }, [totalFeeFromRoot]);

  const handleIsUpdateProduct = (isModify: boolean, productIndex: number) => {
    handleModifyProduct ? handleModifyProduct(isModify, productIndex) : {};
  };

  const RenderTotalProducts = () => {
    let ListProducts = [];
    for (let i = 1; i <= dataRedux.total_product; i++) {
      let product_name = "product_" + i;
      let product_fee = "";
      let product = dataRedux.listProducts.filter(
        (o) => o.productName === product_name
      );
      let customerName = product.find((o) => o.key === "insured_name");
      let customerIndentity = product.find(
        (o) => o.key === "insured_indentity"
      );
      let packageInsurance = product.find((o) => o.key === "package_insurance");
      let fromDate = product.find((o) => o.key === "from_date_tnds");
      let fee = product.find((o) => o.key === "phi_bhsk");
      if (fee !== undefined) {
        product_fee = formatFee(fee.value);
      }
      let obj = {
        customerName: customerName?.value,
        customerIndentity: customerIndentity?.value,
        packageInsurance: packageInsurance?.value,
        fromDate: fromDate?.value,
        fee: product_fee + " VNĐ",
        index: i,
      };
      ListProducts.push(obj);
    }

    const ContentMotos = ListProducts.map((obj: any) => (
      <Container data-index={obj.index} key={obj.index}>
        <Row>
          <Col xs="12">
            <TextInput
              inputType="text"
              inputId="sum_customer_name"
              inputName="sum_customer_name"
              inputTitle="Tên khách hàng"
              labelName="Tên khách hàng"
              required={false}
              readonly={true}
              productName=""
              inputValueFromProp={obj.customerName}
              summaryText={true}
            />
            <Row>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="sum_customer_identity"
                  inputName="sum_customer_identity"
                  inputTitle="CMT/Hộ chiếu"
                  labelName="CMT/Hộ chiếu"
                  required={false}
                  readonly={true}
                  productName=""
                  inputValueFromProp={obj.customerIndentity}
                  summaryText={true}
                />
              </Col>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="sum_from_date"
                  inputName="sum_from_date"
                  inputTitle="Hiệu lực 1 năm từ"
                  labelName="Hiệu lực 1 năm từ"
                  required={false}
                  readonly={true}
                  productName=""
                  inputValueFromProp={obj.fromDate}
                  summaryText={true}
                />
              </Col>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="sum_package_insurance"
                  inputName="sum_package_insurance"
                  inputTitle="Gói bảo hiểm"
                  labelName="Gói bảo hiểm"
                  required={false}
                  readonly={true}
                  productName=""
                  inputValueFromProp={obj.packageInsurance}
                  summaryText={true}
                />
              </Col>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="sum_insurance_fee"
                  inputName="sum_insurance_fee"
                  inputTitle="Phí bảo hiểm"
                  labelName="Phí bảo hiểm"
                  required={false}
                  readonly={true}
                  productName=""
                  inputValueFromProp={obj.fee}
                  summaryText={true}
                />
              </Col>
              <Col xs="6" style={{ textAlign: "center" }}>
                <ButtonSummary
                  productIndex={obj.index}
                  buttonTitle="Sửa"
                  handleIsUpdateProduct={handleIsUpdateProduct}
                />
              </Col>
              <Col xs="6" style={{ textAlign: "center" }}>
                <ButtonSummary productIndex={obj.index} buttonTitle="Xóa" />
              </Col>
            </Row>
          </Col>
        </Row>
        <HrLine />
      </Container>
    ));

    return <div>{ContentMotos}</div>;
  };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Danh sách xe được bảo hiểm</h5>
          <RenderTotalProducts />
          <TotalFeeStyle>Tổng phí: {totalFee} VNĐ</TotalFeeStyle>
          <ButtonBuy
            handleClickButton={handleClickAddProductButton}
            pageCallback={false}
            buttonIcon="plus"
            buttonLable="Thêm Xe BH"
            buttonPlusCallBack={buttonAddProductCallback}
          />
          <div style={{ width: "100%", height: "150px" }}></div>
        </Col>
      </Row>
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={buttonClick}
        isPay={false}
        isSummaryPage={false}
        isValidateFalse={isShowError}
      />
    </Container>
  );
};

export default FormListProducts;
