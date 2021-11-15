import moment from "moment";

export const calculateTotalFeeHealth = (
  data: any,
  packageInsurance: string,
  userDoB: string
) => {
  let formatDate = moment(userDoB, "DD/MM/YYYY").format("YYYY-MM-DD");
  let age = moment().diff(formatDate, "years", false);

  let packageFromData = data.find(
    (o: any) =>
      o.packageCode == packageInsurance && o.fromAge <= age && o.toAge >= age
  );

  return packageFromData;
};
