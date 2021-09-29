import axios from "axios";

// export const client = axios.create({
//   baseURL: "https://apitest1.evbi.vn/",
// });

export const sendMotoInfo = (
  productInfos: any,
  nsd: string,
  tokenn: string
) => {
  let url = "https://apitest1.evbi.vn/api/xe/moto_nhap";
  let token = nsd + "-" + tokenn;
  axios({
    method: "post",
    url: url,
    data: JSON.stringify(productInfos),
    timeout: 12000,
    headers: {
      Accept: "application/json",
      Authority: token,
    },
  });
};
