export const objCalculateFee = (dataRedux: any, typeInsu: string) => {
  let data = {
    typeCarInsured: typeInsu,
    intendedUse: "",
    groupCar: "",
    numberOfSeat: 0,
    payload: 0,
    yearProduce: 0,
    feeRatePartner: 0,
    additionBenefit: "",
    insuranceTerm: 0,
    diductable: 0,
    insuranceAmout: 0,
  };

  let intended = dataRedux.listProducts.find(
    (o: any) => o.key === "oto_intendedUse"
  );
  let group = dataRedux.listProducts.find((o: any) => o.key === "oto_type");
  let seats = dataRedux.listProducts.find((o: any) => o.key === "oto_seats");
  let payload = dataRedux.listProducts.find(
    (o: any) => o.key === "oto_payload"
  );
  let yearProduce = dataRedux.listProducts.find(
    (o: any) => o.key === "oto_yearProduce"
  );
  let insuranceTerm = dataRedux.listProducts.find(
    (o: any) => o.key === "expired_time_tnds"
  );

  if (intended && group && seats && payload && yearProduce && insuranceTerm) {
    data.intendedUse = intended.value;
    data.groupCar = group.value;
    data.numberOfSeat = seats.value;
    data.payload = payload.value;
    data.yearProduce = yearProduce.value;
    data.insuranceTerm = insuranceTerm.value;
  }
  return data;
};

export const carInfo = (dataRedux: any) => {};
