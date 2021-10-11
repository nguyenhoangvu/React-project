import { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../../json/home-page-json.json";
import partnerData from "../../json/partner-info.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

import HrLine from "../../components/HrLine";
import images from "../../common/pageImage";
import Footer from "../Footer";
import ButtonBuy from "../../components/ButtonBuy";
import FormXeMay from "./FormXeMay";
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

const Webview = () => {
  const [buttonBuyClick, setButtonBuyClick] = useState(false);
  const [dataPage, setData] = useState<any>();

  useEffect(() => {
    switch (partnerData.nv) {
      case "XC.1.1":
        setData(data.TNDS_xe_may);
        break;
      case "XC.2.1":
        setData(data.TNDS_o_to);
        break;
      default:
        break;
    }
  }, []);

  const ImageSelect = () => {
    const image = images.map(
      ({ id, nv, src, title, description }) =>
        nv === partnerData.nv && (
          <Image key={id} src={src} title={title} alt={description} />
        )
    );
    return <div>{image}</div>;
  };

  const ProductInfo = () => {
    const ProductInfo = dataPage?.map((obj: any, i: any) => (
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
                {obj.product_intro.key}
              </h3>
              <p>{obj.product_intro.value}</p>
              <div className="content-page-main-description">
                {obj.product_intro.types_and_services.map((o: any, i: any) => (
                  <ul className="content-page-main-description-title" key={i}>
                    {o.type_title}
                    {o.types.map((key: any, j: any) => (
                      <li key={j}>{key.value}</li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className="content-page-main-description">
                {obj.product_intro.types_and_services.map((o: any, i: any) => (
                  <ul className="content-page-main-description-title" key={i}>
                    {o.service_title}
                    {o.services.map((key: any, j: any) => (
                      <li key={j}>{key.value}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <HrLine />
          </Col>
        </Row>
      </Container>
    ));

    return <div>{ProductInfo}</div>;
  };

  const ProductBenefit = () => {
    const ProductBenefit = dataPage?.map((obj: any, i: any) => (
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
                {obj.insurance_benefits.key}
              </h3>
              <div className="content-page-main-description">
                {obj.insurance_benefits.insurance_benefit_contents.map(
                  (o: any, i: any) => (
                    <ul className="content-page-main-description-title" key={i}>
                      {o.insurance_benefits_key}
                      {o.insurance_benefits_values.map((key: any, j: any) => (
                        <li key={j}>{key.value}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    ));

    return <div>{ProductBenefit}</div>;
  };

  const handleClickButton = (click: boolean) => {
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
        <ImageSelect />
        <ProductInfo />
        <ProductBenefit />
        <Footer />
        <HrLine />
        <ButtonBuy
          handleClickButton={handleClickButton}
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

export default Webview;
