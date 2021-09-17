import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./index.scss";

type Props = {
  checkboxText: string;
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

const CheckBox: React.FC<Props> = ({ checkboxText }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  return (
    <div onClick={() => setCheckboxChecked(!checkboxChecked)}>
      <input
        type="checkbox"
        checked={checkboxChecked}
        onChange={() => setCheckboxChecked(!checkboxChecked)}
      />
      <SPAN>{checkboxText}</SPAN>
    </div>
  );
};

export default CheckBox;
