export const uploadImage = async (imgBase64: string | undefined) => {
  let imgData;
  try {
    if (imgBase64) {
      const image = new FormData();
      image.append("file", imgBase64);
      image.append("cloudname", "dfabxogw5");
      image.append("upload_preset", "zulsyvvm");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfabxogw5/image/upload",
        {
          method: "post",
          body: image,
        }
      );
      imgData = await res.json();
    }
  } catch (err) {
    console.log(err);
  }
  return imgData.url;
};
