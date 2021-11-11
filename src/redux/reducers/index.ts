import {
  ADDPRODUCTINFORS,
  ADDUSERINFO,
  ADDPRODUCT,
  REMOVEPRODUCT,
  MODIFYPRODUCT,
  ADDINPUTNAMEMUSTVALIDATE,
  MODIFYORDERID,
  ADDCATEGORY,
} from "../types";
import { ActionTypes } from "../actions";
import data from "../../json/partner-info.json";
import { calculateFeeMoto } from "./calculateFeeMoto";
import { totalFeeMoto, totalFeeCar } from "./calculateTotalFee";

interface USERINFOR {
  key: string;
  value: string | number;
}

interface PRODUCTINFOR {
  key: string;
  value: string;
  productName: string;
}

interface INPUTMUSTVALIDATE {
  key: string;
  name: string;
}

interface InitialStateType {
  so_id: number;
  total_product: number;
  modify_product: number;
  ma_dv: string;
  ma_nsd: string;
  token: string;
  ma_nhom_doi_tac: string;
  nv: string;
  userInfo: Array<USERINFOR>;
  listProducts: Array<PRODUCTINFOR>;
  listInputMustValidate: Array<INPUTMUSTVALIDATE>;
}

export const initialState: InitialStateType = {
  so_id: 0,
  total_product: 1,
  modify_product: 0,
  ma_dv: data.ma_dvi,
  ma_nsd: data.ma_nsd,
  token: data.token,
  ma_nhom_doi_tac: data.ma_nhom_doi_tac,
  nv: "",
  userInfo: [],
  listProducts: [],
  listInputMustValidate: [],
};

const reducers = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ADDCATEGORY:
      const categoryState = { ...state };
      categoryState.nv = action.payload;
      categoryState.userInfo = [];
      categoryState.listProducts = [];
      categoryState.listInputMustValidate = [];
      return categoryState;
    case MODIFYORDERID:
      return {
        ...state,
        so_id: action.payload,
      };
    case ADDPRODUCT:
      return {
        ...state,
        total_product: state.total_product + 1,
      };
    case MODIFYPRODUCT:
      return {
        ...state,
        modify_product: action.payload,
      };
    case ADDINPUTNAMEMUSTVALIDATE:
      return {
        ...state,
        listInputMustValidate: [...state.listInputMustValidate, action.payload],
      };
    case REMOVEPRODUCT:
      const newState = { ...state };
      let product_name = "product_" + action.payload;
      newState.listProducts = newState.listProducts.filter(
        (item) => item.productName !== product_name
      );
      for (let i = action.payload + 1; i <= newState.total_product; i++) {
        newState.listProducts.map((o) => {
          if (o.productName === "product_" + i) {
            o.productName = "product_" + (i - 1);
          }
        });
      }
      let listFee = newState.listProducts.filter(
        (o) => o.key === "phi_bh_tnds"
      );
      let totalFee = totalFeeMoto(listFee);
      let i = newState.listProducts.findIndex(
        (o) => o.key === "total_fee_tnds"
      );
      if (i >= 0) {
        newState.listProducts[i] = totalFee;
      }
      newState.total_product -= 1;
      return newState;
    case ADDUSERINFO:
      const userInfoState = { ...state };
      let nhom_kh = userInfoState.userInfo.find((o) => o.key === "nhom_kh");
      if (nhom_kh?.value === "CN") {
        userInfoState.userInfo = userInfoState.userInfo.filter(
          (item) => item.key === "nhom_kh" || item.key.startsWith("user")
        );
      } else if (nhom_kh?.value === "DN") {
        userInfoState.userInfo = userInfoState.userInfo.filter(
          (item) => item.key.startsWith("enterprise") || item.key === "nhom_kh"
        );
        userInfoState.listProducts = userInfoState.listProducts.filter(
          (item) => !item.key.startsWith("cx")
        );
      }
      let infoIndex = userInfoState.userInfo.findIndex(
        (o) => o.key === action.payload.key
      );
      if (infoIndex >= 0) {
        userInfoState.userInfo[infoIndex] = action.payload;
      } else userInfoState.userInfo.push(action.payload);
      return userInfoState;
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

      if (state.nv === "XC.1.1") {
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
      } else if (state.nv === "XC.2.1") {
        let feeTNDS = cloneState.listProducts.find(
          (o) =>
            o.key === "phi_bh_tnds" &&
            o.productName === action.payload.productName
        );
        let expiredTime = cloneState.listProducts.find(
          (o) =>
            o.key === "expired_time_tnds" &&
            o.productName === action.payload.productName
        );
        if (feeTNDS && expiredTime) {
          let totalFee = totalFeeCar(feeTNDS.value, expiredTime.value);
          let index = cloneState.listProducts.findIndex(
            (o) => o.key === "phi_total_tnds"
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

export default reducers;
