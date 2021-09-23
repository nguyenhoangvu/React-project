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
  obj.value = totalFee.toString();
  return obj;
};
