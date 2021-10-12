import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import useOnclickOutside from "react-cool-onclickoutside";

import { RootState } from "../../redux/store/rootReducer";
import TextInput from "../TextInput";
import data from "../../json/select-dropdown.json";
import { getYearProduce } from "../../common/getYearProduce";
import { getListGroupCar } from "../../adapters/apis/carAPIs";

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
  max-height: 30.625rem;
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
  padding: 0.75rem 0.1875rem 0.75rem 1.5625rem;
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

  const dataRedux = useSelector((state: RootState) => state.reducer);

  useEffect(() => {}, []);

  useEffect(() => {
    switch (inputName) {
      case "nhom_kh":
        setData(data.Nhom_KH);
        setInputValue(data.Nhom_KH[0].value);
        setDropdownKey(data.Nhom_KH[0].key);
        break;
      case "moto_volumn":
        setData(data.Loai_xe);
        setInputValue(undefined);
        break;
      case "expired_time_tnds":
        setData(data.Thoi_han_bh);
        setDropdownKey(data.Thoi_han_bh[0].key);
        setInputValue(data.Thoi_han_bh[0].value);
        break;
      case "user_sex":
        setData(data.Gioi_tinh);
        setDropdownKey(data.Gioi_tinh[0].key);
        setInputValue(data.Gioi_tinh[0].value);
        break;
      case "oto_intendedUse":
        setData(data.Muc_dich);
        setDropdownKey(data.Muc_dich[0].key);
        setInputValue(data.Muc_dich[0].value);
        break;
      case "oto_yearProduce":
        let arr = getYearProduce();
        setData(arr);
        setDropdownKey(arr[0].key);
        setInputValue(arr[0].value);
        break;
      case "oto_type":
        getListGroupCar()
          .then((res: any) => {
            if (!res.isError) {
              let arr = [
                {
                  key: "0",
                  value: "--Chọn--",
                },
              ];
              res.result.map((o: any) => {
                let obj = {
                  key: o.groupCar,
                  value: o.groupCarName,
                };
                arr.push(obj);
              });
              setData(arr);
              setDropdownKey(arr[0].key);
              setInputValue(arr[0].value);
            }
          })
          .catch((err) => {});
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (isResetValue === true) {
      switch (inputName) {
        case "moto_volumn":
          setDropdownKey("");
          setInputValue("");
          break;
        case "expired_time_tnds":
          setDropdownKey(data.Thoi_han_bh[0].key);
          setInputValue(data.Thoi_han_bh[0].value);
          break;

        default:
          break;
      }
    }
  }, [isResetValue]);

  useEffect(() => {
    if (dataRedux.modify_product !== 0) {
      let modify = dataRedux.listProducts.find(
        (o) =>
          o.key === inputName &&
          o.productName === "product_" + dataRedux.modify_product
      );
      if (modify !== undefined) {
        setDropdownKey(modify.value);
        if (inputName.includes("time")) {
          let time = data.Thoi_han_bh.find((o) => o.key === modify?.value);
          time !== undefined && setInputValue(time.value);
        } else if (inputName === "moto_volumn") {
          let motoType = data.Loai_xe.find((o) => o.key === modify?.value);
          motoType !== undefined && setInputValue(motoType.value);
        }
      }
    }
  }, [dataRedux.modify_product]);

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
