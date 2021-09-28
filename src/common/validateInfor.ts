export const validate = (listInputName: any, listObjectInput: any) => {
  let errorMsg = "";
  listInputName.forEach((o: any) => {
    let value = listObjectInput.find((i: any) => i.key === o.key);
    if (value === undefined) errorMsg = "Bạn chưa nhập " + o.name;
    return errorMsg;
  });
  return errorMsg;
};
