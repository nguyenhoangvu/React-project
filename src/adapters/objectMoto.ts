import { calculateEndTime } from "../common/calculateTimeEnd";
import { feeMoto } from "../common/dataFeeMoto";
import { typeMoto } from "../common/typeProduct";

export const motoInfo = (dataFromRedux: any) => {
  let GCN = [];

  let data = {
    dtac_key: "1234567890",
    so_id_dtac: "",
    so_id: dataFromRedux.so_id,
    TVV: "",
    nsd: dataFromRedux.ma_nsd,
    ten:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_name")?.value ||
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_name")
        ?.value,
    ma_cif: "123123123",
    dchi:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_diachi")?.value ||
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_address")
        ?.value,
    nv: dataFromRedux.nv,
    ngay_sinh: "",
    gioi_tinh: "",
    cmt: "",
    dien_thoai:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_phone")?.value ||
      "",
    d_thoai:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_phone")?.value ||
      "",
    email:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_email")?.value ||
      "",
    mst:
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_tax")
        ?.value || "",
    dai_dien:
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_represent")
        ?.value || "",
    cvu_dai_dien:
      dataFromRedux.userInfo.find(
        (o: any) => o.key === "enterprise_represent_role"
      )?.value || "",
    ngay_hl:
      dataFromRedux.listProducts.find((o: any) => o.key === "from_date_tnds")
        ?.value || "",
    ngay_kt: calculateEndTime(
      dataFromRedux.listProducts.find((o: any) => o.key === "from_date_tnds")
        ?.value,
      dataFromRedux.listProducts.find((o: any) => o.key === "expired_time_tnds")
        ?.value
    ),
    ctrinh: "",
    phan_khuc: "cn",
    nhom_kh: "thuong",
    trang_thai: "C",
    trang_thai_tt: "C",
    GCN: [{}],
  };

  let motoInfo = {
    so_id_dt: 0,
    ten: "",
    dchi: "",
    cmt: "",
    bien_xe: "",
    so_khung: "",
    so_may: "",
    nam_sx: "",
    hang_xe: "",
    hieu_xe: "",
    loai_xe: "", // dưới 50cc : 0; trên 50cc: 50; khác : 3B;
    ngay_hl: "",
    gio_hl: "",
    ngay_kt: "",
    noi_nhan_tnds: "",
    nguoi_huong_ten: "",
    nguoi_huong_dchi: "",
    nguoi_huong_mst: "",
    TTIN_PHI: [{}],
  };

  let total_product = dataFromRedux.total_product;

  for (let i = 1; i <= total_product; i++) {
    let id = Math.random();
    let productName = "product_" + i;
    let productInfo = dataFromRedux.listProducts.filter(
      (o: any) => o.productName === productName
    );
    console.log("vu productInfo: ", productInfo);

    if (productInfo !== undefined) {
      let thirdPerson = productInfo.find((o: any) => o.key === "nguoi_t3_tnds");
      let expired_time = productInfo.find(
        (o: any) => o.key === "expired_time_tnds"
      );
      let moto_volumn = productInfo.find((o: any) => o.key === "moto_volumn");
      let from_time_tnds = productInfo.find(
        (o: any) => o.key === "from_time_tnds"
      );
      let user_address = dataFromRedux.userInfo.find(
        (o: any) => o.key === "user_diachi"
      );
      let user_name = dataFromRedux.userInfo.find(
        (o: any) => o.key === "user_name"
      );
      let motoOwner_name = productInfo.find((o: any) => o.key === "cx_name");
      let motoOwner_address = productInfo.find(
        (o: any) => o.key === "cx_address"
      );
      let moto_from_date = productInfo.find(
        (o: any) => o.key === "from_date_tnds"
      );
      let recieve_address = productInfo.find(
        (o: any) => o.key === "gcn_recieve_address"
      );
      let moto_plate = productInfo.find((o: any) => o.key === "moto_plate");
      if (
        thirdPerson !== undefined &&
        expired_time !== undefined &&
        moto_volumn !== undefined &&
        user_address !== undefined &&
        motoOwner_name !== undefined &&
        motoOwner_address !== undefined &&
        moto_from_date !== undefined &&
        recieve_address !== undefined &&
        moto_plate !== undefined &&
        user_name !== undefined &&
        from_time_tnds !== undefined
      ) {
        let fee = feeMoto(
          thirdPerson.value === "checked",
          moto_volumn.value,
          expired_time.value,
          from_time_tnds
        );
        let moto_expired_date = calculateEndTime(
          moto_from_date.value,
          expired_time.value
        );
        motoInfo.so_id_dt = id;
        motoInfo.ten = user_name.value.toString();
        motoInfo.dchi = user_address.value.toString();
        motoInfo.gio_hl = from_time_tnds.value;
        motoInfo.loai_xe = typeMoto(moto_volumn.value);
        motoInfo.ngay_hl = moto_from_date.value;
        motoInfo.ngay_kt = moto_expired_date;
        motoInfo.nguoi_huong_dchi = motoOwner_address.value;
        motoInfo.nguoi_huong_ten = motoOwner_name.value;
        motoInfo.noi_nhan_tnds = recieve_address.value;
        motoInfo.bien_xe = moto_plate.value;
        motoInfo.TTIN_PHI = fee;
        GCN.push(motoInfo);
      }
    }
  }
  data.GCN = GCN;
  return data;
};
