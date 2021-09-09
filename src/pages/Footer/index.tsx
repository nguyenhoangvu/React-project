import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div>
      Những thông tin trên chỉ mang tính chất giới thiệu chung. Để biết thêm
      thông tin chi tiết Quý khách vui lòng tham khảo thêm tại giao diện Mua
      hàng hoặc liên hệ Hotline{" "}
      <a href="tel:19001566" className="tel">
        19001566
      </a>
      để được tư vấn.
    </div>
  );
};

export default Footer;
