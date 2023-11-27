import {
  inputBoxBaseCss,
  labelCSSBase,
} from "../../../../components/ADMIN/ApartmentManagement/Input/AddOrEditApartments.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useFormik } from "formik";
import validationSchema from "../../../../validation_schemas";
import CustomInput, {
  classErr,
} from "../../../../components/ADMIN/ApartmentManagement/Input/CustomInput";
import { Category } from "../../../../type/Category";
import { Option } from "../../../../type/Option";
import { getDataCollection } from "../../../../services/getDataCollection";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import Modal from "./ValidationFormModal";
import { Button } from "@material-tailwind/react";
import { Apartment } from "../../../../type/Apartment";
import { uploadImage } from "../../../../utils/uploadImage";
import { addDocument } from "../../../../services/addDocs";
import { useLocation } from "react-router-dom";
import { db } from "../../../../config/firebase_config";
import { updateDocument } from "../../../../services/updateDocument";

const initialFormValue = {
  name: "",
  categoryId: "",
  area: "",
  direction: "",
  yearBuild: "",
  contractDuration: "",
  depositMoney: "",
  pricePerMonth: "",
  numberOfFloors: "",
  frontWidth: "",
  owner: "",
  ownerPhoneNumber: "",
  baths: "",
  beds: "",
  city: "",
  district: "",
  detailedAddress: "",
};

