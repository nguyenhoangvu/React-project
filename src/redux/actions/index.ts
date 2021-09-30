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

interface INPUTMUSTVALIDATE {
  key: string;
  name: string;
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
}

export interface REMOVEPRODUCT {
  type: constants.SUBTRACTPRODUCT;
  payload: number;
}

export interface MODIFYPRODUCT {
  type: constants.UPDATEPRODUCT;
  payload: number;
}

export interface ADDINPUTNAMEMUSTVALIDATE {
  type: constants.INPUTNAMEMUSTVALIDATE;
  payload: INPUTMUSTVALIDATE;
}

export interface MODIFYORDERID {
  type: constants.UPDATEORDERID;
  payload: number;
}

export type ActionTypes =
  | ADDPRODUCTINFORS
  | ADDUSERINFO
  | ADDPRODUCT
  | REMOVEPRODUCT
  | MODIFYPRODUCT
  | ADDINPUTNAMEMUSTVALIDATE
  | MODIFYORDERID;
