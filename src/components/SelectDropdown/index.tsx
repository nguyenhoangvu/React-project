import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import useOnclickOutside from "react-cool-onclickoutside";

import TextInput from "../TextInput";
import data from "../../json/select-dropdown.json";

type Props = {
  inputType: string;
  inputLength?: number;
  inputId: string;
  inputTitle: string;
  inputName: string;
  labelName: string;
  required: boolean;
  readonly?: boolean;
  handleNhomKh?: (nhom: string) => void;
  productName: string;
  isResetValue?: boolean;
};

interface IconProps {}

const StyledIcon = styled(({ ...rest }) => (
  <FontAwesomeIcon {...rest} />
))<IconProps>`
  color: initial;
  position: absolute;
  right: 0;
  top: -0.625rem;
  bottom: 0;
  margin: auto 0;
  line-height: 0.625rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

interface IUL {
  showDropdown: boolean | undefined;
}

const UL = styled.ul<IUL>`
  width: 100%;
  background-color: #fff;
  margin: 0;
  display: ${(props) => (props.showDropdown === true ? "block" : "none")};
  min-width: 6.25rem;
  max-height: 40.625rem;
  overflow-y: auto;
  opacity: ${(props) => (props.showDropdown === true ? "1" : "0")};
  position: absolute;
  z-index: 999;
  top: 0.625rem;
  left: 0;
  padding: 0;
  box-shadow: 0 0.125rem 0.125rem 0 rgb(0 0 0 / 14%),
    0 0.0625rem 0.3125rem 0 rgb(0 0 0 / 12%),
    0 0.1875rem 0.0625rem -0.125rem rgb(0 0 0 / 20%);
`;

const LI = styled.li`
  list-style-type: none;
  clear: both;
  color: #005790;
  cursor: pointer;
  min-height: 3.125rem;
  line-height: 3.5rem;
  padding-left: 1.5625rem;
  width: 100%;
  text-align: left;
  text-transform: none;
`;

const SelectDropdown: React.FC<Props> = ({
  inputType,
  inputId,
  inputTitle,
  inputName,
  labelName,
  required,
  readonly,
  handleNhomKh,
  productName,
  isResetValue,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean | undefined>(false);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [dropdownKey, setDropdownKey] = useState("");
  const [dataDropdown, setData] = useState<any>();

  useEffect(() => {
    switch (inputId) {
      case "bh_nhom_kh":
        setData(data.Nhom_KH);
        setInputValue(data.Nhom_KH[0].value);
        setDropdownKey(data.Nhom_KH[0].key);
        break;
      case "bh_xe_may_dung_tich_xe":
        setData(data.Loai_xe);
        setInputValue(undefined);
        break;
      case "bh_xe_may_tnds_thoi_han":
        setData(data.Thoi_han_bh);
        setDropdownKey(data.Thoi_han_bh[0].key);
        setInputValue(data.Thoi_han_bh[0].value);
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (isResetValue === true) {
      switch (inputId) {
        case "bh_xe_may_dung_tich_xe":
          setDropdownKey("");
          setInputValue("");
          break;
        case "bh_xe_may_tnds_thoi_han":
          setDropdownKey(data.Thoi_han_bh[0].key);
          setInputValue(data.Thoi_han_bh[0].value);
          break;

        default:
          break;
      }
    }
  }, [isResetValue]);

  const RenderOptionNhomKH = () => {
    const ContentDropdown = dataDropdown?.map((obj: any) => (
      <LI onClick={handleSetInputValue} data-index={obj.key} key={obj.key}>
        {obj.value}
      </LI>
    ));

    return <UL showDropdown={showDropdown}>{ContentDropdown}</UL>;
  };

  const handleShowDropdown = (showDropdown: boolean | undefined) => {
    setShowDropdown(showDropdown);
  };

  const handleClickOutsideRef = useOnclickOutside(() => {
    setShowDropdown(false);
  });

  const handleSetInputValue = (event: any) => {
    setDropdownKey(event.target.getAttribute("data-index"));
    setInputValue(event.target.innerText);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (inputValue) handleNhomKh ? handleNhomKh(inputValue) : {};
  }, [inputValue]);

  return (
    <DropdownWrapper>
      <TextInput
        inputType={inputType}
        inputId={inputId}
        inputName={inputName}
        inputTitle={inputTitle}
        labelName={labelName}
        required={required}
        readonly={readonly}
        handleShowDropdown={handleShowDropdown}
        isShowDropdown={showDropdown}
        dropdownKey={dropdownKey}
        inputValueFromProp={inputValue}
        productName={productName}
        isResetValue={isResetValue}
      />
      <StyledIcon icon={faSortDown} />
      <div ref={handleClickOutsideRef}>
        <RenderOptionNhomKH />
      </div>
    </DropdownWrapper>
  );
};

export default SelectDropdown;
