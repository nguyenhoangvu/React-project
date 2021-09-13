import React from "react";
import TextInput from "../../../../components/TextInput";
import { Col, Container, Row } from "react-bootstrap";
import DirectButton from "../../../DirectButton";

const FormUserInfo = () => {
  return (
    <Container>
      <Row>
        <Col xs="12">
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
        </Col>
      </Row>
      <DirectButton />
    </Container>
  );
};

export default FormUserInfo;
