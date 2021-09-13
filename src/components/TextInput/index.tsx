import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Required {
  required: boolean;
}

const RequireIcon = styled.span<Required>`
  display: ${(props) => (props.required === true ? "inline-block" : "none")};
  color: #f44336;
`;

interface ILabel {
  active: string;
}
const InputLable = styled.label<ILabel>`
  position: absolute;
  top: 0;
  color: ${(props) => (props.active === "active" ? "#005790" : "#9e9e9e")};
  height: 100%;
  font-size: 1rem;
  cursor: text;
  transition: transform 0.2s ease-out;
  -webkit-transform 0.2s ease-out;
  transform-origin: ${(props) =>
    props.active === "active" ? "0 0" : "0 100%"};
  text-align: initial;
  transform: ${(props) =>
    props.active === "active"
      ? "translateY(-14px) scale(0.8)"
      : "translateY(12px)"};
  pointer-events: none;
`;

interface IInput {
  focus: boolean;
}
const InputComponent = styled.input<IInput>`
  border: none;
  border-bottom: ${(props) =>
    props.focus === true ? "1px solid #005790" : "1px solid #9e9e9e"};
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 20px 0;
  padding: 0;
  box-shadow: ${(props) =>
    props.focus === true ? "0 1px 0 0 #005790" : "none"};
  transition: all 0.3s;
  box-sizing: content-box;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

type Props = {
  inputType: string;
  inputLength?: number;
  inputId: string;
  inputTitle: string;
  inputName: string;
  labelName: string;
  required: boolean;
};

const TextInput: React.FC<Props> = ({
  inputType,
  inputLength,
  inputId,
  inputTitle,
  inputName,
  labelName,
  required,
}) => {
  const [active, setActive] = useState("");
  const [focus, setFocus] = useState(false);

  const handleFocusInput = () => {
    setActive("active");
    setFocus(true);
  };

  const handleBlurInput = () => {
    setActive("");
    setFocus(false);
  };

  return (
    <InputWrapper>
      <InputLable active={active} htmlFor={inputId}>
        {labelName} <RequireIcon required={required}>*</RequireIcon>
      </InputLable>
      <InputComponent
        focus={focus}
        type={inputType}
        className="style-input"
        id={inputId}
        title={inputTitle}
        name={inputName}
        maxLength={inputLength}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
      />
    </InputWrapper>
  );
};

export default TextInput;
