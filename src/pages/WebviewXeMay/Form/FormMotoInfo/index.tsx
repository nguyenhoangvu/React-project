import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";

import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DistrictInput from "../../../../components/DistrictInput";
import { validate } from "../../../../common/validateInfor";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  isAddProductButtonClicked: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormMotoInfo: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  isAddProductButtonClicked,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dataRedux = useSelector((state: RootState) => state.reducer.userInfo);
  const listInputMustValidate = useSelector(
    (state: RootState) => state.reducer.listInputMustValidate
  );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  const handleDisplayForm = (buttonClicked: string) => {
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      let listInput = listInputMustValidate.filter(
        (o) =>
          o.key.startsWith("moto") ||
          o.key.startsWith("gcn") ||
          o.key.startsWith("cx")
      );
      let test = validate(listInput, listProduct);
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

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Thông tin chủ xe</h5>
          <TextInput
            inputType="text"
            inputId="bh_xe_may_hoten_cx"
            inputName="cx_name"
            inputTitle="tên chủ xe"
            labelName="Họ và tên chủ xe"
            required={true}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_name")?.value
                ? dataRedux.find((elem: any) => elem.key === "user_name")?.value
                : ""
            }
            productName={productName}
          />
          <TextInput
            inputType="text"
            inputId="bh_xe_may_diachi_cx"
            inputName="cx_address"
            inputTitle="địa chỉ"
            labelName="Địa chỉ"
            required={true}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_diachi")?.value
                ? dataRedux.find((elem: any) => elem.key === "user_diachi")
                    ?.value
                : ""
            }
            productName={productName}
          />
          <TextInput
            inputType="tel"
            inputId="bh_xe_may_dienthoai_dd_cx"
            inputName="cx_phone"
            inputTitle="điện thoại"
            labelName="Điện thoại"
            required={true}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_phone")?.value
                ? dataRedux.find((elem: any) => elem.key === "user_phone")
                    ?.value
                : ""
            }
            productName={productName}
          />

          <h5>Thông tin mô tô, xe máy</h5>
          <Row>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_xe_may_bien_xe"
                inputName="moto_plate"
                inputTitle="Biển xe"
                labelName="Biển xe"
                required={true}
                productName={productName}
                isResetValue={isAddProductButtonClicked}
              />
            </Col>
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="bh_xe_may_dung_tich_xe"
                inputName="moto_volumn"
                inputTitle="Dung tích xe"
                labelName="Loại xe"
                required={true}
                readonly={true}
                productName={productName}
                isResetValue={isAddProductButtonClicked}
              />
            </Col>
          </Row>
          <DistrictInput
            inputType="text"
            inputId="bh_xe_may_tinh_thanh_gcn_tnds"
            inputName="gcn_recieve_city"
            inputTitle="Tỉnh thành nhận GCN TNDS"
            labelName="Tỉnh thành, quận huyện nhận GCN TNDS"
            required={true}
            readonly={true}
            productName={productName}
          />
          <TextInput
            inputType="text"
            inputId="bh_xe_may_dchi_gcn_tnds"
            inputName="gcn_recieve_address"
            inputTitle="Địa chỉ nhận GCN TNDS"
            labelName="Địa chỉ, số điện thoại cụ thể"
            required={true}
            productName={productName}
            isResetValue={false}
          />
        </Col>
        <DirectButton
          handleButtonClick={handleDisplayForm}
          buttonCallback={buttonClick}
          isPay={false}
          isSummaryPage={false}
          isValidateFalse={isShowError}
        />
      </Row>
    </Container>
  );
};

export default FormMotoInfo;
