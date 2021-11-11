import moto from "../images/VBI-bao-hiem-mo-to.png";
import oto from "../images/VBI-bao-hiem-o-to.png";
import health from "../images/VBI-Bao-hiem-suc-khoe.png";

const images = [
  {
    id: "1",
    nv: "XC.1.1",
    src: moto,
    title: "moto",
    description: "Logo TNDS xe máy",
  },
  {
    id: "2",
    nv: "XC.2.1",
    src: oto,
    title: "oto",
    description: "Logo TNDS ô tô",
  },
  {
    id: "3",
    nv: "CN.6",
    src: health,
    title: "suc khoe",
    description: "Logo bảo hiểm sức khỏe",
  },
];

// {
//   logo: {
//     moto: require(`../images/VBI-bao-hiem-mo-to.png`),
//     car: require("../images/VBI-bao-hiem-o-to.png"),
//   },
// };

export default images;
