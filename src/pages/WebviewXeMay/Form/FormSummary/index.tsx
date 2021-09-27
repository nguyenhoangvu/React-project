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
          <b>Chủ xe:</b> <span>{obj.motoOwner}</span>
        </SummaryInfo>
        <SummaryInfo>
          <b>Biển kiểm soát:</b> <span>{obj.motoPlate}</span>
        </SummaryInfo>
        <SummaryInfo>
          <b>Loại xe:</b> <span>{obj.motoType}</span>
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
          <h5 style={{ padding: "0 0.75rem" }}>Thông tin đơn bảo hiểm</h5>
          <div>
            <SummaryInfoWrapper>
              <BTitlte>Thông tin khách</BTitlte>
              <SummaryInfo>
                <b>Họ tên:</b>{" "}
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
                <b>Điện thoại:</b>{" "}
                <span>
                  {
                    dataRedux.userInfo.find((o) => o.key === "user_phone")
                      ?.value
                  }
                </span>
              </SummaryInfo>
              <SummaryInfo>
                <b>Địa chỉ nhận:</b>{" "}
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
              <BTitlte>Thông tin mô tô, xe máy</BTitlte>
              <RenderListProduct />
            </SummaryInfoWrapper>
            <TotalFee>
              <BTitlte>Tổng phí thanh toán: </BTitlte>{" "}
              <TotalFeeSpan>
                {
                  dataRedux.listProducts.find((o) => o.key === "total_fee_tnds")
                    ?.value
                }
              </TotalFeeSpan>{" "}
              <BTitlte>VNĐ</BTitlte>
            </TotalFee>
            <div>
              <TextTerm>
                Giấy chứng nhận bảo hiểm được cấp theo Nghị định 03/2021/NĐ-CP
                ngày 15 tháng 01 năm 2021 của chính phủ về bảo hiểm bắt buộc
                TNDS của chủ xe cơ giới và thông tư số 04/2021/TT-BTC ngày 15
                tháng 01 năm 2021 của bộ tài chính quy định chi tiết một số điều
                của nghị định số 03/2021/NĐ-CP.&nbsp;
              </TextTerm>
            </div>
            <CheckTerm>
              <CheckBox
                checkboxId="check_dieu_khoan"
                checkboxText="
              Tôi cam kết các thông tin khai báo là chính xác &amp; chịu
              trách nhiệm về các thông tin trên. Tôi đã đọc, hiểu và
              đồng ý với các
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
            modalContent="Thông tin đơn bảo hiểm mô tô, xe máy sẽ không thể sửa đổi khi Quý
            khách tiếp tục. Quý khách có muốn tiếp tục?"
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
