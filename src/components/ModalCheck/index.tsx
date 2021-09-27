import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

import "./index.scss";

type Props = {
  onShow: boolean | undefined;
  handleModalClose: (close: boolean) => void;
  modalContent: string;
};

const ModalBodyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25em;
  border: none;
  border-radius: 0.3125em;
  background: #fff;
  /* font-family: inherit; */
  font-size: 1rem;
`;

const ModalBodyWarnning = styled.div`
  position: relative;
  color: #f8bb86;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: content-box;
  justify-content: center;
  width: 5em;
  height: 5em;
  margin: 1.25em auto 1.875em;
  zoom: normal;
  border: 0.25em solid #facea8;
  border-radius: 50%;
  font-family: inherit;
  line-height: 5em;
  cursor: default;
  &:before {
    content: "!";
    display: flex;
    align-items: center;
    height: 92%;
    font-size: 3.75em;
  }
`;

const ModalBodyContent = styled.div`
  color: #005790;
  z-index: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
`;

const ModalCheck: React.FC<Props> = ({
  onShow,
  handleModalClose,
  modalContent,
}) => {
  const [show, setShow] = useState<boolean | undefined>(false);

  const handleClose = () => {
    setShow(false);
    handleModalClose ? handleModalClose(false) : {};
  };

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      className="modal-check"
    >
      <Modal.Body>
        <ModalBodyWrapper>
          <ModalBodyWarnning />
          <ModalBodyContent>{modalContent}</ModalBodyContent>
        </ModalBodyWrapper>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          variant="danger"
          className="modal-check-btn"
        >
          Hủy
        </Button>
        <Button onClick={handleClose} className="modal-check-btn">
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCheck;
