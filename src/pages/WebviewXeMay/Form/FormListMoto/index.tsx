import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store/rootReducer";
import DirectButton from "../../../DirectButton";

type Props = {
  handleButtonClick: (clicked: string) => void;
  pageCallback: string;
};

const FormListMoto: React.FC<Props> = ({ handleButtonClick, pageCallback }) => {
  const [buttonClick, setButtonClick] = useState("");
  const dataRedux = useSelector((state: RootState) => state.reducer);

  const handleDisplayForm = (buttonClicked: string) => {
    setButtonClick(buttonClicked);
  };

  useEffect(() => {
    handleButtonClick ? handleButtonClick(buttonClick) : {};
  }, [buttonClick]);

  useEffect(() => {
    setButtonClick(pageCallback);
  }, [pageCallback]);

  const RenderTotalProducts = () => {
    let ListProducts = [];
    for (let i = 1; i <= dataRedux.total_product; i++) {
      let product_name = "product_" + i;
      let product = dataRedux.listProducts.filter(
        (o) => o.productName === product_name
      );
      let motoPlate = product.find((o) => o.key === "moto_plate");
      let fromDate = product.find((o) => o.key === "from_date_tnds");
      let fee = product.find((o) => o.key === "tong_phi_tnds");
      let obj = {
        motoPlate: motoPlate?.value,
        fromDate: fromDate?.value,
        fee: fee?.value,
        index: i,
      };
      ListProducts.push(obj);
    }

    const ContentMotos = ListProducts.map((obj: any) => (
      <div data-index={obj.index} key={obj.index}>
        {obj.motoPlate} , {obj.fromDate} , {obj.fee}
        <button>Sửa</button>
        <button>Xóa</button>
      </div>
    ));

    return <div>{ContentMotos}</div>;
  };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h5>Danh sách xe được bảo hiểm</h5>
          <RenderTotalProducts />
        </Col>
      </Row>
      <DirectButton
        handleButtonClick={handleDisplayForm}
        buttonCallback={buttonClick}
        isPay={false}
        isSummaryPage={false}
      />
    </Container>
  );
};

export default FormListMoto;
