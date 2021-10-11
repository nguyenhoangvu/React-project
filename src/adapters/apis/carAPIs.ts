import instance from "../adapter";

export const getListGroupCar = () => {
  return instance({
    url: "/api/CarInsurance/get-list-group-car",
    method: "get",
  });
};

export const calculateFeeCar = (data: any) => {
  return instance({
    url: "/api/CarInsurance/calculate-fee-car",
    method: "post",
    data: data,
  });
};

export const createCarContract = (data: any) => {
  return instance({
    url: "/api/CarInsurance/create-car-contract",
    method: "post",
    data: data,
  });
};
