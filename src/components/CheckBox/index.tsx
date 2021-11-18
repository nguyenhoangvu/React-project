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

const SPAN = styled.label<ISpan>`
  padding-left: 18px;
  cursor: pointer;
  line-height: 25px;
  font-size: 0.875rem;
  color: #2196f3;
  font-weight: 500;
  ${({ checkboxId }) =>
    (checkboxId === "check_dieu_khoan" ||
      checkboxId.startsWith("insured") ||
      checkboxId.startsWith("health")) &&
    `
    color: #9e9e9e;
  `}
`;

const DIV = styled.div<ISpan>`
  ${({ checkboxId }) =>
    (checkboxId.startsWith("insured") || checkboxId.startsWith("health")) &&
    `
    margin-top: 15px;
  `}
  ${({ checkboxId }) =>
    checkboxId.startsWith("health") &&
    `
    padding: 0 10px;
  `}
  display: flex;
`;

const CheckBox: React.FC<Props> = ({
  checkboxText,
  checkboxId,
  productName,
  isResetValue,
  handleCheckboxChecked,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const dispatch = useDispatch();

  const viewDK = () => {
    window.location.href =
      "https://portal.evbi.vn/TaiLieu/vbi_quy_tac_bao_hiem_xe_co_gioi.pdf";
  };

  useEffect(() => {
    if (
      checkboxId != "check_dieu_khoan" &&
      !checkboxId.startsWith("insured") &&
      !checkboxId.startsWith("health")
    ) {
      setCheckboxChecked(true);
    }
  }, []);

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
      if (!checkboxId.startsWith("insured")) {
        setCheckboxChecked(true);
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: checkboxId,
            value: "checked",
            productName: productName,
          },
        });
      } else {
        setCheckboxChecked(false);
        dispatch({
          type: ADDPRODUCTINFORS,
          payload: {
            key: checkboxId,
            value: "uncheck",
            productName: productName,
          },
        });
      }
    }
  }, [isResetValue]);

  return (
    <DIV
      checkboxId={checkboxId}
      onClick={() => setCheckboxChecked(!checkboxChecked)}
    >
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
    </DIV>
  );
};

export default CheckBox;
