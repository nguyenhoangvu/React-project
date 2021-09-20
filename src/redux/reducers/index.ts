import { INCREASE, DECREASE, ADDINSURANCEDATA, ADDUSERINFO } from "../types";
import { ActionTypes } from "../actions";
import data from "../../json/partner-info.json";

export const initialState = {
  count: 0,
  ma_dv: data.ma_dvi,
  ma_nsd: data.ma_nsd,
  token: data.token,
  ma_nhom_doi_tac: data.ma_nhom_doi_tac,
  listProducts: {
    userInfo: {},
    products: [],
  },
};

const reducers = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREASE:
      return {
        ...state,
        count: state.count - 1,
      };

    case ADDUSERINFO:
      return {
        ...state,
        userInfo: { ...state.listProducts.userInfo, ...action.data },
      };
    default:
      return state;
  }
};

// https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

export default reducers;
