import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADDPRODUCTINFORS } from "../../redux/types";

import "./index.scss";

type Props = {
  checkboxText: string;
  checkboxId: string;
  productName: string;
};

const SPAN = styled.span`
  padding-left: 15px;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  font-size: 0.875rem;
  color: #2196f3;
  font-weight: 500;
`;

const CheckBox: React.FC<Props> = ({
  checkboxText,
  checkboxId,
  productName,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADDPRODUCTINFORS,
      payload: {
        key: checkboxId,
        value: checkboxChecked === true ? "checked" : "uncheck",
        productName: productName,
      },
    });
  }, [checkboxChecked]);

  return (
    <div onClick={() => setCheckboxChecked(!checkboxChecked)}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checkboxChecked}
        onChange={() => setCheckboxChecked(!checkboxChecked)}
      />
      <SPAN>{checkboxText}</SPAN>
    </div>
  );
};

export default CheckBox;
