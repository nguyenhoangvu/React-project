import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  buttonTitle: string;
};

const A = styled.a`
  background-color: #f5f5f5;
  border-radius: 20px;
  color: #343434;
  cursor: pointer;
  padding: 8px 30px;
  text-transform: uppercase;
`;

const ButtonSummary: React.FC<Props> = ({ buttonTitle }) => {
  return <A>{buttonTitle}</A>;
};

export default ButtonSummary;
