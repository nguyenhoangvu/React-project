import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Label from "../Label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/rootReducer";
import {
  ADDUSERINFO,
  ADDPRODUCTINFORS,
  ADDINPUTNAMEMUSTVALIDATE,
} from "../../redux/types";
import { inputNumberOnly } from "./helper";
import data from "../../json/select-dropdown.json";
import moment from "moment";
// import {addUserInfo} from '../../redux'

interface IInput {
  focus: boolean;
  summaryText?: boolean;
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
  ${({ summaryText }) =>
    summaryText &&
    `
    border-bottom: none;
    margin: -0.3125rem 0 0.625rem 0;
  `}
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
  productName: string;
  dropdownKey?: string;
  summaryText?: boolean;
  isResetValue?: boolean;
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
  productName,
  dropdownKey,
  summaryText,
  isResetValue,
}) => {
  const [inputActive, setInputActive] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [showDropdown, setShowDropdown] = useState<boolean | undefined>(false);

  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.reducer);

  const handleFocusInput = () => {
    setInputActive("active");
    setFocusInput(true);
  };

  const handleBlurInput = () => {
    if (inputName.startsWith("user") || inputName.startsWith("enterprise")) {
      dispatch({
        type: ADDUSERINFO,
        payload: {
          key: inputName,
          value: inputValue,
        },
      });
    } else if (
      inputName !== "nhom_kh" &&
      inputName !== "expired_time_tnds" &&
      inputName !== "moto_volumn"
    ) {
      dispatch({
        type: ADDPRODUCTINFORS,
        payload: {
          key: inputName,
          value: inputValue,
          productName: productName,
        },
      });
    }
    if (inputValue !== "") {
      setInputActive("active");
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

  const onlyNumberKey = (event: any) => {
    if (inputName === "user_phone") {
      inputNumberOnly(event);
    }
  };

  useEffect(() => {
    if (inputValueFromProp !== undefined) {
      setInputValue(inputValueFromProp);
      setInputActive("active");
      if (
        !(
          inputName.startsWith("tnds") ||
          inputName.startsWith("sum") ||
          inputName === "phi_tnds"
        )
      ) {
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: inputName,
            value: dropdownKey ? dropdownKey : inputValueFromProp,
            productName: productName,
          },
        });
      }
    }
  }, [inputValueFromProp, dropdownKey, productName]);

  useEffect(() => {
    setShowDropdown(isShowDropdown);
  }, [isShowDropdown]);

  useEffect(() => {
    handleShowDropdown ? handleShowDropdown(showDropdown) : {};
  }, [showDropdown]);

  useEffect(() => {
    if (isResetValue === true) {
      if (inputName === "from_time_tnds") {
        setInputValue(moment().format("HH:mm"));
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: inputName,
            value: moment().format("HH:mm"),
            productName: productName,
          },
        });
      } else if (
        inputName !== "from_date_tnds" &&
        inputName !== "expired_time_tnds"
      ) {
        setInputValue("");
      }
    }
  }, [isResetValue]);

  useEffect(() => {
    if (dataRedux.modify_product !== 0) {
      let dataCallback = dataRedux.listProducts.find(
        (o) =>
          o.key === inputName &&
          o.productName === "product_" + dataRedux.modify_product
      );
      if (dataCallback !== undefined) {
        let value = dataCallback.value;
        if (dataCallback.key === "moto_volumn") {
          let motoType = data.Loai_xe.find((o) => o.key == value);
          motoType !== undefined && setInputValue(motoType.value);
        } else if (dataCallback.key === "expired_time_tnds") {
          let time = data.Thoi_han_bh.find((o) => o.key == value);
          time !== undefined && setInputValue(time.value);
        } else setInputValue(dataCallback.value);
      }
    }
  }, [dataRedux.modify_product]);

  useEffect(() => {
    if (inputName === "from_time_tnds") {
      setInputValue(moment().format("HH:mm"));
      setInputActive("active");
      dispatch({
        type: ADDPRODUCTINFORS,
        payload: {
          key: inputName,
          value: moment().format("HH:mm"),
          productName: productName,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (inputName !== undefined && required === true) {
      dispatch({
        type: ADDINPUTNAMEMUSTVALIDATE,
        payload: {
          key: inputName,
          name: labelName,
        },
      });
    }
  }, []);

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
        summaryText={summaryText}
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
        onKeyPress={(event) => {
          onlyNumberKey(event);
        }}
        value={inputValue}
        readOnly={readonly}
        placeholder={placeHolder}
      />
    </InputWrapper>
  );
};

export default TextInput;
