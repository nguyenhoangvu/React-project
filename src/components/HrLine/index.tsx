import React from "react";
import styled from "styled-components";

type Props = {
  isMargin?: boolean;
};

interface IStyledHr {
  isMarginTop?: boolean;
}

const Hr = styled.hr<IStyledHr>`
  border: 0.0625rem solid #e0e0e0;
  border-bottom: 0px;
  height: 0px;
  margin-top: ${(props) => (props.isMarginTop === true ? "0" : "1rem")};
`;

const HrLine: React.FC<Props> = ({ isMargin }) => {
  return <Hr isMarginTop={isMargin} />;
};

export default HrLine;
