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
      // if (
      //   !input.key.includes("email") &&
      //   /[a-zA-Z\<\>\"\/\@]/.test(input.value)
      // ) {
      //   errorMsg = o.name + "Không được chứa kí tự đặc biệt";
      // }
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
