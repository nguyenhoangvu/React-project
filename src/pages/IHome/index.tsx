import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../../images/bao-hiem.png";
import iconMoto from "../../images/moto.svg";
import iconChevon from "../../images/ic_chevron_right.svg";
import data from "../../json/partner-info.json";
import HrLine from "../../components/HrLine";
import Webview from "../Webview";

const LogoContainer = styled.div`
  position: relative;
  box-shadow: none;
  height: 85px;
  background-color: #eeeeee;
  padding-top: 7px;
  width: 100%;
`;

const Image = styled.img`
  width: 34px;
  height: 34px;
`;

const NavContainer = styled.div`
  padding: 0 0.75rem;
`;

const LinkContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const LinkContent = styled.div`
  color: black;
  line-height: 34px;
  width: 70%;
`;

const IHome = () => {
  const listNV = data.list_nv;

  return (
    <div id="home">
      <LogoContainer>
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="logo" width="300px" />
        </div>
      </LogoContainer>
      <NavContainer>
        <Link to="">
          <>
            <LinkContentContainer>
              <i>
                <Image src={iconMoto} alt="icon moto" />
              </i>
              <LinkContent>Bảo hiểm xe máy</LinkContent>
              <i>
                <Image src={iconChevon} alt="icon" />
              </i>
            </LinkContentContainer>
            <HrLine />
          </>
        </Link>
      </NavContainer>
    </div>
  );
};

export default IHome;
