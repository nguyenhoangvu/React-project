import { ADDPRODUCTINFORS, ADDUSERINFO } from "../types";
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
  ma_dv: string;
  ma_nsd: string;
  token: string;
  ma_nhom_doi_tac: string;
  userInfo: Array<USERINFOR>;
  listProducts: Array<PRODUCTINFOR>;
}

export const initialState: InitialStateType = {
  ma_dv: data.ma_dvi,
  ma_nsd: data.ma_nsd,
  token: data.token,
  ma_nhom_doi_tac: data.ma_nhom_doi_tac,
  userInfo: [],
  listProducts: [],
};

const reducers = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ADDUSERINFO:
      return {
        ...state,
        userInfo: [...state.userInfo, action.payload],
      };
    case ADDPRODUCTINFORS:
      return {
        ...state,
        listProducts: [...state.listProducts, action.payload],
      };
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
