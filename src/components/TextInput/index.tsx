import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Label from "../Label";
import { useSelector, useDispatch } from "react-redux";
import { ADDUSERINFO } from "../../redux/types";
// import {addUserInfo} from '../../redux'

interface IInput {
  focus: boolean;
}
const InputComponent = styled.input<IInput>`
  border: none;
  border-bottom: ${(props) =>
    props.focus === true
      ? "0.0625rem solid #005790"
      : "0.0625rem solid #9e9e9e"};
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 1.25rem 0;
  padding: 0;
  box-shadow: ${(props) =>
    props.focus === true ? "0 0.0625rem 0 0 #005790" : "none"};
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
  readonly?: boolean;
  handleShowDropdown?: (clicked: boolean | undefined) => void;
  isShowDropdown?: boolean;
  inputValueFromProp?: string | number;
  placeHolder?: string;
};

const TextInput: React.FC<Props> = ({
  inputType,
  inputLength,
  inputId,
  inputTitle,
  inputName,
  labelName,
  required,
  readonly,
  handleShowDropdown,
  isShowDropdown,
  inputValueFromProp,
  placeHolder,
}) => {
  const [inputActive, setInputActive] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [showDropdown, setShowDropdown] = useState<boolean | undefined>(false);

  const dispatch = useDispatch();

  const handleFocusInput = () => {
    setInputActive("active");
    setFocusInput(true);
  };

  const handleBlurInput = () => {
    if (inputValue !== "") {
      setInputActive("active");
      if (inputName.startsWith("user")) {
        dispatch({
          type: ADDUSERINFO,
          payload: {
            key: inputName,
            value: inputValue,
          },
        });
      }
    } else setInputActive("");
    setFocusInput(false);
  };

  const onInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputClick = () => {
    switch (inputId) {
      case "bh_nhom_kh":
        setShowDropdown(!showDropdown);
        break;
      case "bh_xe_may_dung_tich_xe":
        setShowDropdown(!showDropdown);
        break;
      case "bh_xe_may_tinh_thanh_gcn_tnds":
        setShowDropdown(!showDropdown);
        break;
      case "bh_xe_may_tnds_ngay_hl":
        setShowDropdown(!showDropdown);
        break;
      case "bh_xe_may_tnds_thoi_han":
        setShowDropdown(!showDropdown);
        break;
      default:
        setShowDropdown(showDropdown);
        break;
    }
  };

  useEffect(() => {
    if (inputValueFromProp !== undefined && inputValueFromProp !== "") {
      setInputValue(inputValueFromProp);
      setInputActive("active");
    }
  }, [inputValueFromProp]);

  useEffect(() => {
    setShowDropdown(isShowDropdown);
  }, [isShowDropdown]);

  useEffect(() => {
    handleShowDropdown ? handleShowDropdown(showDropdown) : {};
  }, [showDropdown]);

  return (
    <InputWrapper>
      <Label
        inputId={inputId}
        focusInput={focusInput}
        inputActive={inputActive}
        labelName={labelName}
        required={required}
      />
      <InputComponent
        focus={focusInput}
        type={inputType}
        className="style-input"
        id={inputId}
        title={inputTitle}
        name={inputName}
        maxLength={inputLength}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        onChange={onInputChange}
        onClick={handleInputClick}
        value={inputValue}
        readOnly={readonly}
        placeholder={placeHolder}
      />
    </InputWrapper>
  );
};

export default TextInput;
