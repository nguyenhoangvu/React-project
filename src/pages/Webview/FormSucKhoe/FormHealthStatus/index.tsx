import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import DirectButton from "../../../DirectButton";
import CheckBox from "../../../../components/CheckBox";
import TextArea from "../../../../components/TextArea";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  isAddProductButtonClicked?: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

interface ICondition {
  isShow: boolean;
}

const Condition = styled.div<ICondition>`
  display: ${(props) => (props.isShow === true ? "block" : "none")};
  color: red;
  text-align: justify;
  padding: 0 0.75rem;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const FormHealthStatus: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  isAddProductButtonClicked,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [showCondition, setShowCondition] = useState(false);

  const handleDisplayForm = (buttonClicked: string) => {
    setButtonClick(buttonClicked);
  };

  const handleCheckboxChecked = (checked: boolean) => {
    setShowCondition(checked);
  };

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Tình trạng sức khỏe của bạn</h5>
          <CheckBox
            checkboxId="health_status_benhA"
            checkboxText="Người được bảo hiểm có đang gặp phải một trong các bệnh tâm thần, thần kinh, bệnh phong, thương tật vĩnh viễn quá 50% hoặc người đang trong thời gian điều trị bệnh hoặc thương tật."
            productName={productName}
            isResetValue={isAddProductButtonClicked}
            handleCheckboxChecked={handleCheckboxChecked}
          />
          <CheckBox
            checkboxId="health_status_benhB"
            checkboxText="NĐBH có mắc một hay các bệnh: ung thư, u bướu các loại, huyết áp, tim mạch...?"
            productName={productName}
            isResetValue={isAddProductButtonClicked}
          />
          <TextArea
            inputId="frm_bhsk_benh_cs"
            inputName="health_status_description"
            inputTitle="description"
            labelName="Nội dung chi tiết (nếu có)"
            required={false}
            productName={productName}
          />
          <Condition isShow={showCondition}>
            Rất tiếc, VBI không bảo hiểm cho khách hàng có một trong các bệnh
            tâm thần, thần kinh, bệnh phong, thương tật vĩnh viễn quá 50% hoặc
            người đang trong thời gian điều trị bệnh hoặc thương tật!
          </Condition>
        </Col>
      </Row>
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={buttonClick}
        isPay={false}
        isSummaryPage={false}
        isConditionChecked={showCondition}
      />
    </Container>
  );
};

export default FormHealthStatus;
