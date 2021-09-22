import * as constants from "../types";

interface USERINFOR {
  key: string;
  value: string | number;
}

interface PRODUCTINFORS {
  key: string;
  value: string;
  productName: string;
}

export interface ADDPRODUCTINFORS {
  type: constants.PRODUCTINFORS;
  payload: PRODUCTINFORS;
}

export interface ADDUSERINFO {
  type: constants.USERINFO;
  payload: USERINFOR;
}

export interface ADDPRODUCT {
  type: constants.PRODUCT;
  payload: number;
}

export interface REMOVEPRODUCT {
  type: constants.SUBTRACTPRODUCT;
  payload: number;
}

// export const addInsuranceData = (
//   payload: Array<PRODUCTINFORS>
// ): ADDPRODUCTINFORS => {
//   return {
//     type: constants.ADDPRODUCTINFORS,
//     payload,
//     productName
//   };
// };

// export const addUserInfo = (payload: USERINFOR): ADDUSERINFO => {
//   return {
//     type: constants.ADDUSERINFO,
//     payload,
//   };
// };

export type ActionTypes =
  | ADDPRODUCTINFORS
  | ADDUSERINFO
  | ADDPRODUCT
  | REMOVEPRODUCT;
