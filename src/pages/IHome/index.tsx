import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import logo from "../../images/bao-hiem.png";
import iconMoto from "../../images/moto.svg";
import iconOto from "../../images/dgrr_xe.svg";
import iconHealth from "../../images/hospital.svg";
import iconChevon from "../../images/ic_chevron_right.svg";
import data from "../../json/partner-info.json";
import HrLine from "../../components/HrLine";
import Webview from "../Webview";

interface ILogoContainer {
  isShow: boolean;
}

const LogoContainer = styled.div<ILogoContainer>`
  display: ${(props) => (props.isShow === true ? "block" : "none")};
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
  padding: 15px 0;
`;

const LinkContent = styled.div`
  color: black;
  line-height: 34px;
  width: 55%;
`;

const IconStyle = styled.i`
  padding: 0 0.75rem;
`;

const IHome = () => {
  const [show, setShow] = useState(true);
  const [listIcon, setListIcon] = useState<any>([]);
  const listNV = data.list_nv;

  useEffect(() => {
    let arr: any[] = [];
    listNV.forEach((element) => {
      switch (element.key) {
        case "XC.1.1":
          let objMoto = {
            key: element.key,
            icon: iconMoto,
          };
          arr.push(objMoto);
          break;
        case "XE":
          let objCar = {
            key: element.key,
            icon: iconOto,
          };
          arr.push(objCar);
          break;
        case "CN.6":
          let objHealth = {
            key: element.key,
            icon: iconHealth,
          };
          arr.push(objHealth);
          break;
        default:
          break;
      }
    });
    setListIcon([...arr]);
  }, []);

  const handleClickRoute = () => {
    // setShow(false);
  };

  const RenderLink = () => {
    const ListLink = listNV.map((o) => (
      <Link key={o.key} to={o.route} onClick={handleClickRoute}>
        <>
          <LinkContentContainer>
            <IconStyle>
              {listIcon.map((key: any, index: any) => (
                <React.Fragment key={index}>
                  {key.key == o.key && <Image src={key.icon} alt="icon" />}
                </React.Fragment>
              ))}
            </IconStyle>
            <LinkContent>{o.value}</LinkContent>
            <IconStyle>
              <Image src={iconChevon} alt="icon" />
            </IconStyle>
          </LinkContentContainer>
          <HrLine isMargin={true} />
        </>
      </Link>
    ));
    return <>{ListLink}</>;
  };

  const Home = () => {
    return (
      <>
        <LogoContainer isShow={show}>
          <div style={{ textAlign: "center" }}>
            <img src={logo} alt="logo" width="300px" />
          </div>
        </LogoContainer>
        <NavContainer>
          <RenderLink />
        </NavContainer>
      </>
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WebviewXeMay" element={<Webview category="XC.1.1" />} />
        <Route path="/WebviewOto" element={<Webview category="XC.2.1" />} />
        <Route path="/WebviewSucKhoe" element={<Webview category="CN.6" />} />
      </Routes>
    </>
  );
};

export default IHome;
