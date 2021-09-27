import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  errorContent: string;
  isShowError: boolean;
};

const animation = keyframes`
  0% {
    transform: translateY(130%);
  }
  100% {
    transform: translateY(0);
  }
`;

interface IErrorStyleWrapper {
  isShow: boolean;
}

const ErrorStyleWrapper = styled.div<IErrorStyleWrapper>`
  display: ${(props) => (props.isShow === true ? "block" : "none")};
  border-radius: 2px;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-top: 10px;
  height: auto;
  min-height: 48px;
  line-height: 1.5em;
  word-break: break-all;
  background-color: #323232;
  padding: 10px 25px;
  font-size: 1.1rem;
  left: 0px;
  font-weight: 300;
  color: #fff;
  z-index: 11111111111;
  animation: 1s ${animation} ease-in;
`;

const Error: React.FC<Props> = ({ errorContent, isShowError }) => {
  const [show, setShow] = useState(isShowError);

  useEffect(() => {
    let timer1: any;
    if (show === true) {
      timer1 = setTimeout(() => setShow(!show), 5000);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [show]);
  return <ErrorStyleWrapper isShow={show}>{errorContent}</ErrorStyleWrapper>;
};

export default Error;
