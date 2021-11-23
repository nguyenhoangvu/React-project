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
  font-size: 0.875rem;
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
  handleModalSearch?: (input: string) => void;
  resetValue?: boolean;
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
  handleModalSearch,
  resetValue,
}) => {
  const [inputActive, setInputActive] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [showDropdown, setShowDropdown] = useState<boolean | undefined>(false);

  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.reducer);

  let insuredRelation = dataRedux.listProducts.find(
    (o) => o.key == "insured_relation" && o.productName == productName
  );

  let isRemoveProduct = dataRedux.remove_product;

  const handleFocusInput = () => {
    setInputActive("active");
    setFocusInput(true);
  };

  const handleBlurInput = () => {
    if (
      (inputName.startsWith("user") &&
        inputName !== "user_sex" &&
        inputName !== "user_birthday" &&
        inputName !== "insured_relation") ||
      inputName.startsWith("enterprise")
    ) {
      dispatch({
        type: ADDUSERINFO,
        payload: {
          key: inputName,
          value: inputValue,
        },
      });
    } else if (
      isShowDropdown !== true &&
      !inputName.startsWith("phi") &&
      !inputName.startsWith("sum") &&
      inputName != ""
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

  const handleKeyUp = (event: any) => {
    handleModalSearch ? handleModalSearch(event.target.value) : {};
  };

  const handleInputClick = () => {
    switch (inputName) {
      case "nhom_kh":
        setShowDropdown(!showDropdown);
        break;
      case "moto_volumn":
        setShowDropdown(!showDropdown);
        break;
      case "gcn_recieve_city":
        setShowDropdown(!showDropdown);
        break;
      case "from_date_tnds":
        setShowDropdown(!showDropdown);
        break;
      case "expired_time_tnds":
        setShowDropdown(!showDropdown);
        break;
      case "user_birthday":
        setShowDropdown(!showDropdown);
        break;
      case "user_sex":
        setShowDropdown(!showDropdown);
        break;
      case "oto_intendedUse":
        setShowDropdown(!showDropdown);
        break;
      case "oto_yearProduce":
        setShowDropdown(!showDropdown);
        break;
      case "oto_type":
        setShowDropdown(!showDropdown);
        break;
      case "insured_relation":
        setShowDropdown(!showDropdown);
        break;
      case "insured_birthday":
        setShowDropdown(!showDropdown);
        break;
      case "insured_sex":
        setShowDropdown(!showDropdown);
        break;
      case "package_insurance":
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
    if (insuredRelation && insuredRelation.value == "BAN_THAN") {
      switch (inputName) {
        case "insured_name":
          let customerName = dataRedux.userInfo.find(
            (o) => o.key == "user_name"
          );
          customerName && setInputValue(customerName.value);
          dispatch({
            type: ADDPRODUCTINFORS,
            payload: {
              key: inputName,
              value: customerName?.value,
              productName: productName,
            },
          });
          setInputActive("active");
          break;
        case "insured_address":
          let customerAddress = dataRedux.userInfo.find(
            (o) => o.key == "user_diachi"
          );
          customerAddress && setInputValue(customerAddress.value);
          dispatch({
            type: ADDPRODUCTINFORS,
            payload: {
              key: inputName,
              value: customerAddress?.value,
              productName: productName,
            },
          });
          setInputActive("active");
          break;
        case "insured_indentity":
          let customerIdentity = dataRedux.userInfo.find(
            (o) => o.key == "user_indentity"
          );
          customerIdentity && setInputValue(customerIdentity.value);
          dispatch({
            type: ADDPRODUCTINFORS,
            payload: {
              key: inputName,
              value: customerIdentity?.value,
              productName: productName,
            },
          });
          setInputActive("active");
          break;
        case "insured_phone":
          let customerPhone = dataRedux.userInfo.find(
            (o) => o.key == "user_phone"
          );
          customerPhone && setInputValue(customerPhone.value);
          dispatch({
            type: ADDPRODUCTINFORS,
            payload: {
              key: inputName,
              value: customerPhone?.value,
              productName: productName,
            },
          });
          setInputActive("active");
          break;
        case "insured_email":
          let customerEmail = dataRedux.userInfo.find(
            (o) => o.key == "user_email"
          );
          customerEmail && setInputValue(customerEmail.value);
          dispatch({
            type: ADDPRODUCTINFORS,
            payload: {
              key: inputName,
              value: customerEmail?.value,
              productName: productName,
            },
          });
          setInputActive("active");
          break;
        default:
          break;
      }
    } else if (
      insuredRelation &&
      insuredRelation.value !== "BAN_THAN" &&
      dataRedux.modify_product == 0 &&
      isRemoveProduct == false
    ) {
      if (
        inputName == "insured_name" ||
        inputName == "insured_address" ||
        inputName == "insured_indentity" ||
        inputName == "insured_phone" ||
        inputName == "insured_email"
      ) {
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: inputName,
            value: "",
            productName: productName,
          },
        });
        setInputValue("");
        setInputActive("");
        setFocusInput(false);
      }
    }
  }, [insuredRelation, dataRedux.modify_product, isRemoveProduct]);

  useEffect(() => {
    if (dataRedux.modify_product !== 0) {
      let dataCallback = dataRedux.listProducts.find(
        (o) =>
          o.key === inputName &&
          o.productName === "product_" + dataRedux.modify_product
      );
      if (
        dataCallback !== undefined &&
        dataCallback.key !== "moto_volumn" &&
        dataCallback.key !== "expired_time_tnds" &&
        dataCallback.key !== "from_date_tnds" &&
        dataCallback.key !== "insured_relation" &&
        dataCallback.key !== "insured_birthday" &&
        dataCallback.key !== "insured_sex"
      ) {
        setInputValue(dataCallback.value);
      }
    }
  }, [dataRedux.modify_product]);

  useEffect(() => {
    if (inputValueFromProp != undefined && isRemoveProduct != true) {
      if (inputValueFromProp == "") {
        setFocusInput(false);
        setInputActive("");
        setInputValue("");
      } else {
        setInputActive("active");
      }
      setInputValue(inputValueFromProp);
      if (
        !(
          inputName.startsWith("tnds") ||
          inputName.startsWith("sum") ||
          inputName.startsWith("phi") ||
          inputName === "nhom_kh" ||
          inputName.startsWith("user")
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
      } else if (inputName === "nhom_kh" || inputName.startsWith("user")) {
        dispatch({
          type: ADDUSERINFO,
          payload: {
            key: inputName,
            value: dropdownKey ? dropdownKey : inputValueFromProp,
          },
        });
      }
    } else if (inputValueFromProp != undefined && isRemoveProduct == true) {
      if (inputName.startsWith("sum")) {
        setInputValue(inputValueFromProp);
        setInputActive("active");
      }
    }
  }, [inputValueFromProp, dropdownKey, productName, isRemoveProduct]);

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
        setFocusInput(false);
      }
    }
  }, [isResetValue]);

  useEffect(() => {
    if (resetValue) setInputValue("");
  }, [resetValue]);

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
        onKeyUp={(event) => handleKeyUp(event)}
        value={inputValue}
        readOnly={readonly}
        placeholder={placeHolder}
      />
    </InputWrapper>
  );
};

export default TextInput;
