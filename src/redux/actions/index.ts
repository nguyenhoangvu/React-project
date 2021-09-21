import * as constants from "../types";

interface USERINFOR {
  key: string;
  value: string | number;
}

export interface ADDINSURANCEDATA {
  type: constants.INSURANCEDATA;
  payload: Array<object>;
}
export interface ADDUSERINFO {
  type: constants.USERINFO;
  payload: USERINFOR;
}

export const addInsuranceData = (payload: Array<object>): ADDINSURANCEDATA => {
  return {
    type: constants.ADDINSURANCEDATA,
    payload,
  };
};

export const addUserInfo = (payload: USERINFOR): ADDUSERINFO => {
  return {
    type: constants.ADDUSERINFO,
    payload,
  };
};

export type ActionTypes = ADDINSURANCEDATA | ADDUSERINFO;
