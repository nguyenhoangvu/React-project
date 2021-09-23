import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../../json/home-page-json.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

import HrLine from "../../components/HrLine";
import Footer from "../Footer";
import ButtonBuy from "../../components/ButtonBuy";
import FormXeMay from "./Form";

import "./index.scss";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

interface PageProps {
  pageDisplay: boolean;
}

const Page = styled.section<PageProps>`
  display: ${(props) => (props.pageDisplay === true ? "none" : "block")};
`;

interface FormProps {
  formDisplay: boolean;
}
const Form = styled.section<FormProps>`
  display: ${(props) => (props.formDisplay === true ? "block" : "none")};
`;

const ProductInfo = () => {
  const ProductInfo = data.TNDS_xe_may.map((obj, i) => (
    <Container key={i}>
      <Row className="justify-content-md-center">
        <Col xs="12" className="content-page">
          <FontAwesomeIcon
            icon={faCheck}
            size="1x"
            className="content-page-icons"
          />
          <div className="content-page-main">
            <h3 className="content-page-main-tiltle" key={i}>
              {obj.product_info}
            </h3>
            <p>{obj.product_info_content}</p>
            <div className="content-page-main-description">
              <ul className="content-page-main-description-title">
                {obj.insurance_type}

                {obj.insurance_type_content?.map((key, j) => (
                  <li key={j}>{key.value}</li>
                ))}
              </ul>
            </div>
            <div className="content-page-main-description">
              <ul className="content-page-main-description-title">
                {obj.insurance_services}
                {obj.insurance_services_content?.map((key, j) => (
                  <li key={j}>{key.value}</li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  ));

  return <div>{ProductInfo}</div>;
};

const WebviewXeMay = () => {
  const [buttonBuyClick, setButtonBuyClick] = useState(false);

  const handleClickBuyButton = (click: boolean) => {
    setButtonBuyClick(click);
  };

  const handleDirectButtonClick = (buttonClicked: string) => {
    if (buttonClicked === "back") {
      setButtonBuyClick(false);
    }
  };

  return (
    <div className="WebviewTNDSXeMay">
      <Page pageDisplay={buttonBuyClick}>
        <Image
          src="https://api.evbi.vn/images/moto_files/VBI-bao-hiem-mo-to.png"
          alt="Bảo hiểm TNDS mô tô xe máy"
        />
        <ProductInfo />
        <Footer />
        <HrLine />
        <ButtonBuy
          handleClickBuyButton={handleClickBuyButton}
          pageCallback={buttonBuyClick}
          buttonIcon="buy"
        />
      </Page>
      <Form formDisplay={buttonBuyClick}>
        <FormXeMay
          handleDirectButtonClick={handleDirectButtonClick}
          pageCallback={buttonBuyClick}
        />
      </Form>
    </div>
  );
};

export default WebviewXeMay;
