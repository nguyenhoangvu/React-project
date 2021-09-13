import React from "react";
import styled from "styled-components";

import ButtonBack from "../../components/ButtonBack";
import ButtonNext from "../../components/ButtonNext";

const ButtonWrapper = styled.div`
  position: fixed;
  transition: transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53),
    background-color 0s linear 0.2s;
  text-align: center;
  width: 100%;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  z-index: 997;
  background-color: #005790;
  padding: 0;
  height: 56px;
`;

const DirectButton = () => {
  return (
    <ButtonWrapper>
      <ul>
        <li>
          <ButtonBack />
        </li>
        <li>
          <ButtonNext />
        </li>
      </ul>
    </ButtonWrapper>
  );
};

export default DirectButton;
