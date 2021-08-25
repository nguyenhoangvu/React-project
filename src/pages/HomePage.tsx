import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const HomePage = () => {
  return (
    <div>
      <Image
        src="https://api.evbi.vn/images/moto_files/VBI-bao-hiem-mo-to.png"
        alt="Bảo hiểm TNDS mô tô xe máy"
      />
    </div>
  );
};

export default HomePage;
