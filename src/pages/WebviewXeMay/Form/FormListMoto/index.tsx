import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../../../redux/store/rootReducer";
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

const FormListMoto: React.FC<Props> = ({
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
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      let motoPlate = product.find((o) => o.key === "moto_plate");
      let fromDate = product.find((o) => o.key === "from_date_tnds");
      let fee = product.find((o) => o.key === "phi_bh_tnds");
      if (fee !== undefined) {
        product_fee = formatFee(fee.value);
      }
      let obj = {
        motoPlate: motoPlate?.value,
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
              inputId="sum_moto_plate"
              inputName="sum_moto_plate"
              inputTitle="Biển số xe"
              labelName="Biển số xe"
              required={false}
              readonly={true}
              productName=""
              inputValueFromProp={obj.motoPlate}
              summaryText={true}
            />
            <Row>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="sum_from_date"
                  inputName="sum_from_date"
                  inputTitle="Hiệu lực kể từ"
                  labelName="Hiệu lực kể từ"
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
                  inputId="sum_fee"
                  inputName="sum_fee"
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

export default FormListMoto;
