import instance from "../adapter";

export const getListAdditionalBenefit = (serviceCode: string) => {
  return instance({
    url:
      "/api/PersonalInsurance/get-list-additional-benefit?serviceCode=" +
      serviceCode,
    method: "get",
  });
};

export const calculateFeeHealth = (serviceCode: string) => {
  return instance({
    url:
      "/api/PersonalInsurance/calculate-fee-health?serviceCode=" + serviceCode,
    method: "get",
  });
};

export const createPersonContract = (data: any) => {
  return instance({
    url: "/api/PersonalInsurance/create-person-contract",
    method: "post",
    data: data,
  });
};
