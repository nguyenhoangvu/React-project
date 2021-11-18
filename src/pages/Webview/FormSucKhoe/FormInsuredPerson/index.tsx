import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";

import { MODIFYORDERID } from "../../../../redux/types";
import DirectButton from "../../../DirectButton";
import TextInput from "../../../../components/TextInput";
import SelectDropdown from "../../../../components/SelectDropdown";
import DateInput from "../../../../components/DateInput";
import { validate } from "../../../../common/validateInfor";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
  productName: string;
  isAddProductButtonClicked: boolean;
  handleShowError: (isError: boolean, errorMsg: string) => void;
};

const FormInsuredPerson: React.FC<Props> = ({
  handleButtonClick,
  pageCallback,
  productName,
  isAddProductButtonClicked,
  handleShowError,
}) => {
  const [buttonClick, setButtonClick] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRelation, setUserRelation] = useState("");
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
      let listInput = listInputMustValidate.filter((o) =>
        o.key.startsWith("insured")
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

  const handleCustomerRelation = (rela: string) => {
    if (!rela.includes("Chọn")) setUserRelation(rela);
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
          <h5>Thông tin người được bảo hiểm</h5>
          <SelectDropdown
            inputType="text"
            inputId="bh_user_relation"
            inputName="insured_relation"
            inputTitle="quan hệ với người mua"
            labelName="Mối quan hệ với người mua bảo hiểm"
            required={true}
            readonly={true}
            productName={productName}
            handleCustomerRelation={handleCustomerRelation}
          />
          <TextInput
            inputType="text"
            inputId="frm_bhsk_hoten_ndbh"
            inputName="insured_name"
            inputTitle="tên người được bảo hiểm"
            labelName="Tên người được bảo hiểm"
            required={true}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_name")?.value &&
              userRelation == "Bản thân"
                ? dataRedux.find((elem: any) => elem.key === "user_name")?.value
                : ""
            }
            productName={productName}
          />
          <TextInput
            inputType="text"
            inputId="frm_bhsk_diachi_ndbh"
            inputName="insured_address"
            inputTitle="địa chỉ"
            labelName="Địa chỉ"
            required={true}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_diachi")
                ?.value && userRelation == "Bản thân"
                ? dataRedux.find((elem: any) => elem.key === "user_diachi")
                    ?.value
                : ""
            }
            productName={productName}
          />
          <Row>
            <Col xs="6">
              <DateInput
                inputType="text"
                inputId="bh_sk_ngay_sinh"
                inputName="insured_birthday"
                inputTitle="ngay_sinh"
                labelName="Ngày sinh"
                required={true}
                readonly={true}
                defaultToday={false}
                limitDate={false}
                productName={productName}
                valueFromRedux={
                  dataRedux.find((elem: any) => elem.key === "user_birthday")
                    ?.value && userRelation == "Bản thân"
                    ? dataRedux
                        .find((elem: any) => elem.key === "user_birthday")
                        ?.value.toString()
                    : ""
                }
              />
            </Col>
            <Col xs="6">
              <SelectDropdown
                inputType="text"
                inputId="bh_sk_gioi_tinh"
                inputName="insured_sex"
                inputTitle="Giới tính"
                labelName="Giới tính"
                required={true}
                readonly={true}
                productName={productName}
                valueFromRedux={
                  dataRedux.find((elem: any) => elem.key === "user_sex")
                    ?.value && userRelation == "Bản thân"
                    ? dataRedux
                        .find((elem: any) => elem.key === "user_sex")
                        ?.value.toString()
                    : ""
                }
              />
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <TextInput
                inputType="tel"
                inputId="bh_sk_cmt"
                inputName="insured_indentity"
                inputTitle="CMT/Thẻ CC/Hộ chiếu"
                labelName="CMND/Hộ chiếu"
                required={true}
                productName={productName}
                inputValueFromProp={
                  dataRedux.find((elem: any) => elem.key === "user_indentity")
                    ?.value && userRelation == "Bản thân"
                    ? dataRedux.find(
                        (elem: any) => elem.key === "user_indentity"
                      )?.value
                    : ""
                }
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="tel"
                inputId="bh_sk_dienthoai_dd"
                inputName="insured_phone"
                inputTitle="điện thoại"
                labelName="Điện thoại"
                required={true}
                productName={productName}
                inputValueFromProp={
                  dataRedux.find((elem: any) => elem.key === "user_phone")
                    ?.value && userRelation == "Bản thân"
                    ? dataRedux.find((elem: any) => elem.key === "user_phone")
                        ?.value
                    : ""
                }
              />
            </Col>
          </Row>
          <TextInput
            inputType="email"
            inputId="bh_sk_email"
            inputName="insured_email"
            inputTitle="Email"
            labelName="Email"
            required={true}
            productName={productName}
            inputValueFromProp={
              dataRedux.find((elem: any) => elem.key === "user_email")?.value &&
              userRelation == "Bản thân"
                ? dataRedux.find((elem: any) => elem.key === "user_email")
                    ?.value
                : ""
            }
          />
          <Row>
            <Col xs="6">
              <TextInput
                inputType="tel"
                inputId="bh_sk_nth"
                inputName="insured_person"
                inputTitle="Tên người thụ hưởng"
                labelName="Tên người thụ hưởng"
                required={false}
                productName={productName}
              />
            </Col>
            <Col xs="6">
              <TextInput
                inputType="tel"
                inputId="frm_bhsk_cmt_ng_thu_hg"
                inputName="insured_person_id"
                inputTitle="CMT/MST/Thẻ căn cước"
                labelName="CMT/MST/Thẻ căn cước"
                required={false}
                productName={productName}
              />
            </Col>
          </Row>
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

export default FormInsuredPerson;
