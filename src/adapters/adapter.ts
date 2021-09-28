import { useSelector } from "react-redux";
import { RootState } from "../redux/store/rootReducer";
import { calculateEndTime } from "../common/calculateTimeEnd";
import { feeMoto } from "../common/dataFeeMoto";
import axios from "axios";

// let test = Math.random()

let dataFromRedux = useSelector((state: RootState) => state.reducer);

// let data = {
//   dtac_key: "1234567890",
//   so_id_dtac: "",
//   so_id: "",
//   TVV: "",
//   nsd: "",
//   ten: "",
//   ma_cif: "123123123",
//   dchi: "",
//   nv: dataFromRedux.nv,
//   ngay_sinh: "",
//   gioi_tinh: "",
//   cmt: "",
//   dien_thoai: "",
//   d_thoai: "",
//   email: "",
//   mst: "",
//   dai_dien: "",
//   cvu_dai_dien: "",
//   ngay_hl: "",
//   ngay_kt: "",
//   ctrinh: "",
//   phan_khuc: "cn",
//   nhom_kh: "thuong",
//   trang_thai: "C",
//   trang_thai_tt: "C",
//   GCN: [],
// };

//   if (check_nguoi_ngoi_tren_xe) {
//     ttin_phi = [
//       {
//         gcn_s: "",
//         loai: "BN", //BN: bảo hiểm tnds, TL: người ngồi trên xe
//         tien: "",
//         tl_phi: 1,
//         phi: phi_thuan_xe_may * parseInt(thoi_han),
//         thue: parseInt(phi_thuan_xe_may * 0.1) * parseInt(thoi_han),
//       },
//       {
//         gcn_s: "",
//         loai: "TL", //BN: bảo hiểm tnds, TL: người ngồi trên xe
//         tien: "",
//         tl_phi: 1,
//         phi: 20000 * parseInt(thoi_han),
//         thue: 0,
//       },
//     ];
//   } else {
//     ttin_phi = [
//       {
//         gcn_s: "",
//         loai: "BN", //BN: bảo hiểm tnds, TL: người ngồi trên xe
//         tien: "",
//         tl_phi: 1,
//         phi: item.PHI,
//         thue: item.THUE,
//       },
//     ];
//   }

export const sendMotoInfo = () => {
  let GCN = [];
  let motoInfo = {
    so_id_dt: "",
    ten: "",
    dchi: "",
    cmt: "",
    bien_xe: "",
    so_khung: "",
    so_may: "",
    nam_sx: "",
    hang_xe: "",
    hieu_xe: "",
    loai_xe: 0, // dưới 50cc : 0; trên 50cc: 50; khác : 3B;
    ngay_hl: "",
    gio_hl: "",
    ngay_kt: "",
    noi_nhan_tnds: "",
    nguoi_huong_ten: "",
    nguoi_huong_dchi: "",
    nguoi_huong_mst: "",
    TTIN_PHI: [],
  };

  let total_product = dataFromRedux.total_product;
  for (let i = 1; i <= total_product; i++) {
    let productName = "product_" + i;
    let productInfo = dataFromRedux.listProducts.filter(
      (o) => o.productName === productName
    );
    if (productInfo !== undefined) {
      let thirdPerson = productInfo.find(
        (o) => o.key === "nguoi_t3_tnds" && o.productName === productName
      );

      if (thirdPerson !== undefined) {
        let fee = feeMoto(thirdPerson.value === "checked");
      }
    }
  }
};
