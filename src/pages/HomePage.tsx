import React from "react";
import styled from "styled-components";
import data from "../json/home-page-json.json";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ContentPage = () => {
  const test = data.TNDS_xe_may.map((obj, i) => (
    <h3 key={i}>
      {obj.product_info}
      <p>{obj.product_info_content}</p>
      <ul>
        {obj.insurance_type}

        {/* <li>{obj.insurance_type_content}</li> */}
      </ul>
    </h3>
  ));
  console.log("vu content_page: ", data.TNDS_xe_may);

  return <div>{test}</div>;
};

const HomePage = () => {
  return (
    <div>
      <Image
        src="https://api.evbi.vn/images/moto_files/VBI-bao-hiem-mo-to.png"
        alt="Bảo hiểm TNDS mô tô xe máy"
      />
      <ContentPage />
    </div>
  );
};

export default HomePage;
