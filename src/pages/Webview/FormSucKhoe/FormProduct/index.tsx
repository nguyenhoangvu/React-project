import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { MODIFYORDERID, ADDPRODUCTINFORS } from "../../../../redux/types";
import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import { formatFee } from "../../../../common/formatFee";
import { validate } from "../../../../common/validateInfor";
import { calculateEndTime } from "../../../../common/calculateTimeEnd";
import { calculateFeeHealth } from "../../../../adapters/apis/healthAPIs";
import { calculateTotalFeeHealth } from "../../../../common/calculateFeeHealth";
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
  const [insuranceToDate, setInsuranceToDate] = useState("");
  const [data, setData] = useState<any>([]);

  const dispatch = useDispatch();

  const dataRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  const category = useSelector((state: RootState) => state.reducer.nv);

  const insuranceFromDate = dataRedux.find(
    (o) => o.key === "from_date_tnds" && o.productName === productName
  );
  let packageInsurance = dataRedux.find(
    (o) => o.key === "insured_package" && o.productName === productName
  );
  let customerBirthday = dataRedux.find(
    (o) => o.key === "insured_birthday" && o.productName === productName
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

  useEffect(() => {
    if (insuranceFromDate) {
      let toDate = calculateEndTime(insuranceFromDate.value, 1);
      setInsuranceToDate(toDate);
    }
  }, [insuranceFromDate]);

  useEffect(() => {
    if (packageInsurance && customerBirthday) {
      let pairedPackage = calculateTotalFeeHealth(
        data,
        packageInsurance.value,
        customerBirthday.value
      );
      if (pairedPackage) {
        let fee = formatFee(pairedPackage.fee.toString());
        setFeeInsurance(fee);
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: "phi_bhsk",
            value: pairedPackage.fee,
            productName: productName,
          },
        });
      }
    }
  }, [packageInsurance, customerBirthday]);

  useEffect(() => {
    if (category && category != "") {
      calculateFeeHealth(category).then((res: any) => {
        if (!res.isError && res.resultCode == "00") {
          setData(res.result);
        }
      });
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Thông tin người được bảo hiểm</h5>
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
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="frm_bhsk_goi_bh_ndbh"
                inputName="insured_package"
                inputTitle="Gói bảo hiểm"
                labelName="Gói bảo hiểm"
                required={true}
                readonly={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_xe_may_phi_nguoibb"
                inputName="phi_bh_tnds"
                inputTitle="phi_bh_tnds"
                labelName="Phí bảo hiểm"
                required={true}
                readonly={true}
                productName={productName}
                inputValueFromProp={feeInsurance}
                isResetValue={isAddProductButtonClicked}
              />
            </Col>
          </Row>
          <TextInput
            inputType="text"
            inputId="frm_bhsk_so_hd_cu_ndbh"
            inputName="insured_oldContract"
            inputTitle="Số HĐ cũ"
            labelName="Số HĐ cũ"
            required={false}
            productName={productName}
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
