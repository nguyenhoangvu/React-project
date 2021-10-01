import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

import "./index.scss";

type Props = {
  onShow: boolean | undefined;
  handleModalClose: (close: boolean) => void;
  major: string;
  handlePaymentClicked: (isClicked: boolean) => void;
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
  major,
  handlePaymentClicked,
}) => {
  const [show, setShow] = useState<boolean | undefined>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    handleModalClose ? handleModalClose(false) : {};
  };

  const handlePayment = () => {
    handlePaymentClicked ? handlePaymentClicked(true) : {};
  };

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  useEffect(() => {
    switch (major) {
      case "TS.3":
        setModalContent(
          "Thông tin đơn bảo hiểm sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.6":
        setModalContent(
          "Thông tin đơn bảo hiểm sức khỏe sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.9":
        setModalContent(
          "Thông tin đơn bảo hiểm sốt xuất huyết sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.1.6":
        setModalContent(
          "Thông tin đơn bảo hiểm tai nạn con người sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.4.3":
        setModalContent(
          "Thông tin đơn bảo hiểm du lịch nội địa sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.4.1":
        setModalContent(
          "Thông tin đơn bảo hiểm du lịch quốc tế sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "XE":
        setModalContent(
          "Thông tin đơn bảo hiểm xe cơ giới sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.8":
        setModalContent(
          "Thông tin đơn bảo hiểm ung thư sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CN.7":
        setModalContent(
          "Thông tin đơn bảo hiểm bệnh hiểm nghèo sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "HO.12":
        setModalContent(
          "Thông tin đơn bảo hiểm trễ chuyến bay sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "HTVP":
        setModalContent(
          "Thông tin đơn bảo hiểm hỗ trợ viện phí sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "TNHGD":
        setModalContent(
          "Thông tin đơn bảo hiểm tai nạn hộ gia đình sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "XC.1.1":
        setModalContent(
          "Thông tin đơn bảo hiểm mô tô, xe máy sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "CORONA":
        setModalContent(
          "Thông tin đơn bảo hiểm Corona Shield sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      case "UTV":
        setModalContent(
          "Thông tin đơn bảo hiểm Pink Care sẽ không thể sửa đổi khi Quý khách tiếp tục. Quý khách có muốn tiếp tục?"
        );
        break;
      default:
        setModalContent("");
    }
  }, []);

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
        <Button onClick={handlePayment} className="modal-check-btn">
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCheck;
