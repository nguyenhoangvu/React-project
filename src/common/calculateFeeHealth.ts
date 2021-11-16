import moment from "moment";

export const calculateTotalFeeHealth = (
  data: any,
  packageInsurance: string,
  userDoB: string
) => {
  let age = 0;
  let currentYear = moment().year();
  let currentMonth = moment().month() + 1;
  let currentDay = moment().date();
  let userDay = parseInt(userDoB.substring(0, 2));
  let userMonth = parseInt(userDoB.substring(3, 5));
  let userYear = parseInt(userDoB.substring(6, 10));

  age = currentYear - userYear;
  if (currentMonth > userMonth) age -= 1;
  else if (currentMonth == userMonth) {
    if (currentDay > userDay) age -= 1;
  }
  let packageFromData = data.find(
    (o: any) =>
      o.packageCode == packageInsurance && o.fromAge <= age && o.toAge >= age
  );

  return packageFromData;
};

export const additionalBenefit = (
  data: any,
  totalFee: number,
  additionalName: string,
  additionalChecked: string
) => {
  let check = data.extraInsuranceBenefit?.find(
    (o: any) => o.id == additionalName
  );
  if (check) {
    if (additionalChecked == "checked") {
      totalFee = totalFee + check.feeExtraInsuranceBenefit;
    } else if (additionalChecked == "uncheck" && totalFee > data.fee) {
      totalFee = totalFee - check.feeExtraInsuranceBenefit;
    }
  }
  return totalFee;
};
