import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";

import TextInput from "../TextInput";
import { RootState } from "../../redux/store/rootReducer";
import "./index.scss";

type Props = {
  inputType: string;
  inputLength?: number;
  inputId: string;
  inputTitle: string;
  inputName: string;
  labelName: string;
  required: boolean;
  readonly?: boolean;
  defaultToday?: boolean;
  productName: string;
  isResetValue?: boolean;
  limitDate?: boolean;
  valueFromRedux?: string;
};

interface ICalendarWrapper {
  showCalendar?: boolean;
}

const CalendarWrapper = styled.div<ICalendarWrapper>`
  position: absolute;
  display: ${(props) => (props.showCalendar === true ? "block" : "none")};
  border: 1px solid #777777;
  box-shadow: 0 12px 36px 16px rgb(0 0 0 / 24%);
  z-index: 1;
  top: 0;
`;

const DateInput: React.FC<Props> = ({
  inputType,
  inputId,
  inputTitle,
  inputName,
  labelName,
  required,
  readonly,
  defaultToday,
  productName,
  isResetValue,
  limitDate,
  valueFromRedux,
}) => {
  const [calendarValue, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean | undefined>(false);
  const [inputValue, setInputValue] = useState("");

  const dataRedux = useSelector((state: RootState) => state.reducer);

  let insuredRelation = dataRedux.listProducts.find(
    (o) => o.key == "insured_relation" && o.productName == productName
  );

  const handleShowCalendar = (showCalendar: boolean | undefined) => {
    setShowCalendar(showCalendar);
  };

  useEffect(() => {
    if (
      defaultToday &&
      inputName !== "user_birthday" &&
      inputName !== "insured_birthday"
    ) {
      setInputValue(moment().format("DD/MM/YYYY"));
    }
  }, []);

  useEffect(() => {
    let today = moment(new Date()).format("DD/MM/YYYY");
    let datePicked = moment(calendarValue).format("DD/MM/YYYY");
    if (
      (inputName === "user_birthday" || inputName === "insured_birthday") &&
      today === datePicked
    ) {
      return;
    } else {
      setInputValue(datePicked);
      setShowCalendar(false);
    }
  }, [calendarValue]);

  useEffect(() => {
    if (isResetValue === true) {
      if (!inputName.includes("birthday"))
        setInputValue(moment().format("DD/MM/YYYY"));
      else setInputValue("");
    }
  }, [isResetValue]);

  useEffect(() => {
    if (insuredRelation && insuredRelation.value == "BAN_THAN") {
      switch (inputName) {
        case "insured_birthday":
          let customerBirthday = dataRedux.userInfo.find(
            (o) => o.key == "user_birthday"
          );
          customerBirthday && setInputValue(customerBirthday.value.toString());
          break;
        default:
          break;
      }
    } else if (
      insuredRelation &&
      insuredRelation.value !== "BAN_THAN" &&
      dataRedux.modify_product == 0
    ) {
      if (inputName == "insured_birthday") {
        setInputValue("");
      }
    }
  }, [insuredRelation, dataRedux.modify_product]);

  useEffect(() => {
    if (dataRedux.modify_product !== 0) {
      let modify = dataRedux.listProducts.find(
        (o) =>
          o.key === inputName &&
          o.productName === "product_" + dataRedux.modify_product
      );
      modify && setInputValue(modify.value);
    }
  }, [dataRedux.modify_product]);

  useEffect(() => {
    if (valueFromRedux != undefined) {
      setInputValue(valueFromRedux);
    }
  }, [valueFromRedux]);

  return (
    <>
      <TextInput
        inputType={inputType}
        inputId={inputId}
        inputName={inputName}
        inputTitle={inputTitle}
        labelName={labelName}
        required={required}
        readonly={readonly}
        handleShowDropdown={handleShowCalendar}
        isShowDropdown={showCalendar}
        inputValueFromProp={inputValue}
        productName={productName}
        isResetValue={isResetValue}
      />
      <CalendarWrapper showCalendar={showCalendar}>
        <Calendar
          onChange={onChange}
          value={calendarValue}
          className="custom-calendar"
          minDate={limitDate === false ? undefined : moment().toDate()}
        />
      </CalendarWrapper>
    </>
  );
};

export default DateInput;
