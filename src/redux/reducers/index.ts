import {
  ADDPRODUCTINFORS,
  ADDUSERINFO,
  ADDPRODUCT,
  REMOVEPRODUCT,
} from "../types";
import { ActionTypes } from "../actions";
import data from "../../json/partner-info.json";

interface USERINFOR {
  key: string;
  value: string | number;
}

interface PRODUCTINFOR {
  key: string;
  value: string | number;
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
  userInfo: Array<USERINFOR>;
  listProducts: Array<PRODUCTINFOR>;
}

export const initialState: InitialStateType = {
  total_product: 1,
  ma_dv: data.ma_dvi,
  ma_nsd: data.ma_nsd,
  token: data.token,
  ma_nhom_doi_tac: data.ma_nhom_doi_tac,
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
      let test = cloneState.listProducts.findIndex(
        (o) =>
          o.key === action.payload.key &&
          o.productName === action.payload.productName
      );
      if (test >= 0) {
        cloneState.listProducts[test] = action.payload;
      } else cloneState.listProducts.push(action.payload);

      return cloneState;
    // return {
    //   ...state,
    //   listProducts: {
    //     ...state.listProducts,
    //     [productName]: [
    //       ...state.listProducts[action.index]?.product,
    //       action.payload,
    //     ],
    //   },
    // };
    default:
      return state;
  }
};

// https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

export default reducers;
