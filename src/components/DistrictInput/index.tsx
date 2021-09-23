import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import useOnclickOutside from "react-cool-onclickoutside";

import TextInput from "../TextInput";
import ModalInput from "../Modal";

type Props = {
  inputType: string;
  inputLength?: number;
  inputId: string;
  inputTitle: string;
  inputName: string;
  labelName: string;
  required: boolean;
  readonly?: boolean;
  productName: string;
  isResetValue?: boolean;
};

const DistrictInput: React.FC<Props> = ({
  inputType,
  inputId,
  inputTitle,
  inputName,
  labelName,
  required,
  readonly,
  productName,
  isResetValue,
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(false);
  const [inputValue, setInputValue] = useState("");

  const handleShowDropdown = (showModal: boolean | undefined) => {
    setShowModal(showModal);
  };

  const handleSetInputValue = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleModalClose = (showModal: boolean | undefined) => {
    setShowModal(showModal);
  };

  useEffect(() => {
    if (isResetValue === true) setInputValue("");
  }, [isResetValue]);

  return (
    <div>
      <TextInput
        inputType={inputType}
        inputId={inputId}
        inputName={inputName}
        inputTitle={inputTitle}
        labelName={labelName}
        required={required}
        readonly={readonly}
        handleShowDropdown={handleShowDropdown}
        isShowDropdown={showModal}
        inputValueFromProp={inputValue}
        productName={productName}
        isResetValue={isResetValue}
      />
      <ModalInput
        onShow={showModal}
        handleInputValue={handleSetInputValue}
        handleModalClose={handleModalClose}
        isResetValue={isResetValue}
      />
    </div>
  );
};

export default DistrictInput;
