import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";

import { MODIFYORDERID } from "../../../../redux/types";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DistrictInput from "../../../../components/DistrictInput";
import { validate } from "../../../../common/validateInfor";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormCarInfo: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const dataRedux = useSelector((state: RootState) => state.reducer.userInfo);
  const listInputMustValidate = useSelector(
    (state: RootState) => state.reducer.listInputMustValidate
  );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  const modifyProduct = useSelector(
    (state: RootState) => state.reducer.modify_product
  );

  const handleDisplayForm = (buttonClicked: string) => {
    if (buttonClicked === "back") setButtonClick(buttonClicked);
    else if (buttonClicked === "next") {
      let listInput = listInputMustValidate.filter(
        (o) =>
          o.key.startsWith("moto") ||
          o.key.startsWith("gcn") ||
          o.key.startsWith("cx")
      );
      let test = validate(listInput, listProduct, productName);
      if (test !== "") {
        setIsShowError(!isShowError);
        setErrorMsg(test);
      } else {
        if (modifyProduct !== 0) {
          dispatch({
            type: MODIFYORDERID,
            payload: 0,
          });
        }
        setButtonClick(buttonClicked);
      }
    }
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  useEffect(() => {
    handleShowError ? handleShowError(isShowError, errorMsg) : {};
    let timer1: any;
    if (isShowError === true) {
      timer1 = setTimeout(() => setIsShowError(!isShowError), 3000);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [isShowError, errorMsg]);

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Thông tin xe ô tô</h5>
          <Row>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_oto_bien_xe"
                inputName="oto_plate"
                inputTitle="Biển xe"
                labelName="Biển xe"
                required={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_oto_so_khung"
                inputName="oto_chassisNumber"
                inputTitle="Số khung"
                labelName="Số khung"
                required={false}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_oto_so_may"
                inputName="oto_engineNumber"
                inputTitle="Số máy"
                labelName="Số máy"
                required={false}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="bh_oto_nam_sx"
                inputName="oto_yearProduce"
                inputTitle="Năm sản xuất"
                labelName="Năm sản xuất"
                required={true}
                readonly={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="bh_oto_md_sd"
                inputName="oto_intendedUse"
                inputTitle="Mục đích sử dụng"
                labelName="Mục đích sử dụng"
                required={true}
                readonly={true}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="text"
                inputId="bh_oto_so_cho"
                inputName="oto_seats"
                inputTitle="Số chỗ"
                labelName="Số chỗ"
                required={false}
                productName={productName}
              />
            </Col>
          </Row>
          <SelectDropdown
            inputType="text"
            inputId="bh_oto_nhom_xe"
            inputName="oto_type"
            inputTitle="Nhóm xe"
            labelName="Nhóm xe"
            required={true}
            readonly={true}
            productName={productName}
          />
          <TextInput
            inputType="text"
            inputId="bh_oto_ttai"
            inputName="oto_payload"
            inputTitle="trọng tải"
            labelName="Trọng tải (Đ.vị: Tấn)"
            required={true}
            productName={productName}
            isResetValue={false}
          />
        </Col>
        <div style={{ height: "10vh" }}></div>
        <DirectButton
          handleButtonClick={handleDisplayForm}
          buttonCallback={buttonClick}
          isPay={false}
          isSummaryPage={false}
          isValidateFalse={isShowError}
        />
      </Row>
    </Container>
  );
};

export default FormCarInfo;
