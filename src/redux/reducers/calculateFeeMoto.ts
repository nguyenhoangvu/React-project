export const calculateFeeMoto = (
  motoVolumn: any,
  expiredTime: any,
  nguoiT3: any,
  productName: string
) => {
  let motoFee = 0;
  let fee = 0;
  let obj = {
    key: "",
    value: "",
    productName: "",
  };
  if (motoVolumn !== undefined) {
    switch (motoVolumn.value) {
      case "1":
        motoFee = 55000;
        break;
      case "2":
        motoFee = 60000;
        break;
      case "3":
        motoFee = 290000;
        break;
    }

    if (expiredTime?.value !== undefined) {
      if (nguoiT3?.value === "checked")
        fee = (motoFee * 1.1 + 20000) * parseInt(expiredTime.value);
      else fee = motoFee * 1.1 * parseInt(expiredTime.value);
    }
    obj = {
      key: "phi_bh_tnds",
      value: fee.toString(),
      productName: productName,
    };
  }
  return obj;
};
