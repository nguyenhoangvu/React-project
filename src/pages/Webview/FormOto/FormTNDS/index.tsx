import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import { calculateEndTime } from "../../../../common/calculateTimeEnd";
import { validate } from "../../../../common/validateInfor";
import "react-calendar/dist/Calendar.css";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormTNDS: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [feeInsurance, setFeeInsurance] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [insuranceToDate, setInsuranceToDate] = useState("");

  const dataRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  const insuranceFromDate = dataRedux.find((o) => o.key === "from_date_tnds");

  const userAddress = useSelector((state: RootState) =>
    state.reducer.userInfo.find((o) => o.key === "user_diachi")
  );

  let fee = dataRedux.find((elem) => elem.key === "phi_total_tnds");

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
      setFeeInsurance(fee.value);
    }
  }, [fee]);

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  useEffect(() => {
    if (insuranceFromDate) {
      let toDate = calculateEndTime(
        insuranceFromDate.value,
        dataRedux.find((o) => o.key === "expired_time_tnds")?.value
      );
      setInsuranceToDate(toDate);
    }
  }, [insuranceFromDate]);

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
          <Row>
            <Col xs="6">
              <DateInput
                inputType="text"
                inputId="bh_oto_tnds_ngay_hl"
                inputName="from_date_tnds"
                inputTitle="hieu_luc"
                labelName="Ngày hiệu lực"
                required={true}
                readonly={true}
                defaultToday={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_oto_tnds_ngay_kt"
                inputName="to_date_tnds"
                inputTitle="ket_thuc"
                labelName="Ngày kết thúc"
                required={true}
                readonly={true}
                inputValueFromProp={insuranceToDate}
                productName={productName}
              />
            </Col>
          </Row>
          <h6>Trách nhiệm dân sự bắt buộc về người</h6>
          <TextInput
            inputType="text"
            inputId="bh_xem_may_tien_nguoibb"
            inputName="phi_tnds"
            inputTitle="phi_tnds"
            labelName=""
            required={false}
            readonly={true}
            inputValueFromProp="150.000.000"
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
            inputValueFromProp="100.000.000"
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
          />
          <TextInput
            inputType="text"
            inputId="bh_oto_dchi_gcn_tnds"
            inputName="gcn_recieve_address"
            inputTitle="dia_chi"
            labelName="Địa chỉ nhận GCN TNDS"
            required={false}
            readonly={true}
            inputValueFromProp={userAddress ? userAddress.value : ""}
            productName={productName}
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
