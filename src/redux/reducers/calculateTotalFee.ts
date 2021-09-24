import { formatFee } from "../../common/formatFee";

export const totalFeeMoto = (listFee: any) => {
  let totalFee = 0;
  let obj = {
    key: "total_fee_tnds",
    value: "",
    productName: "all",
  };
  listFee.forEach((o: any) => {
    if (o.value !== undefined) {
      totalFee += parseInt(o.value);
    }
  });
  let test = formatFee(totalFee.toString());
  obj.value = test;
  return obj;
};
