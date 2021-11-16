import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  btnContent: string;
};

const Button = styled.div`
  width: 100%;
  font-size: 1rem;
  text-decoration: none;
  color: #fff;
  background-color: #005790;
  border-radius: 30px;
  text-align: center;
  padding: 10px 0;
  margin-top: 20px;
`;

const NavigateButton: React.FC<Props> = ({ btnContent }) => {
  let navigate = useNavigate();
  // "https://portal.evbi.vn/TaiLieu/vbi_quyen_loi_bao_hiem_suc_khoe_vbicare.pdf"
  return (
    <Button
      onClick={() =>
        (window.location.href =
          "https://portal.evbi.vn/TaiLieu/vbi_quyen_loi_bao_hiem_suc_khoe_vbicare.pdf")
      }
    >
      {btnContent}
    </Button>
  );
};

export default NavigateButton;
