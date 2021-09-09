import React from "react";
import styled from "styled-components";
import data from "../../json/home-page-json.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import HrLine from "../../components/HrLine";
import Footer from "../Footer";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ProductInfo = () => {
  const ProductInfo = data.TNDS_xe_may.map((obj, i) => (
    <div key={i}>
      <h3 key={i}>
        <FontAwesomeIcon icon={faCheck} />
        {obj.product_info}
      </h3>
      <p>{obj.product_info_content}</p>
      <div>
        <ul>
          {obj.insurance_type}

          {obj.insurance_type_content?.map((key, j) => (
            <li key={j}>{key.value}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {obj.insurance_services}
          {obj.insurance_services_content?.map((key, j) => (
            <li key={j}>{key.value}</li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return <div>{ProductInfo}</div>;
};

// const IndurantService = () => {
//   const IndurantService = data.TNDS_xe_may.map((obj, i) => (
//     <div key={i}>
//       <ul>
//         {obj.insurance_services}
//         {obj.insurance_services_content?.map((key, j) => (
//           <li key={j}>{key.value}</li>
//         ))}
//       </ul>
//       <p>{obj.footer}</p>
//     </div>
//   ));

//   return <div>{IndurantService}</div>;
// };

const HomePage = () => {
  return (
    <div>
      <Image
        src="https://api.evbi.vn/images/moto_files/VBI-bao-hiem-mo-to.png"
        alt="Bảo hiểm TNDS mô tô xe máy"
      />
      <ProductInfo />
      <Footer />
      <HrLine />

      {/* <IndurantService /> */}
    </div>
  );
};

export default HomePage;