const AddApartments = () => {
  const [description, setDescription] = useState("");
  const [additionalFees, setAdditionalFees] = useState("");
  const [rentalTerms, setRentalTerms] = useState("");

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [images, setImages] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const maxNumber = 5;
  const [apartment, setApartment] = useState<Apartment>();

  const { pathname } = useLocation();
  const apartmentId: string | undefined =
    pathname.split("/").pop() === "add_or_edit"
      ? undefined
      : pathname.split("/").pop();

  const onChangeImagesList = (imageList: ImageListType) => {
    setImages(imageList as any);
  };
  const onChangeAvatar = (imageList: ImageListType) => {
    setAvatars(imageList as any);
  };
  const onSubmit = (values: any) => {
    if (!apartmentId) {
      if (
        !description ||
        !additionalFees ||
        !rentalTerms ||
        images.length < 5 ||
        avatars.length < 1
      ) {
        setIsOpenModal(true);
        setSubmitting(false);
        return;
      }

      const createNewApartment = async (data: any) => {
        try {
          const res = await uploadImagesAndAvartar(images, avatars);
          console.log(res);
          const newApartment: Apartment = {
            ...data,
            rented: false,
            createdDate: Timestamp.now(),
            avgRate: 0,
            detailedDescription: description,
            terms: rentalTerms,
            images: res?.imageUrls,
            avatar: res?.avatarUrl,
            additionalFees: additionalFees,
          };
          console.log(newApartment);
          await addDocument("apartments", newApartment);
          setSubmitting(false);
          resetForm({ values: initialFormValue });
          setDescription("");
          setRentalTerms("");
          setAdditionalFees("");
        } catch (err: any) {
          console.error(err);
        }
      };

      createNewApartment(values);
    } else {
      const updateApartment = async () => {
        try {
          let imageUrls;
          let avatarUrl;
          if (images.length === 5) {
            imageUrls = await uploadImages(images);
          }
          if (avatars.length === 1) {
            avatarUrl = await uploadAvatar(avatars);
          }

          const updatedApartmentData: Apartment = {
            ...values,
            detailedDescription: description,
            terms: rentalTerms,
            additionalFees: additionalFees,
            images: imageUrls || apartment?.images,
            avatar: avatarUrl || apartment?.avatar,
          };
          console.log(updatedApartmentData);
          await updateDocument("apartments", apartmentId, updatedApartmentData);
          setSubmitting(false);
          console.log("update successfully!");
        } catch (err: any) {
          console.error(err);
        }
      };
      updateApartment();
    }

    setAvatars([]);
    setImages([]);
  };
  const {
    values,
    handleBlur,
    handleChange,
    resetForm,
    errors,
    touched,
    setValues,
    setSubmitting,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: initialFormValue,

    onSubmit,
    validationSchema: validationSchema,
  });
  // fetch apartment if update mode

  useEffect(() => {
    if (apartmentId) {
      try {
        const fetchApartmentData = async () => {
          const apartmentRef = doc(db, `apartments/${apartmentId}`);
          const apartmentSnapshot = await getDoc(apartmentRef);

          const apartmentData = {
            ...(apartmentSnapshot.data() as Apartment),
            id: apartmentSnapshot.id,
          };

          setApartment(apartmentData as Apartment);
          setDescription(apartmentData.detailedDescription);
          setRentalTerms(apartmentData.terms);
          setAdditionalFees(apartmentData.additionalFees);
          setValues({ ...(apartmentData as any) });
        };
        fetchApartmentData();
      } catch (err: any) {
        console.error(err.message);
      }
    }
  }, [apartmentId, isSubmitting]);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/p");
        const provinceData = await res.json();

        // Transform response to match select options format
        const provinces = provinceData.map(
          (province: { name: string; code: number }) => ({
            label: province.name,
            value: province.code,
          })
        );

        setProvinces([{ label: "Select city", value: -1 }, ...provinces]);
      } catch (err: any) {
        console.error(err.messsage);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const handleProvinceSelect = async () => {
      if (values?.city) {
        try {
          const url = `https://provinces.open-api.vn/api/p/${values.city}?depth=2`;
          const res = await fetch(url);
          const province = await res.json();

          // Extract districts array
          const fetchedDistrictsData = province.districts;

          const districts = fetchedDistrictsData.map(
            (district: { name: string; code: number }) => ({
              label: district.name,
              value: district.code,
            })
          );

          setDistricts(() => [
            {
              label: "Select district",
              value: -1,
            },
            ...districts,
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        setDistricts([{ label: "All", value: -1 }]);
      }
    };
    handleProvinceSelect();
  }, [values.city]);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const [categoriesData] = await getDataCollection("categories");

        setCategories([
          { name: "Select category", id: "", createdDate: Timestamp.now() },
          ...(categoriesData as Category[]),
        ]);
      };
      fetchCategories();
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);

  return (
    <div className="p-6 sm:ml-6 mt-24">
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <CustomInput
            id="name"
            label="Apartment name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.name}
            placeholder="Apartment name"
            required
            error={errors.name}
            touched={touched.name}
          />

          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Apartment type
            </label>
            <select
              value={values.categoryId}
              onChange={handleChange}
              onBlur={handleBlur}
              id="categoryId"
              className={
                errors.categoryId && touched.categoryId
                  ? classErr
                  : inputBoxBaseCss
              }
              defaultValue={categories[0]?.id}
            >
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.categoryId && touched.categoryId && (
              <p className="mt-2 text-sm absolute text-red-600 dark:text-red-500">
                {errors.categoryId}
              </p>
            )}
          </div>

          <CustomInput
            value={values.area}
            onChange={handleChange}
            onBlur={handleBlur}
            id="area"
            type="number"
            label="Area (m2)"
            placeholder="Apartment name..."
            required
            error={errors.area}
            touched={touched.area}
          />
          <CustomInput
            label="Front direction"
            value={values.direction}
            onChange={handleChange}
            onBlur={handleBlur}
            id="direction"
            type="text"
            placeholder="east,west,..."
            required
            error={errors.direction}
            touched={touched.direction}
          />

          <CustomInput
            label="Built year"
            value={values.yearBuild}
            onChange={handleChange}
            onBlur={handleBlur}
            id="yearBuild"
            type="number"
            min={1990}
            placeholder="ex: 2015"
            required
            error={errors.yearBuild}
            touched={touched.yearBuild}
          />

          <CustomInput
            error={errors.contractDuration}
            touched={touched.contractDuration}
            label="Contract duration (years)"
            value={values.contractDuration}
            onChange={handleChange}
            onBlur={handleBlur}
            id="contractDuration"
            type="number"
            placeholder="1"
            required
          />

          <CustomInput
            error={errors.depositMoney}
            touched={touched.depositMoney}
            label="Deposit money (dollars)"
            type="number"
            placeholder="200"
            required
            value={values.depositMoney}
            onChange={handleChange}
            onBlur={handleBlur}
            id="depositMoney"
          />
          <CustomInput
            error={errors.pricePerMonth}
            touched={touched.pricePerMonth}
            label="Price/month (dollars)"
            type="number"
            value={values.pricePerMonth}
            onChange={handleChange}
            onBlur={handleBlur}
            id="pricePerMonth"
            placeholder="1000"
            required
          />
          <CustomInput
            error={errors.numberOfFloors}
            touched={touched.numberOfFloors}
            label="Number of floors"
            type="number"
            value={values.numberOfFloors}
            onChange={handleChange}
            onBlur={handleBlur}
            id="numberOfFloors"
            placeholder="2"
            required
          />

          <CustomInput
            error={errors.frontWidth}
            touched={touched.frontWidth}
            label="Front width (m)"
            type="number"
            placeholder="50"
            required
            value={values.frontWidth}
            onChange={handleChange}
            onBlur={handleBlur}
            id="frontWidth"
          />
          <CustomInput
            error={errors.owner}
            touched={touched.owner}
            label="Apartment owner"
            value={values.owner}
            onChange={handleChange}
            onBlur={handleBlur}
            id="owner"
            type="text"
            placeholder="Apartment owner"
            required
          />

          <CustomInput
            error={errors.ownerPhoneNumber}
            touched={touched.ownerPhoneNumber}
            label="Owner phone number"
            type="text"
            value={values.ownerPhoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            id="ownerPhoneNumber"
            placeholder="Phone number"
            required
          />
          <CustomInput
            error={errors.baths}
            touched={touched.baths}
            label="Number of baths"
            value={values.baths}
            onChange={handleChange}
            onBlur={handleBlur}
            id="baths"
            type="text"
            placeholder="1"
            required
          />
          <CustomInput
            error={errors.beds}
            touched={touched.beds}
            label="Number of beds"
            value={values.beds}
            onChange={handleChange}
            onBlur={handleBlur}
            id="beds"
            type="text"
            placeholder="1"
            required
          />

          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Select a city
            </label>
            <select
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              id="city"
              className={
                errors.city && touched.city ? classErr : inputBoxBaseCss
              }
              defaultValue={provinces[0]?.value}
            >
              {provinces.map((option: Option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.city && touched.city && (
              <p className="mt-2 text-sm absolute text-red-600 dark:text-red-500">
                {errors.city}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Select a district
            </label>
            <select
              value={values.district}
              onChange={handleChange}
              onBlur={handleBlur}
              id="district"
              className={
                errors.district && touched.district ? classErr : inputBoxBaseCss
              }
              defaultValue={districts[0]?.value}
            >
              {districts.map((option: Option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.district && touched.district && (
              <p className="mt-2 absolute text-sm text-red-600 dark:text-red-500">
                {errors.district}
              </p>
            )}
          </div>

          <CustomInput
            error={errors.detailedAddress}
            touched={touched.detailedAddress}
            label="Detailed address"
            type="text"
            value={values.detailedAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            id="detailedAddress"
            placeholder="Hai Ba Trung, Ha Noi"
            required
          />
        </div>
        <div className="grid grid-cols-1 mb-4 mt-10">
          <label className={`${labelCSSBase} `}>
            Description
            <span className="mt-2 ml-2 text-sm text-red-600 dark:text-red-500">
              *
            </span>
          </label>
          <ReactQuill
            theme="snow"
            id="description"
            onChange={(value: string) => setDescription(value)}
            value={description}
          />

          <label className={`${labelCSSBase} mt-20`}>
            Additional fees
            <span className="mt-2 ml-2 text-sm text-red-600 dark:text-red-500">
              *
            </span>
          </label>
          <ReactQuill
            theme="snow"
            id="additionalFees"
            onChange={(value: string) => setAdditionalFees(value)}
            value={additionalFees}
          />

          <label className={`${labelCSSBase} mt-20`}>
            Rental terms
            <span className="mt-2 ml-2 text-sm text-red-600 dark:text-red-500">
              *
            </span>
          </label>
          <ReactQuill
            theme="snow"
            id="rentalTerms"
            onChange={(value: string) => setRentalTerms(value)}
            value={rentalTerms}
          />
        </div>

        <div className="grid grid-cols-5 mb-4 mt-20">
          <div className="col-span-2">
            <label className={labelCSSBase}>Avatar</label>
            <ImageUploading
              multiple
              value={avatars}
              onChange={onChangeAvatar}
              maxNumber={1}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  {avatars.length < 1 && (
                    <button
                      type="button"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                  )}
                  <div className="flex flex-wrap gap-5 mt-8">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <div className="image-item__btn-wrapper ">
                          <img
                            src={image.dataURL}
                            alt=""
                            className="mt-4 mb-4 rounded max-h-32 object-cover"
                            width="200"
                          />
                          <div className="flex justify-between">
                            <Button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                              color="blue"
                            >
                              Update
                            </Button>

                            <Button
                              type="button"
                              onClick={() => onImageRemove(index)}
                              color="red"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
            {apartmentId ? (
              <>
                <p className="text-teal-900 mb-2 mt-8">Current avatar</p>
                <img
                  className="h-auto w-52 rounded-lg"
                  src={apartment?.avatar}
                  alt=" description"
                />
              </>
            ) : (
              <>
                {avatars.length < 1 && (
                  <p className="mt-2 absolute text-sm text-red-600 dark:text-red-500">
                    You need to upload avatar
                  </p>
                )}
              </>
            )}
          </div>
          <div className="col-span-3">
            <label className={labelCSSBase}>Images</label>
            <ImageUploading
              multiple
              value={images}
              onChange={onChangeImagesList}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <button
                    type="button"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  {images.length > 0 && (
                    <Button
                      type="button"
                      onClick={onImageRemoveAll}
                      className="ml-10"
                      size="md"
                    >
                      Remove all images
                    </Button>
                  )}

                  <div className="flex flex-wrap gap-5">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <div className="image-item__btn-wrapper ">
                          <img
                            src={image.dataURL}
                            alt=""
                            className="mt-4 mb-4 rounded h-28 object-cover"
                            width="200"
                          />
                          <div className="flex justify-between">
                            <Button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                              color="blue"
                            >
                              Update
                            </Button>

                            <Button
                              type="button"
                              onClick={() => onImageRemove(index)}
                              color="red"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>

            {apartmentId ? (
              <>
                <p className="text-teal-900 mt-12"> Current images</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {apartment?.images.map((url, index) => (
                    <img
                      key={index}
                      className="h-auto w-52 rounded-lg"
                      src={url}
                      alt=" description"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {images.length < 5 && (
                  <p className="mt-6 absolute text-sm text-red-600 dark:text-red-500">
                    You need to upload 5 images
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <Button
          disabled={isSubmitting}
          className="mt-10"
          type="submit"
          variant="outlined"
          color="blue"
        >
          {apartmentId ? "Update" : "Create new Apartment"}
        </Button>
      </form>
    </div>
  );
};

export default AddApartments;

async function uploadImagesAndAvartar(images: any, avatars: any) {
  try {
    const avatarUrl = await uploadImage(avatars[0].dataURL);
    const imageUrls = await Promise.all(
      images.map((image: any) => uploadImage(image.dataURL))
    );

    return { avatarUrl, imageUrls };
  } catch (err: any) {
    console.error(err.message);
  }
}
async function uploadImages(images: any) {
  try {
    const imageUrls = await Promise.all(
      images.map((image: any) => uploadImage(image.dataURL))
    );

    return imageUrls;
  } catch (err: any) {
    console.error(err.message);
  }
}
async function uploadAvatar(avatars: any) {
  try {
    const avatarUrl = await uploadImage(avatars[0].dataURL);

    return avatarUrl;
  } catch (err: any) {
    console.error(err.message);
  }
}
