import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADDPRODUCTINFORS } from "../../redux/types";
import styled from "styled-components";
import Label from "../Label";

type Props = {
  inputId: string;
  labelName: string;
  required: boolean;
  productName: string;
  inputValueFromProp?: string;
  isResetValue?: boolean;
  inputName: string;
  inputTitle: string;
};

const TextAreaWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

interface IInput {
  focus: boolean;
}

const TextAreaStyled = styled.textarea<IInput>`
  border: none;
  border-bottom: ${(props) =>
    props.focus === true
      ? "0.0625rem solid #005790"
      : "0.0625rem solid #9e9e9e"};
  border-radius: 0;
  outline: none;
  height: 5rem;
  width: 100%;
  font-size: 0.875rem;
  margin: 0 0 1.25rem 0;
  padding: 0;
  box-shadow: ${(props) =>
    props.focus === true ? "0 0.0625rem 0 0 #005790" : "none"};
  transition: all 0.3s;
  box-sizing: content-box;
  background-color: transparent;
`;

const TextArea: React.FC<Props> = ({
  inputId,
  labelName,
  required,
  productName,
  isResetValue,
  inputValueFromProp,
  inputName,
  inputTitle,
}) => {
  const [inputActive, setInputActive] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleFocusInput = () => {
    setInputActive("active");
    setFocusInput(true);
  };

  const onInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleBlurInput = () => {
    dispatch({
      type: ADDPRODUCTINFORS,
      payload: {
        key: inputName,
        value: inputValue,
        productName: productName,
      },
    });

    if (inputValue !== "") {
      setInputActive("active");
    } else setInputActive("");
    setFocusInput(false);
  };

  useEffect(() => {
    if (inputValueFromProp) setInputValue(inputValueFromProp);
  }, [inputValueFromProp]);

  useEffect(() => {
    if (isResetValue === true) {
      setInputValue("");
    }
  }, [isResetValue]);

  return (
    <TextAreaWrapper>
      <Label
        inputId={inputId}
        focusInput={focusInput}
        inputActive={inputActive}
        labelName={labelName}
        required={required}
      />
      <TextAreaStyled
        focus={focusInput}
        onFocus={handleFocusInput}
        value={inputValue}
        id={inputId}
        title={inputTitle}
        name={inputName}
        onBlur={handleBlurInput}
        onChange={onInputChange}
      />
    </TextAreaWrapper>
  );
};

export default TextArea;
