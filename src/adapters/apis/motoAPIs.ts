import instance from "../adapter";

export const createMotoContract = (data: any) => {
  return instance({
    url: "/api/MotoInsurance/create-moto-contract",
    method: "post",
    data: data,
  });
};
