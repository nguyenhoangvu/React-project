import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";

import TextInput from "../TextInput";
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
};

interface ICalendarWrapper {
  showCalendar?: boolean;
}

const CalendarWrapper = styled.div<ICalendarWrapper>`
  position: absolute;
  display: ${(props) => (props.showCalendar === true ? "block" : "none")};
  border: 1px solid #777777;
  box-shadow: 0 12px 36px 16px rgb(0 0 0 / 24%);
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
}) => {
  const [calendarValue, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean | undefined>(false);
  const [inputValue, setInputValue] = useState("");

  const handleShowCalendar = (showCalendar: boolean | undefined) => {
    setShowCalendar(showCalendar);
  };

  useEffect(() => {
    if (defaultToday) {
      let today = moment().format("DD/MM/YYYY");
      setInputValue(today);
    }
  }, []);

  useEffect(() => {
    let datePicked = moment(calendarValue).format("DD/MM/YYYY");
    setInputValue(datePicked);
    setShowCalendar(false);
  }, [calendarValue]);

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
        handleShowDropdown={handleShowCalendar}
        isShowDropdown={showCalendar}
        inputValueFromProp={inputValue}
      />
      <CalendarWrapper showCalendar={showCalendar}>
        <Calendar
          onChange={onChange}
          value={calendarValue}
          className="custom-calendar"
          minDate={moment().toDate()}
        />
        {/* <div>
          <button>Hôm nay</button>
          <button>Thoát</button>
        </div> */}
      </CalendarWrapper>
    </div>
  );
};

export default DateInput;
