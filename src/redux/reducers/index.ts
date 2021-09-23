import {
  ADDPRODUCTINFORS,
  ADDUSERINFO,
  ADDPRODUCT,
  REMOVEPRODUCT,
} from "../types";
import { ActionTypes } from "../actions";
import data from "../../json/partner-info.json";
import { calculateFeeMoto } from "./calculateFeeMoto";
import { totalFeeMoto } from "./calculateTotalFee";

interface USERINFOR {
  key: string;
  value: string | number;
}

interface PRODUCTINFOR {
  key: string;
  value: string;
  productName: string;
}

// interface LISTPRODUCTS {
//   product: Array<PRODUCTINFOR>;
// }

interface InitialStateType {
  total_product: number;
  ma_dv: string;
  ma_nsd: string;
  token: string;
  ma_nhom_doi_tac: string;
  nv: string;
  userInfo: Array<USERINFOR>;
  listProducts: Array<PRODUCTINFOR>;
}

export const initialState: InitialStateType = {
  total_product: 1,
  ma_dv: data.ma_dvi,
  ma_nsd: data.ma_nsd,
  token: data.token,
  ma_nhom_doi_tac: data.ma_nhom_doi_tac,
  nv: data.nv,
  userInfo: [],
  listProducts: [],
};

const reducers = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ADDPRODUCT:
      return {
        ...state,
        total_product: state.total_product + 1,
      };
    case REMOVEPRODUCT:
      const newState = { ...state };
      let product_name = "product_" + action.payload;
      newState.total_product -= 1;
      newState.listProducts = newState.listProducts.filter(
        (item) => item.productName !== product_name
      );
      return newState;
    case ADDUSERINFO:
      return {
        ...state,
        userInfo: [...state.userInfo, action.payload],
      };
    case ADDPRODUCTINFORS:
      const cloneState = { ...state };
      let index = cloneState.listProducts.findIndex(
        (o) =>
          o.key === action.payload.key &&
          o.productName === action.payload.productName
      );
      if (index >= 0) {
        cloneState.listProducts[index] = action.payload;
      } else cloneState.listProducts.push(action.payload);

      if (state.nv === "XE") {
        let motoVolumn = cloneState.listProducts.find(
          (o) =>
            o.key === "moto_volumn" &&
            o.productName === action.payload.productName
        );
        let expiredTime = cloneState.listProducts.find(
          (o) =>
            o.key === "expired_time_tnds" &&
            o.productName === action.payload.productName
        );
        let nguoiT3 = cloneState.listProducts.find(
          (o) =>
            o.key === "nguoi_t3_tnds" &&
            o.productName === action.payload.productName
        );
        let phi_bh = calculateFeeMoto(
          motoVolumn,
          expiredTime,
          nguoiT3,
          action.payload.productName
        );
        if (phi_bh.key !== "") {
          let index = cloneState.listProducts.findIndex(
            (o) =>
              o.key === "phi_bh_tnds" &&
              o.productName === action.payload.productName
          );
          if (index >= 0) {
            cloneState.listProducts[index] = phi_bh;
          } else cloneState.listProducts.push(phi_bh);
        }
        let listFee = cloneState.listProducts.filter(
          (o) => o.key === "phi_bh_tnds"
        );
        let totalFee = totalFeeMoto(listFee);
        if (totalFee.key !== "" && totalFee.key !== undefined) {
          let index = cloneState.listProducts.findIndex(
            (o) => o.key === "total_fee_tnds"
          );
          if (index >= 0) {
            cloneState.listProducts[index] = totalFee;
          } else cloneState.listProducts.push(totalFee);
        }
      }

      return cloneState;
    default:
      return state;
  }
};

// https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

export default reducers;
