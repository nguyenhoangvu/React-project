import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADDPRODUCTINFORS } from "../../redux/types";

import "./index.scss";

type Props = {
  checkboxText: string;
  checkboxId: string;
  productName: string;
  isResetValue?: boolean;
  handleCheckboxChecked?: (checked: boolean) => void;
};

interface ISpan {
  checkboxId: string;
}

const SPAN = styled.span<ISpan>`
  padding-left: 15px;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  font-size: 0.875rem;
  color: #2196f3;
  font-weight: 500;
  ${({ checkboxId }) =>
    checkboxId === "check_dieu_khoan" &&
    `
    color: #9e9e9e;
  `}
`;

const CheckBox: React.FC<Props> = ({
  checkboxText,
  checkboxId,
  productName,
  isResetValue,
  handleCheckboxChecked,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const dispatch = useDispatch();

  const viewDK = () => {
    window.location.href =
      "https://portal.evbi.vn/TaiLieu/vbi_quy_tac_bao_hiem_xe_co_gioi.pdf";
  };

  useEffect(() => {
    if (checkboxId !== "check_dieu_khoan") {
      dispatch({
        type: ADDPRODUCTINFORS,
        payload: {
          key: checkboxId,
          value: checkboxChecked === true ? "checked" : "uncheck",
          productName: productName,
        },
      });
    }
    handleCheckboxChecked ? handleCheckboxChecked(checkboxChecked) : {};
  }, [checkboxChecked]);

  useEffect(() => {
    if (isResetValue === true) {
      setCheckboxChecked(true);
      dispatch({
        type: ADDPRODUCTINFORS,
        payload: {
          key: checkboxId,
          value: "checked",
          productName: productName,
        },
      });
    }
  }, [isResetValue]);

  return (
    <div onClick={() => setCheckboxChecked(!checkboxChecked)}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checkboxChecked}
        onChange={() => setCheckboxChecked(!checkboxChecked)}
      />
      <SPAN checkboxId={checkboxId}>{checkboxText}</SPAN>
      {checkboxId === "check_dieu_khoan" && (
        <span onClick={viewDK} style={{ color: "#039be5" }}>
          điều kiện, điều khoản, quy tắc của VBI.
        </span>
      )}
    </div>
  );
};

export default CheckBox;
