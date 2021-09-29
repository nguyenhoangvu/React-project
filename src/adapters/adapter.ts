import axios from "axios";
import { API_URL } from "../common/common_variable";

// let test = Math.random()

export const sendMotoInfo = (
  productInfos: any,
  nsd: string,
  tokenn: string
) => {
  let url = API_URL + "api/xe/moto_nhap";
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
  return;
};
