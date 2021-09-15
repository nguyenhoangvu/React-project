import React from "react";
import styled from "styled-components";

// inputId,
//     focusInput,
//     inputActive,
//     labelName,
//     required,

type Props = {
  focusInput: boolean;
  inputId: string;
  inputActive: string;
  labelName: string;
  required: boolean;
};

interface Required {
  required: boolean;
}

const RequireIcon = styled.span<Required>`
  display: ${(props) => (props.required === true ? "inline-block" : "none")};
  color: #f44336;
`;

interface ILabel {
  active: string;
  focus: boolean;
}
const InputLable = styled.label<ILabel>`
    position: absolute;
    top: 0;
    color: ${(props) =>
      props.active === "active" && props.focus === true
        ? "#005790"
        : "#9e9e9e"};
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

const Label: React.FC<Props> = ({
  inputId,
  focusInput,
  inputActive,
  labelName,
  required,
}) => {
  return (
    <InputLable active={inputActive} focus={focusInput} htmlFor={inputId}>
      {labelName} <RequireIcon required={required}>*</RequireIcon>
    </InputLable>
  );
};

export default Label;
