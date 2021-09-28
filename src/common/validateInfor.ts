export const validate = (listInputName: any, listObjectInput: any) => {
  let errorMsg = "";
  listInputName.forEach((o: any) => {
    let input = listObjectInput.find((i: any) => i.key === o.key);
    if (input === undefined || input.value === "")
      errorMsg = "Bạn chưa nhập " + o.name;
    return errorMsg;
  });
  return errorMsg;
};
