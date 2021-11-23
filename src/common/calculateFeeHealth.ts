import moment from "moment";

export const getInsurancePackagePaired = (
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

export const additionalBenefit = (data: any, listAddtional: any) => {
  let totalFee = data.fee;
  listAddtional.forEach((elem: any) => {
    if (elem && elem.value == "checked") {
      let check = data.extraInsuranceBenefit?.find(
        (o: any) => o.id == elem.key.substring(8, 10)
      );
      if (check) {
        totalFee += check.feeExtraInsuranceBenefit;
      }
    }
  });

  return totalFee;
};
