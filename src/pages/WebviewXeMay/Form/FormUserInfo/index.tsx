import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";

import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import ButtonBuy from "../../../../components/ButtonBuy";
import { validate } from "../../../../common/validateInfor";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

interface INhom {
  nhom_kh: string;
}

const FormCN = styled.div<INhom>`
  display: ${(props) => (props.nhom_kh === "CN" ? "block" : "none")};
`;

const FormDN = styled.div<INhom>`
  display: ${(props) => (props.nhom_kh === "DN" ? "block" : "none")};
`;

const FormUserInfo: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  handleShowError,
}) => {
  const [nhom_kh, setNhom_kh] = useState("");
  const [buttonClick, setButtonClick] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const listInputMustValidate = useSelector(
    (state: RootState) => state.reducer.listInputMustValidate
  );

  const userInfo = useSelector((state: RootState) => state.reducer.userInfo);

  const handleNhomKh = (nhom_kh: string) => {
    if (nhom_kh === "Cá nhân") setNhom_kh("CN");
    else if (nhom_kh === "Doanh nghiệp") setNhom_kh("DN");
  };

  const handleDisplayForm = (buttonClicked: string) => {
    // setButtonClick(buttonClicked);
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      if (nhom_kh === "CN") {
        let listInput = listInputMustValidate.filter((o) =>
          o.key.startsWith("user")
        );
        let test = validate(listInput, userInfo);
        if (test !== "") {
          setIsShowError(!isShowError);
          setErrorMsg(test);
        } else {
          setButtonClick(buttonClicked);
        }
      } else if (nhom_kh === "DN") {
      }
    }
  };

  const handleClickCameraButton = () => {};

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
          <h5>Thông tin người mua</h5>
          <SelectDropdown
            inputType="text"
            inputId="bh_nhom_kh"
            inputName="nhom_kh"
            inputTitle="nhóm khách hàng"
            labelName="Người mua là(*)"
            required={false}
            readonly={true}
            handleNhomKh={handleNhomKh}
            productName={productName}
          />
          <FormCN nhom_kh={nhom_kh}>
            <TextInput
              inputType="text"
              inputId="bh_xe_may_hoten"
              inputName="user_name"
              inputTitle="tên chủ xe"
              labelName="Họ và tên"
              required={true}
              productName={productName}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_diachi"
              inputName="user_diachi"
              inputTitle="địa chỉ"
              labelName="Địa chỉ"
              required={true}
              productName={productName}
            />
            <TextInput
              inputType="tel"
              inputId="bh_xe_may_dienthoai_dd"
              inputName="user_phone"
              inputTitle="điện thoại"
              labelName="Điện thoại"
              required={true}
              productName={productName}
            />
            <TextInput
              inputType="email"
              inputId="bh_xe_may_email"
              inputName="user_email"
              inputTitle="Email"
              labelName="Email"
              required={true}
              productName={productName}
            />
            <ButtonBuy
              handleClickButton={handleClickCameraButton}
              pageCallback={false}
              buttonIcon="camera"
            />
          </FormCN>
          <FormDN nhom_kh={nhom_kh}>
            <TextInput
              inputType="text"
              inputId="bh_xe_may_hoten_dn"
              inputName="enterprise_name"
              inputTitle="tên doanh nghiêp"
              labelName="Tên doanh nghiệp"
              required={true}
              productName={productName}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_diachi_dn"
              inputName="enterprise_address"
              inputTitle="địa chỉ doanh nghiệp"
              labelName="Địa chỉ"
              required={true}
              productName={productName}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_dn_hoten_ddien"
              inputName="enterprise_represent"
              inputTitle="tên người đại diện"
              labelName="Địa chỉ"
              required={true}
              productName={productName}
            />
            <Row>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="bh_xe_may_dn_cvu_dn"
                  inputName="enterprise_represent_role"
                  inputTitle="chức vụ người đại diện"
                  labelName="Chức vụ người đại diện"
                  required={true}
                  productName={productName}
                />
              </Col>
              <Col xs="6">
                <TextInput
                  inputType="tel"
                  inputId="bh_xe_may_dienthoai_dd"
                  inputName="enterprise_represent_phone"
                  inputTitle="điện thoại"
                  labelName="Điện thoại"
                  required={true}
                  productName={productName}
                />
              </Col>
            </Row>
            <TextInput
              inputType="email"
              inputId="bh_xe_may_dn_mst"
              inputName="enterprise_tax"
              inputTitle="Mã số thuế"
              labelName="Mã số thuế"
              required={true}
              productName={productName}
            />
          </FormDN>
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

export default FormUserInfo;
