export const getYearProduce = () => {
  let arr = [
    {
      key: "0",
      value: "--Chọn--",
    },
  ];
  for (var i = new Date().getFullYear(); i >= 1990; i--) {
    let obj = {
      key: i.toString(),
      value: i.toString(),
    };
    arr.push(obj);
  }
  return arr;
};
