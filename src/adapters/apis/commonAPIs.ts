import instance from "../adapter";

export const generateSignature = (data: any) => {
  return instance({
    url: "/api/Utilities/generate-signature",
    method: "post",
    data: data,
  });
};
