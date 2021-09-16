import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import data from "../../common/json_tinh_thanh_gr_bv.json";
import TextInput from "../TextInput";
import "./index.scss";

type Props = {
  onShow: boolean | undefined;
};

const ModalInput: React.FC<Props> = ({ onShow }) => {
  const [show, setShow] = useState<boolean | undefined>(false);
  const [placeHolder, setPlaceHolder] = useState("Tìm tỉnh thành");
  //   const [listData, setListData] = useState<any>()

  //   useEffect(() => {
  //     setListData(data.TTQH)
  //   },[])

  const handleClose = () => setShow(false);

  const RenderTinhThanh = () => {
    const ListTinhThanh = data.TTQH.map((obj, i) => <div>hello</div>);
  };

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs="12">
                <div className="search-wrapper">
                  <TextInput
                    inputId="txtSearchBank"
                    inputName=""
                    inputTitle=""
                    inputType="text"
                    labelName=""
                    required={false}
                    placeHolder={placeHolder}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="1x"
                    className="icon-search"
                  />
                </div>
              </Col>
            </Row>
          </Container>
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
