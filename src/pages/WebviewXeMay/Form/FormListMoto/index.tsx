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

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  handleAddMoreProduct?: (add: boolean) => void;
  buttonAddProductCallback: boolean;
};

const TotalFeeStyle = styled.div`
  color: #2196f3;
`;

const FormListMoto: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  handleAddMoreProduct,
  buttonAddProductCallback,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [buttonAddProductClick, setButtonAddProductClick] = useState(false);
  const [totalFee, setTotalFee] = useState("");
  const dataRedux = useSelector((state: RootState) => state.reducer);

  let totalFeeFromRoot = dataRedux.listProducts.find(
    (o) => o.key === "total_fee_tnds"
  );

  const handleDisplayForm = (buttonClicked: string) => {
    setButtonClick(buttonClicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  const handleClickAddProductButton = (clicked: boolean) => {
    setButtonAddProductClick(clicked);
  };

  useEffect(() => {
    handleAddMoreProduct ? handleAddMoreProduct(buttonAddProductClick) : {};
  }, [buttonAddProductClick]);

  useEffect(() => {
    if (totalFeeFromRoot !== undefined) {
      let fee = formatFee(totalFeeFromRoot.value);
      setTotalFee(fee);
    }
  }, [totalFeeFromRoot]);

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
                <ButtonSummary buttonTitle="Sửa" />
              </Col>
              <Col xs="6" style={{ textAlign: "center" }}>
                <ButtonSummary buttonTitle="Xóa" />
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
        </Col>
      </Row>
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={buttonClick}
        isPay={false}
        isSummaryPage={false}
      />
    </Container>
  );
};

export default FormListMoto;
