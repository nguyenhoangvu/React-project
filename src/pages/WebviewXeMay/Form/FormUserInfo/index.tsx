import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import styled from "styled-components";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
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

const FormUserInfo: React.FC<Props> = ({ handleButtonClick, pageCallback }) => {
  const [nhom_kh, setNhom_kh] = useState("");
  const [displayForm, setDisplayForm] = useState("");

  const handleNhomKh = (nhom_kh: string) => {
    if (nhom_kh === "Cá nhân") setNhom_kh("CN");
    else if (nhom_kh === "Doanh nghiệp") setNhom_kh("DN");
  };

  const handleDisplayForm = (buttonClicked: string) => {
    setDisplayForm(buttonClicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(displayForm) : {};
  }, [displayForm]);

  useEffect(() => {
    setDisplayForm(pageCallback);
  }, [pageCallback]);

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
          />
          <FormCN nhom_kh={nhom_kh}>
            <TextInput
              inputType="text"
              inputId="bh_xe_may_hoten"
              inputName="hoten"
              inputTitle="tên chủ xe"
              labelName="Họ và tên"
              required={true}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_diachi"
              inputName="diachi"
              inputTitle="địa chỉ"
              labelName="Địa chỉ"
              required={true}
            />
            <TextInput
              inputType="tel"
              inputId="bh_xe_may_dienthoai_dd"
              inputName="dienthoai_dd"
              inputTitle="điện thoại"
              labelName="Điện thoại"
              required={true}
            />
            <TextInput
              inputType="email"
              inputId="bh_xe_may_email"
              inputName="email"
              inputTitle="Email"
              labelName="Email"
              required={true}
            />
          </FormCN>
          <FormDN nhom_kh={nhom_kh}>
            <TextInput
              inputType="text"
              inputId="bh_xe_may_hoten_dn"
              inputName="hoten"
              inputTitle="tên doanh nghiêp"
              labelName="Tên doanh nghiệp"
              required={true}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_diachi_dn"
              inputName="diachi"
              inputTitle="địa chỉ doanh nghiệp"
              labelName="Địa chỉ"
              required={true}
            />
            <TextInput
              inputType="text"
              inputId="bh_xe_may_dn_hoten_ddien"
              inputName="hoten"
              inputTitle="tên người đại diện"
              labelName="Địa chỉ"
              required={true}
            />
            <Row>
              <Col xs="6">
                <TextInput
                  inputType="text"
                  inputId="bh_xe_may_dn_cvu_dn"
                  inputName="chucvu"
                  inputTitle="chức vụ người đại diện"
                  labelName="Chức vụ người đại diện"
                  required={true}
                />
              </Col>
              <Col xs="6">
                <TextInput
                  inputType="tel"
                  inputId="bh_xe_may_dienthoai_dd"
                  inputName="dienthoai_dd"
                  inputTitle="điện thoại"
                  labelName="Điện thoại"
                  required={true}
                />
              </Col>
            </Row>
            <TextInput
              inputType="email"
              inputId="bh_xe_may_dn_mst"
              inputName="mst"
              inputTitle="Mã số thuế"
              labelName="Mã số thuế"
              required={true}
            />
          </FormDN>
        </Col>
      </Row>
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={displayForm}
      />
    </Container>
  );
};

export default FormUserInfo;
