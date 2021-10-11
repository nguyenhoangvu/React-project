import instance from "../adapter";

export const getListGroupCar = () => {
  return instance({
    url: "/api/CarInsurance/get-list-group-car",
    method: "get",
  });
};
