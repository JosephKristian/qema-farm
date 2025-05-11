import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "./Constant";

export const uploadToCloudinary = async (image, folder = "others") => {
  const url = CLOUDINARY_UPLOAD_URL
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    throw err;
  }
};
