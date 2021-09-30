export const motoType = (motoType: string) => {
  switch (motoType) {
    case "1":
      return "0";
    case "2":
      return "50";
    default:
      return "3B";
  }
};
