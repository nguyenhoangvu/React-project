export const feeMoto = (
  thirdPerson: boolean,
  volumn: string,
  expiredTime: string
) => {
  let data = [];
  let initialFee = 0;
  if (volumn === "1") {
    initialFee = 55000;
  } else if (volumn === "2") {
    initialFee = 60000;
  } else if (volumn === "3") {
    initialFee = 290000;
  }
  if (thirdPerson === true) {
    data = [
      {
        gcn_s: "",
        loai: "BN", //BN: bảo hiểm tnds, TL: người ngồi trên xe
        tien: "",
        tl_phi: 1,
        phi: initialFee * parseInt(expiredTime),
        thue: initialFee * 0.1 * parseInt(expiredTime),
        gio_hl: expiredTime,
      },
      {
        gcn_s: "",
        loai: "TL", //BN: bảo hiểm tnds, TL: người ngồi trên xe
        tien: "",
        tl_phi: 1,
        phi: 20000 * parseInt(expiredTime),
        thue: 0,
        gio_hl: "",
      },
    ];
  } else {
    data = [
      {
        gcn_s: "",
        loai: "BN", //BN: bảo hiểm tnds, TL: người ngồi trên xe
        tien: "",
        tl_phi: 1,
        phi: initialFee * parseInt(expiredTime),
        thue: initialFee * 0.1 * parseInt(expiredTime),
        gio_hl: "",
      },
    ];
  }
  return data;
};
