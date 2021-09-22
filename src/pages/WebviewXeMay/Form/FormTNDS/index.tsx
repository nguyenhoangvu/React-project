import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import CheckBox from "../../../../components/CheckBox";

import "react-calendar/dist/Calendar.css";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
};

const FormTNDS: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const dataRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
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

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Trách nhiệm dân sự</h5>
          <Row>
            <Col xs="6">
              <DateInput
                inputType="text"
                inputId="bh_xe_may_tnds_ngay_hl"
                inputName="from_date_tnds"
                inputTitle="hieu_luc"
                labelName="Hiệu lực từ ngày"
                required={true}
                readonly={true}
                defaultToday={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="bh_xe_may_tnds_thoi_han"
                inputName="expired_time_tnds"
                inputTitle="Thời hạn"
                labelName="Thời hạn"
                required={true}
                readonly={true}
                productName={productName}
              />
            </Col>
          </Row>
          <TextInput
            inputType="time"
            inputId="frm_bh_xe_may_gio_hl"
            inputName="from_time_tnds"
            inputTitle="gio_hl"
            labelName="Giờ hiệu lực"
            required={true}
            productName={productName}
          />
          <h6>Trách nhiệm dân sự bắt buộc về người</h6>
          <TextInput
            inputType="text"
            inputId="bh_xem_may_tien_nguoibb"
            inputName="phi_tnds"
            inputTitle="phi_tnds"
            labelName=""
            required={false}
            readonly={true}
            inputValueFromProp="150.000.000/ 1 người/ 1 vụ"
            productName={productName}
          />
          <h6>Trách nhiệm dân sự bắt buộc về tài sản</h6>
          <TextInput
            inputType="text"
            inputId="bh_xe_may_tien_xebb"
            inputName="phi_tnds"
            inputTitle="phi_tnds"
            labelName=""
            required={false}
            readonly={true}
            inputValueFromProp="50.000.000/ 1 vụ tai nạn"
            productName={productName}
          />
          <CheckBox
            checkboxId="nguoi_t3_tnds"
            checkboxText="Tai nạn người ngồi trên xe"
            productName={productName}
          />
          <TextInput
            inputType="text"
            inputId="bh_xe_may_tien_xebb"
            inputName="phi_tnds"
            inputTitle="phi_tnds"
            labelName=""
            required={false}
            readonly={true}
            inputValueFromProp="10.000.000/ 1 người/ 1 vụ"
            productName={productName}
          />

          <TextInput
            inputType="text"
            inputId="bh_xe_may_phi_nguoibb"
            inputName="tong_phi_tnds"
            inputTitle="tong_phi_tnds"
            labelName="Phí bảo hiểm (đã gồm VAT)"
            required={false}
            readonly={true}
            productName={productName}
            inputValueFromProp={
              dataRedux.find(
                (elem: any) =>
                  elem.key === "tong_phi_tnds" &&
                  elem.productName === productName
              )?.value
            }
          />
          <div
            style={{ width: "100%", height: "20px", position: "absolute" }}
          ></div>
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

export default FormTNDS;
