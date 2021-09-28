export const calculateEndTime = (dateString: any, numberYear: any) => {
  numberYear = parseInt(numberYear);
  var dateParts = dateString.split("/");
  var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  var year = dateObject.getFullYear() + numberYear;
  var month = dateObject.getMonth() + 1;
  var day = dateObject.getDate();
  var output =
    (("" + day).length < 2 ? "0" : "") +
    day +
    "/" +
    (("" + month).length < 2 ? "0" : "") +
    month +
    "/" +
    year;
  return output;
};
