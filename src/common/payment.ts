import { API_URL } from "./common_variable";
import { getDataEpoint } from "../adapters/apis/motoAPIs";

export const payment = (dataRedux: any, totalFee: string) => {
  const queryParam = new URLSearchParams(window.location.search);
  const worker_site_id = queryParam.get("worker_site_id");
  const url = API_URL + "Epoint/push_data_epoint";
  totalFee = totalFee.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  console.log("vu fee: ", parseInt(totalFee));
  let param = {
    so_id: dataRedux.so_id,
    worker_site_id: worker_site_id,
  };
  let info = {
    worker_site_id: worker_site_id,
    name: dataRedux.userInfo.find((o: any) => o.key === "user_name")?.value,
    bill_code: dataRedux.so_id,
    tong_phi: totalFee,
    ship_price: 0,
  };

  //   getDataEpoint(url, param).then((res) => {
  //     console.log("vu res: ", res);
  //   });
  return;
};
