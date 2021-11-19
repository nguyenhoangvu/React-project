import { formatFee } from "../../common/formatFee";

export const totalContractFee = (listFee: any) => {
  let totalFee = 0;
  let obj = {
    key: "total_fee_tnds",
    value: "",
    productName: "all",
  };
  listFee.forEach((o: any) => {
    if (o.value !== undefined && o.value != "") {
      totalFee += parseInt(o.value);
    }
  });
  let fee = formatFee(totalFee.toString());
  obj.value = fee;
  return obj;
};

export const totalFeeCar = (fee: string, expiredTime: string) => {
  let totalFee = 0;
  totalFee = parseInt(fee) * parseInt(expiredTime);
  let obj = {
    key: "phi_total_tnds",
    value: formatFee(totalFee.toString()),
    productName: "all",
  };
  return obj;
};
