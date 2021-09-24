import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
};

const FormSummary: React.FC<Props> = ({ handleButtonClick, pageCallback }) => {
  const [buttonClick, setButtonClick] = useState("");

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
          <h5>Thông tin đơn bảo hiểm</h5>
          <div></div>
          <DirectButton
            handleButtonClick={handleDisplayForm}
            buttonCallback={buttonClick}
            isPay={true}
            isSummaryPage={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FormSummary;
