export const getYearProduce = () => {
  let arr = ["-- Chọn --"];
  for (var i = new Date().getFullYear(); i >= 1990; i--) {
    arr.push(i.toString());
  }
  return arr;
};
