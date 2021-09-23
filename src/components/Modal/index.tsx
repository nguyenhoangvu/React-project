import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

import data from "../../common/json_tinh_thanh_gr_bv.json";
import TextInput from "../TextInput";
import "./index.scss";

type Props = {
  onShow: boolean | undefined;
  handleInputValue: (input: string) => void;
  handleModalClose: (close: boolean | undefined) => void;
  isResetValue?: boolean;
};

const ModalContentWrapper = styled.div`
  position: relative;
  height: calc(100vh - 395px);
  width: 100%;
  overflow-y: auto;
`;

const ListContentWrapper = styled.div`
  border-bottom: 1px solid #9e9e9e;
  width: 97%;
  line-height: 26px;
`;

const ListContentStyle = styled.div`
  padding: 10px;
  font-size: 15px;
`;

const SPAN = styled.span`
  font-size: 18px;
  padding-left: 20px;
`;

const ModalInput: React.FC<Props> = ({
  onShow,
  handleInputValue,
  handleModalClose,
  isResetValue,
}) => {
  const [show, setShow] = useState<boolean | undefined>(false);
  const [placeHolder, setPlaceHolder] = useState("Tìm tỉnh thành");
  const [renderCities, setRenderCities] = useState(true);
  const [renderDistrict, setRenderDistrict] = useState(false);
  const [cityCode, setCityCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => setShow(false);

  const handleDistrictInCity = (cityCode: string, cityName: string) => {
    setCityCode(cityCode);
    setCityName(cityName);
    setRenderCities(false);
    setRenderDistrict(true);
  };

  const onDistrictClick = (districtCode: string, districtName: string) => {
    setInputValue(districtName + " - " + cityName);
    setShow(false);
    setRenderCities(true);
    setRenderDistrict(false);
  };

  const RenderCities = () => {
    const ListCities = data.TTQH.map((obj, i) => {
      if (obj.Nhom === "TINH_THANH") {
        return (
          <ListContentWrapper
            onClick={() => handleDistrictInCity(obj.Ma, obj.name)}
            key={i}
          >
            <ListContentStyle>
              <FontAwesomeIcon icon={faMapMarkedAlt} size="2x" />
              <SPAN>{obj.name}</SPAN>
            </ListContentStyle>
          </ListContentWrapper>
        );
      }
    });
    return <ModalContentWrapper>{ListCities}</ModalContentWrapper>;
  };

  const RenderDistricts = () => {
    const ListDistricts = data.TTQH.map((obj, i) => {
      if (obj.Nhom === "QUAN_HUYEN" && obj.ma_ct === cityCode) {
        return (
          <ListContentWrapper
            onClick={() => onDistrictClick(obj.Ma, obj.name)}
            key={i}
          >
            <ListContentStyle>
              <FontAwesomeIcon icon={faMapMarkedAlt} size="2x" />
              <SPAN>{obj.name}</SPAN>
            </ListContentStyle>
          </ListContentWrapper>
        );
      }
    });
    return <ModalContentWrapper>{ListDistricts}</ModalContentWrapper>;
  };

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  useEffect(() => {
    handleInputValue ? handleInputValue(inputValue) : {};
  }, [inputValue]);

  useEffect(() => {
    handleModalClose ? handleModalClose(show) : {};
  }, [show]);

  useEffect(() => {
    setInputValue("");
  }, [isResetValue]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal"
      >
        <Modal.Body>
          <div className="search-wrapper">
            <TextInput
              inputId="txtSearchBank"
              inputName=""
              inputTitle=""
              inputType="text"
              labelName=""
              required={false}
              placeHolder={placeHolder}
              productName=""
            />
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              className="icon-search"
            />
          </div>
          {renderCities && <RenderCities />}
          {renderDistrict && <RenderDistricts />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="btn-close">
            THOÁT
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalInput;
