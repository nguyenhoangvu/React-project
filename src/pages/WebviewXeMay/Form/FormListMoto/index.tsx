import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
};

const FormListMoto: React.FC<Props> = ({ handleButtonClick, pageCallback }) => {
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
    <div>
      list moto!!
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={buttonClick}
      />
    </div>
  );
};

export default FormListMoto;
