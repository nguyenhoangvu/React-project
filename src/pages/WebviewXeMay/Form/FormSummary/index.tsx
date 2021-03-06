import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import CheckBox from "../../../../components/CheckBox";
import ModalCheck from "../../../../components/ModalCheck";
import HrLine from "../../../../components/HrLine";
import data from "../../../../json/select-dropdown.json";
import { payment } from "../../../../common/payment";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
};

const SummaryInfoWrapper = styled.div`
  margin-top: 1.875rem;
  font-size: 14px;
`;

const BTitlte = styled.b`
  color: #005790;
  font-weight: 700;
`;

const SummaryInfo = styled.div`
  padding-left: 1rem;
`;

const TotalFee = styled.div`
  margin: 40px 0;
`;

const TotalFeeSpan = styled.span`
  color: #f44336;
`;

const TextTerm = styled.p`
  text-align: justify;
  color: #f44336;
  padding: 0 0.75rem;
`;

const CheckTerm = styled.div`
  text-align: justify;
  padding: 0 0.75rem;
`;

const FormSummary: React.FC<Props> = ({ handleButtonClick, pageCallback }) => {
  const [buttonClick, setButtonClick] = useState("");
  const [checkTerm, setCheckTerm] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const dataRedux = useSelector((state: RootState) => state.reducer);

  const handleDisplayForm = (buttonClicked: string) => {
    setButtonClick(buttonClicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  const handleCheckboxChecked = (checked: boolean) => {
    setCheckTerm(checked);
  };

  const handlePayment = (isPaymentClicked: boolean) => {
    setShowModalCheck(isPaymentClicked);
  };

  const handleModalCheckClose = (closes: boolean) => {
    setShowModalCheck(closes);
  };

  const handleModalPaymentClicked = (isClicked: boolean) => {
    if (isClicked === true) {
      let totalFee = dataRedux.listProducts.find(
        (o) => o.key === "total_fee_tnds"
      );
      if (totalFee) payment(dataRedux, totalFee.value);
    }
  };

  const RenderListProduct = () => {
    let listProducts = [];
    for (let i = 1; i <= dataRedux.total_product; i++) {
      let product_name = "product_" + i;
      let product = dataRedux.listProducts.filter(
        (o) => o.productName === product_name
      );
      let motoPlate = product.find((o) => o.key === "moto_plate");
      let motoOwner = product.find((o) => o.key === "cx_name");
      let motoVolumn = product.find((o) => o.key === "moto_volumn");
      let motoType = data.Loai_xe.find((o) => o.key == motoVolumn?.value);
      let obj = {
        motoOwner: motoOwner?.value,
        motoPlate: motoPlate?.value,
        motoType: motoType?.value,
        index: i,
      };
      listProducts.push(obj);
    }

    const ContentMotos = listProducts.map((obj: any) => (
      <div data-index={obj.index} key={obj.index}>
        <SummaryInfo>
          <b>Ch??? xe:</b> <span>{obj.motoOwner}</span>
        </SummaryInfo>
        <SummaryInfo>
          <b>Bi???n ki???m so??t:</b> <span>{obj.motoPlate}</span>
        </SummaryInfo>
        <SummaryInfo>
          <b>Lo???i xe:</b> <span>{obj.motoType}</span>
        </SummaryInfo>
        <HrLine />
      </div>
    ));

    return <div>{ContentMotos}</div>;
  };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5 style={{ padding: "0 0.75rem" }}>Th??ng tin ????n b???o hi???m</h5>
          <div>
            <SummaryInfoWrapper>
              <BTitlte>Th??ng tin kh??ch</BTitlte>
              <SummaryInfo>
                <b>H??? t??n:</b>{" "}
                <span>
                  {dataRedux.userInfo.find((o) => o.key === "user_name")?.value}
                </span>
              </SummaryInfo>
              <SummaryInfo>
                <b>Email:</b>{" "}
                <span>
                  {
                    dataRedux.userInfo.find((o) => o.key === "user_email")
                      ?.value
                  }
                </span>
              </SummaryInfo>
              <SummaryInfo>
                <b>??i???n tho???i:</b>{" "}
                <span>
                  {
                    dataRedux.userInfo.find((o) => o.key === "user_phone")
                      ?.value
                  }
                </span>
              </SummaryInfo>
              <SummaryInfo>
                <b>?????a ch??? nh???n:</b>{" "}
                <span>
                  {
                    dataRedux.listProducts.find(
                      (o) => o.key === "gcn_recieve_address"
                    )?.value
                  }
                </span>
              </SummaryInfo>
            </SummaryInfoWrapper>
            <SummaryInfoWrapper>
              <BTitlte>Th??ng tin m?? t??, xe m??y</BTitlte>
              <RenderListProduct />
            </SummaryInfoWrapper>
            <TotalFee>
              <BTitlte>T???ng ph?? thanh to??n: </BTitlte>{" "}
              <TotalFeeSpan>
                {
                  dataRedux.listProducts.find((o) => o.key === "total_fee_tnds")
                    ?.value
                }
              </TotalFeeSpan>{" "}
              <BTitlte>VN??</BTitlte>
            </TotalFee>
            <div>
              <TextTerm>
                Gi???y ch???ng nh???n b???o hi???m ???????c c???p theo Ngh??? ?????nh 03/2021/N??-CP
                ng??y 15 th??ng 01 n??m 2021 c???a ch??nh ph??? v??? b???o hi???m b???t bu???c
                TNDS c???a ch??? xe c?? gi???i v?? th??ng t?? s??? 04/2021/TT-BTC ng??y 15
                th??ng 01 n??m 2021 c???a b??? t??i ch??nh quy ?????nh chi ti???t m???t s??? ??i???u
                c???a ngh??? ?????nh s??? 03/2021/N??-CP.&nbsp;
              </TextTerm>
            </div>
            <CheckTerm>
              <CheckBox
                checkboxId="check_dieu_khoan"
                checkboxText="
              T??i cam k???t c??c th??ng tin khai b??o l?? ch??nh x??c &amp; ch???u
              tr??ch nhi???m v??? c??c th??ng tin tr??n. T??i ???? ?????c, hi???u v??
              ?????ng ?? v???i c??c
              "
                productName=""
                handleCheckboxChecked={handleCheckboxChecked}
              />
            </CheckTerm>

            <div style={{ height: "150px" }}></div>
          </div>
          <ModalCheck
            onShow={showModalCheck}
            handleModalClose={handleModalCheckClose}
            major={dataRedux.nv}
            handlePaymentClicked={handleModalPaymentClicked}
          />
          <DirectButton
            handleButtonClick={handleDisplayForm}
            buttonCallback={buttonClick}
            isPay={true}
            isSummaryPage={true}
            isCheckTerm={checkTerm}
            handlePayment={handlePayment}
            buttonPaymentCallback={showModalCheck}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FormSummary;
