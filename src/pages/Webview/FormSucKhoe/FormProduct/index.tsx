import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { MODIFYORDERID, ADDPRODUCTINFORS } from "../../../../redux/types";
import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import NavigateButton from "../../../../components/NavigateButton";
import CheckBox from "../../../../components/CheckBox";
import { formatFee } from "../../../../common/formatFee";
import { validate } from "../../../../common/validateInfor";
import { calculateEndTime } from "../../../../common/calculateTimeEnd";
import { calculateFeeHealth } from "../../../../adapters/apis/healthAPIs";
import {
  getInsurancePackagePaired,
  additionalBenefit,
} from "../../../../common/calculateFeeHealth";
import "react-calendar/dist/Calendar.css";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  isAddProductButtonClicked?: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormProductInfo: React.FC<Props> = ({
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
  const [insurancePackage, setInsurancePackage] = useState<any>([]);

  const dispatch = useDispatch();

  const dataRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  const category = useSelector((state: RootState) => state.reducer.nv);

  const insuranceFromDate = dataRedux.find(
    (o) => o.key === "from_date_tnds" && o.productName === productName
  );
  const packageInsurance = dataRedux.find(
    (o) => o.key === "package_insurance" && o.productName === productName
  );
  const customerBirthday = dataRedux.find(
    (o) => o.key === "insured_birthday" && o.productName === productName
  );

  const insuredFee = dataRedux.find(
    (o) => o.key === "phi_bh_tnds" && o.productName === productName
  );

  const insuredTC = dataRedux.find(
    (o) => o.key === "insured_TC" && o.productName === productName
  );

  const insuredDT = dataRedux.find(
    (o) => o.key === "insured_DT" && o.productName === productName
  );

  const insuredCS = dataRedux.find(
    (o) => o.key === "insured_CS" && o.productName === productName
  );

  const listInputMustValidate = useSelector(
    (state: RootState) => state.reducer.listInputMustValidate
  );

  const handleDisplayForm = (buttonClicked: string) => {
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      let listInput = listInputMustValidate.filter(
        (o) => o.key.includes("date") || o.key == "package_insurance"
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

  const handleAdditionalChecked = (checked: boolean, checkboxId: string) => {
    // if (
    //   checkboxId == "insured_TC" &&
    //   insurancePackage.packageCode == packageInsurance?.value
    // ) {
    //   handleCheckAdditionalBenefit("TC", checked);
    // } else if (
    //   checkboxId == "insured_DT" &&
    //   insurancePackage.packageCode == packageInsurance?.value
    // ) {
    //   handleCheckAdditionalBenefit("DT", checked);
    // } else if (
    //   checkboxId == "insured_CS" &&
    //   insurancePackage.packageCode == packageInsurance?.value
    // ) {
    //   handleCheckAdditionalBenefit("CS", checked);
    // }
  };

  // const handleCheckAdditionalBenefit = (
  //   additionalID: string,
  //   additionalChecked: boolean
  // ) => {
  //   if (insuredFee) {
  //     console.log("vu cal");

  //     let totalFee = additionalBenefit(
  //       insurancePackage,
  //       parseInt(insuredFee.value),
  //       additionalID,
  //       additionalChecked
  //     );
  //     if (totalFee > 0) {
  //       let fee = formatFee(totalFee.toString());
  //       setFeeInsurance(fee);
  //       dispatch({
  //         type: ADDPRODUCTINFORS,
  //         payload: {
  //           key: "phi_bh_tnds",
  //           value: totalFee,
  //           productName: productName,
  //         },
  //       });
  //     }
  //   }
  // };

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
    if (
      packageInsurance &&
      packageInsurance.value != "Chon" &&
      customerBirthday?.value
    ) {
      let pairedPackage = getInsurancePackagePaired(
        data,
        packageInsurance.value,
        customerBirthday.value
      );
      if (pairedPackage) {
        console.log("vu pairedPackage: ", pairedPackage);

        setInsurancePackage(pairedPackage);

        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: "phi_bh_tnds",
            value: pairedPackage.fee,
            productName: productName,
          },
        });
      }
    } else {
      dispatch({
        type: ADDPRODUCTINFORS,
        payload: {
          key: "phi_bh_tnds",
          value: "",
          productName: productName,
        },
      });
    }
  }, [packageInsurance, customerBirthday]);

  useEffect(() => {
    if (category && category != "") {
      calculateFeeHealth(category).then((res: any) => {
        if (!res.isError && res.resultCode == "00") {
          sessionStorage.setItem("All_package", JSON.stringify(res.result));
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
                inputName="package_insurance"
                inputTitle="Gói bảo hiểm"
                labelName="Gói bảo hiểm"
                required={true}
                readonly={true}
                productName={productName}
                isResetValue={isAddProductButtonClicked}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_sk_phi"
                inputName="phi_bh_tnds"
                inputTitle="phi_bh_tnds"
                labelName="Phí bảo hiểm"
                required={false}
                readonly={true}
                productName={productName}
                inputValueFromProp={
                  insuredFee && insuredFee.value
                    ? formatFee(insuredFee.value.toString())
                    : ""
                }
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
          {packageInsurance && packageInsurance.value != "Chon" && (
            <div>
              <h6>Lựa chọn Quyền lợi mở rộng</h6>
              <CheckBox
                checkboxId="insured_TC"
                checkboxText="Trợ cấp nằm viện điều trị tai nạn"
                productName={productName}
                isResetValue={isAddProductButtonClicked}
                handleAdditionalBenefitChecked={handleAdditionalChecked}
              />
              <CheckBox
                checkboxId="insured_DT"
                checkboxText="Điều trị ngoại trú"
                productName={productName}
                isResetValue={isAddProductButtonClicked}
                handleAdditionalBenefitChecked={handleAdditionalChecked}
              />
              <CheckBox
                checkboxId="insured_CS"
                checkboxText="Chăm sóc và điều trị răng"
                productName={productName}
                isResetValue={isAddProductButtonClicked}
                handleAdditionalBenefitChecked={handleAdditionalChecked}
              />
            </div>
          )}
          <NavigateButton btnContent="Xem Q.lợi" />
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

export default FormProductInfo;
