import * as constants from "../types";

export interface INCREMENT {
  type: constants.INCREMENT;
}
export interface DECREMENT {
  type: constants.DECREMENT;
}
export interface ADDINSURANCEDATA {
  type: constants.INSURANCEDATA;
  data: Array<object>;
}
export interface ADDUSERINFO {
  type: constants.USERINFO;
  data: Object;
}

export const increaseCounter = (): INCREMENT => {
  return {
    type: constants.INCREASE,
  };
};

export const decreaseCounter = (): DECREMENT => {
  return {
    type: constants.DECREASE,
  };
};

export const addInsuranceData = (data: Array<object>): ADDINSURANCEDATA => {
  return {
    type: constants.ADDINSURANCEDATA,
    data,
  };
};

export const addUserInfo = (data: object): ADDUSERINFO => {
  console.log('vu here');
  
  return {
    type: constants.ADDUSERINFO,
    data,
  };
};

export type ActionTypes =
  | INCREMENT
  | DECREMENT
  | ADDINSURANCEDATA
  | ADDUSERINFO;
