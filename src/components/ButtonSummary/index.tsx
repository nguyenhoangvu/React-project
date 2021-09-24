import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { REMOVEPRODUCT, MODIFYPRODUCT } from "../../redux/types";
import { RootState } from "../../redux/store/rootReducer";

type Props = {
  buttonTitle: string;
  productIndex: number;
  handleIsUpdateProduct?: (isModify: boolean, productIndex: number) => void;
};

const A = styled.a`
  background-color: #f5f5f5;
  border-radius: 20px;
  color: #343434;
  cursor: pointer;
  padding: 8px 30px;
  text-transform: uppercase;
  text-decoration: none;
`;

const ButtonSummary: React.FC<Props> = ({
  buttonTitle,
  productIndex,
  handleIsUpdateProduct,
}) => {
  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.reducer);

  const handleClick = () => {
    if (buttonTitle === "Sửa") {
      handleIsUpdateProduct ? handleIsUpdateProduct(true, productIndex) : {};
      dispatch({
        type: MODIFYPRODUCT,
        payload: productIndex,
      });
    } else if (buttonTitle === "Xóa") {
      if (dataRedux.total_product === 1) return;
      dispatch({
        type: REMOVEPRODUCT,
        payload: productIndex,
      });
    }
  };
  return <A onClick={handleClick}>{buttonTitle}</A>;
};

export default ButtonSummary;
