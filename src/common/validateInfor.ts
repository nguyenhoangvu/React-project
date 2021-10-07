import moment from "moment";

export const validate = (
  listInputName: any,
  listObjectInput: any,
  productName?: string
) => {
  let errorMsg = "";
  let timeNow = moment().format("HH:mm");
  let today = moment().format("DD/MM/YYYY");
  let timeFromRedux = "";
  let dateFromRedux = "";
  const regexCheckSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const regexCheckPhone = /(0)+([0-9]{9})\b/;
  listInputName.forEach((o: any) => {
    let input = {
      key: "",
      value: "",
      productName: "",
    };
    if (productName !== undefined) {
      input = listObjectInput.find(
        (i: any) => i.key === o.key && i.productName === productName
      );
    } else {
      input = listObjectInput.find((i: any) => i.key === o.key);
    }
    if (input === undefined || input.value === "")
      errorMsg = "Bạn chưa nhập " + o.name;
    else {
      if (input.key.includes("from_time")) timeFromRedux = input.value;
      if (input.key.includes("from_date")) dateFromRedux = input.value;
      if (
        !input.key.includes("email") &&
        regexCheckSpecialChar.test(input.value) &&
        input.key !== "moto_plate" &&
        !input.key.includes("phone") &&
        !input.key.includes("time") &&
        !input.key.includes("date")
      ) {
        errorMsg = o.name + " không được chứa kí tự đặc biệt";
      }
      if (input.key.includes("phone") && !regexCheckPhone.test(input.value)) {
        errorMsg = "Nhập đúng định dạng số điện thoại";
      }
    }
    return errorMsg;
  });
  if (today.localeCompare(dateFromRedux) === 0) {
    let hh = parseInt(timeFromRedux.substr(0, 2));
    let hhNow = parseInt(timeNow.substr(0, 2));
    if (hhNow === hh) {
      let mm = parseInt(timeFromRedux.substr(3, 5));
      let mmNow = parseInt(timeNow.substr(3, 5));
      if (mmNow > mm)
        errorMsg = "Ngày giờ hiệu lực không được trước ngày giờ thanh toán";
    } else if (hhNow > hh)
      errorMsg = "Ngày giờ hiệu lực không được trước ngày giờ thanh toán";
  }
  return errorMsg;
};
