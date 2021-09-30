import { motoType } from "../common/typeProduct";

export const motoInfo = (dataFromRedux: any) => {
  let motoInsured = [];
  let total_product = dataFromRedux.total_product;

  let data = {
    contractId: dataFromRedux.so_id, // Số id đơn VBI, mặc định truyền 0
    partnerContractId: "ABC", // Số id đơn của hệ thống đối tác (bắt buộc)
    customerName:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_name")?.value ||
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_name")
        ?.value, // Tên người mua  (bắt buộc)
    customerAddress:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_diachi")?.value ||
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_address")
        ?.value, // Địa chỉ người mua (bắt buộc)
    customerDob: "31/10/1995", // Ngày sinh người mua (định dạng dd/MM/yyyy)
    customerGender: "NAM", // Giới tính người mua (NAM / NU)
    customerIdentifyCard: "", // Số CMT người mua
    customerPhone:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_phone")?.value ||
      dataFromRedux.userInfo.find(
        (o: any) => o.key === "enterprise_represent_phone"
      )?.value, // Số điện thoại người mua (bắt buộc)
    customerEmail:
      dataFromRedux.userInfo.find((o: any) => o.key === "user_email")?.value ||
      "abc@gmail.com", // Email người mua (bắt buộc)
    customerTaxCode:
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_tax")
        ?.value || "", // Mã số thuế người mua
    represent:
      dataFromRedux.userInfo.find((o: any) => o.key === "enterprise_represent")
        ?.value || "", // Đại diện tổ chức (đối với khách hàng doanh nghiệp)
    representPosition:
      dataFromRedux.userInfo.find(
        (o: any) => o.key === "enterprise_represent_role"
      )?.value || "", // Chức vụ đại diện
    promotion: "", // Mã chương trình khuyến mãi (phục vụ theo chiến dịch cụ thể)
    customerType: dataFromRedux.userInfo.find((o: any) => o.key === "nhom_kh")
      ?.value, // Loại khách hàng (CN : cá nhân, DN: Doanh nghiệp)
    agent: "", // Mã đại lý
    agencyId: "", // Mã tư vấn viên
    signature: "",
    motoInsured: [{}],
  };

  for (let i = 1; i <= total_product; i++) {
    let motoInfo = {
      ownerName: "", // Tên chủ xe (bắt buộc)
      ownerEmail: "", // Email chủ xe (bắt buộc)
      ownerPhone: "", // Số điện thoại chủ xe (bắt buộc)
      ownerAddress: "", // Địa chỉ chủ xe
      ownerIdentifyCard: "", // CMT chủ xe
      receiveAddress: "", // Địa chỉ nhận ấn chỉ
      numberPlate: "", // Biển số xe ( bắt buộc )
      chassisNumber: "", // Số khung
      engineNumber: "", // Số máy
      brand: "", // Hiệu xe
      model: "", // Hãng xe
      typeMoto: "", // Loại xe ("50" : trên 50cc; "0" : dưới 50cc, "D" : xe điện, "3b" : Xe 3 bánh) (bắt buộc)
      startHour: "", // Giờ hiệu lực (định dạng HH:mm) ( bắt buộc )
      startDate: "", // Ngày hiệu lực (định dạng dd/MM/yyyy) ( bắt buộc )
      yearProduce: 10000, // Năm sản xuất
      motoValue: 0, // Giá trị xe (chỉ bắt buộc khi có mua vật chất xe)
      insuranceTerm: 0, // Thời hạn bảo hiểm (từ 1 đến 3 năm)
      typeMotoInsured: [
        {
          typeInsured: "BN",
        },
      ],
    };
    let product_name = "product_" + i;
    let moto = dataFromRedux.listProducts.filter(
      (o: any) => o.productName === product_name
    );
    let ownerName = moto.find(
      (o: any) => o.key === "cx_name" && o.productName === product_name
    );
    let ownerEmail = moto.find(
      (o: any) => o.key === "cx_email" && o.productName === product_name
    );
    let ownerAddress = moto.find(
      (o: any) => o.key === "cx_address" && o.productName === product_name
    );
    let ownerPhone = moto.find(
      (o: any) => o.key === "cx_phone" && o.productName === product_name
    );
    let numberPlate = moto.find(
      (o: any) => o.key === "moto_plate" && o.productName === product_name
    );
    let typeMoto = moto.find(
      (o: any) => o.key === "moto_volumn" && o.productName === product_name
    );
    let startHour = moto.find(
      (o: any) => o.key === "from_time_tnds" && o.productName === product_name
    );
    let startDate = moto.find(
      (o: any) => o.key === "from_date_tnds" && o.productName === product_name
    );
    let insuranceTerm = moto.find(
      (o: any) =>
        o.key === "expired_time_tnds" && o.productName === product_name
    );
    let thirdPerson = moto.find(
      (o: any) => o.key === "nguoi_t3_tnds" && o.productName === product_name
    );
    let receiveAddress = moto.find(
      (o: any) =>
        o.key === "gcn_recieve_address" && o.productName === product_name
    );
    if (
      ownerName &&
      ownerAddress &&
      ownerPhone &&
      numberPlate &&
      typeMoto &&
      startHour &&
      startDate &&
      insuranceTerm &&
      thirdPerson &&
      receiveAddress
    ) {
      motoInfo.ownerName = ownerName.value;
      motoInfo.ownerAddress = ownerAddress.value;
      motoInfo.ownerEmail = ownerEmail?.value
        ? ownerEmail?.value
        : "abc@gmail.com";
      motoInfo.ownerPhone = ownerPhone.value;
      motoInfo.numberPlate = numberPlate.value;
      motoInfo.typeMoto = motoType(typeMoto.value);
      motoInfo.startHour = startHour.value;
      motoInfo.startDate = startDate.value;
      motoInfo.insuranceTerm = parseInt(insuranceTerm.value);
      motoInfo.receiveAddress = receiveAddress.value;
      if (thirdPerson.value === "checked") {
        motoInfo.typeMotoInsured.push({ typeInsured: "TL" });
      }
      motoInsured.push(motoInfo);
    }
  }
  data.motoInsured = motoInsured;
  return data;
};
