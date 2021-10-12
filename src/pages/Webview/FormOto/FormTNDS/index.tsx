import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { MODIFYORDERID } from "../../../../redux/types";
import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import CheckBox from "../../../../components/CheckBox";
import { formatFee } from "../../../../common/formatFee";
import { validate } from "../../../../common/validateInfor";
import "react-calendar/dist/Calendar.css";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  isAddProductButtonClicked?: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormTNDS: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  isAddProductButtonClicked,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [feeInsurance, setFeeInsurance] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dataRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  let fee = dataRedux.find(
    (elem) => elem.key === "phi_bh_tnds" && elem.productName === productName
  );

  const listInputMustValidate = useSelector(
    (state: RootState) => state.reducer.listInputMustValidate
  );

  const handleDisplayForm = (buttonClicked: string) => {
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      let listInput = listInputMustValidate.filter((o) =>
        o.key.includes("tnds")
      );
      let test = validate(listInput, dataRedux, productName);
      if (test !== "") {
        setIsShowError(!isShowError);
        setErrorMsg(test);
      } else {
        setButtonClick(buttonClicked);
      }
    }
  };

  useEffect(() => {
    if (fee !== undefined) {
      let feeFormat = formatFee(fee.value);
      setFeeInsurance(feeFormat);
    }
  }, [fee]);

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
                isResetValue={isAddProductButtonClicked}
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
                isResetValue={isAddProductButtonClicked}
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
            isResetValue={isAddProductButtonClicked}
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
            isResetValue={isAddProductButtonClicked}
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
            inputName="phi_bh_tnds"
            inputTitle="phi_bh_tnds"
            labelName="Phí bảo hiểm (đã gồm VAT)"
            required={false}
            readonly={true}
            productName={productName}
            inputValueFromProp={feeInsurance}
            isResetValue={isAddProductButtonClicked}
          />
          <div style={{ width: "100%", height: "10vh" }}></div>
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

export default FormTNDS;
