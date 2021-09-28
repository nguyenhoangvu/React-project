import { useSelector } from "react-redux";
import { RootState } from "../redux/store/rootReducer";

export const feeMoto = (thirdPerson: boolean) => {
  let dataFromRedux = useSelector(
    (state: RootState) => state.reducer.listProducts
  );

  let data = [];
  if (thirdPerson === true) {
    data = [
      {
        gcn_s: "",
        loai: "BN", //BN: bảo hiểm tnds, TL: người ngồi trên xe
        tien: "",
        tl_phi: 1,
        phi: 0,
        thue: 0,
        gio_hl: "",
      },
      {
        gcn_s: "",
        loai: "TL", //BN: bảo hiểm tnds, TL: người ngồi trên xe
        tien: "",
        tl_phi: 1,
        phi: 0,
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
        phi: 0,
        thue: 0,
        gio_hl: "",
      },
    ];
  }
  return data;
};
