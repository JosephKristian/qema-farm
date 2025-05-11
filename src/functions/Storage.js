import { getDownloadURL, ref as sRef, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from '../config/FirebaseConfig';
import { uploadToCloudinary } from "./CloudinaryUpload";

const usersRef = 'users/';
const goatsRef = 'goats/';
const foodsRef = 'foods/';
const maintenancesRef = 'maintenances/';

// Save Goat's Image
export const saveGoatImage = async (name, image) => {
  return await uploadToCloudinary(image, "goats");
};

export const saveFoodImage = async (name, image) => {
  return await uploadToCloudinary(image, "foods");
};

export const saveMaintenanceImage = async (name, image) => {
  return await uploadToCloudinary(image, "maintenances");
};

export const saveUserImage = async (name, image) => {
  return await uploadToCloudinary(image, "users");
};