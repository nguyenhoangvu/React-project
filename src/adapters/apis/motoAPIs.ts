import instance from "../adapter";

export const createMotoContract = (data: any) => {
  return instance({
    url: "/api/MotoInsurance/create-moto-contract",
    method: "post",
    data: data,
  });
};

export const getDataEpoint = (url: string, params: any) => {
  return instance({
    url: url,
    method: "get",
    params: params,
  });
};
