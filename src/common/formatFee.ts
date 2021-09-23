export const formatFee = (fee: string) => {
  return new Intl.NumberFormat().format(parseInt(fee));
};
