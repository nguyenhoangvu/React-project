import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

type Props = {
  onShow: boolean | undefined;
  handleModalClose: (close: boolean) => void;
};

const ModalCheck: React.FC<Props> = ({ onShow, handleModalClose }) => {
  const [show, setShow] = useState<boolean | undefined>(false);

  const handleClose = () => {
    setShow(false);
    handleModalClose ? handleModalClose(false) : {};
  };

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  return (
    <Modal show={show} onHide={handleClose} animation={false} className="modal">
      <Modal.Body>hello</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} className="btn-close">
          Hủy
        </Button>
        <Button onClick={handleClose} className="btn-close">
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCheck;
