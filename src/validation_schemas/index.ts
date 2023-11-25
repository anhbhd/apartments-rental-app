import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Apartment name is required"),
  categoryId: Yup.string().required("Apartment type is required"),
  area: Yup.number()
    .required("Area is required")
    .positive("Area must be a positive number"),
  direction: Yup.string().required("Front direction is required"),
  yearBuild: Yup.number()
    .required("Built year is required")
    .min(1990, "Built year must be greater than or equal to 1990"),
  contractDuration: Yup.number()
    .required("Contract duration is required")
    .positive("Contract duration must be a positive number"),
  depositMoney: Yup.number()
    .required("Deposit money is required")
    .positive("Deposit money must be a positive number"),
  pricePerMonth: Yup.number()
    .required("Price per month is required")
    .positive("Price per month must be a positive number"),
  numberOfFloors: Yup.number()
    .required("Number of floors is required")
    .positive("Number of floors must be a positive number"),
  frontWidth: Yup.number()
    .required("Front width is required")
    .positive("Front width must be a positive number"),
  owner: Yup.string().required("Apartment owner is required"),
  ownerPhoneNumber: Yup.string()
    .required("Owner phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  baths: Yup.string().required("Number of baths is required"),
  beds: Yup.string().required("Number of beds is required"),
  city: Yup.number()
    .required("Province is required")
    .positive("Please select valid city"),
  district: Yup.number()
    .required("District is required")
    .positive("Please select valid district"),
  detailedAddress: Yup.string().required("Detailed address is required"),
});

export default validationSchema;
