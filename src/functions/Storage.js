import { getDownloadURL, ref as sRef, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from '../config/FirebaseConfig';

const usersRef = 'users/';
const goatsRef = 'goats/';
const foodsRef = 'foods/';
const maintenancesRef = 'maintenances/';

// Save Goat's Image
export const saveGoatImage = (name, image) => {
  return new Promise((resolve, reject) => {
    uploadBytes(sRef(storage, `${goatsRef}${name}`), image).then(async (snapshot) => {
      var result = '';
      await getDownloadURL(sRef(storage, `${goatsRef}${name}`)).then((snapshot) => {
        result = snapshot;
      }).catch(error => reject(error));
      resolve(result);
    }).catch(error => reject(error));
  });
}

// Save Food's Image
export const saveFoodImage = (name, image) => {
  return new Promise((resolve, reject) => {
    uploadBytes(sRef(storage, `${foodsRef}${name}`), image).then(async (snapshot) => {
      var result = '';
      await getDownloadURL(sRef(storage, `${foodsRef}${name}`)).then((snapshot) => {
        result = snapshot;
      }).catch(error => reject(error));
      resolve(result);
    }).catch(error => reject(error));
  });
}

// Save Maintenance's Image
export const saveMaintenanceImage = (name, image) => {
  return new Promise((resolve, reject) => {
    uploadBytes(sRef(storage, `${maintenancesRef}${name}`), image).then(async (snapshot) => {
      var result = '';
      await getDownloadURL(sRef(storage, `${maintenancesRef}${name}`)).then((snapshot) => {
        result = snapshot;
      }).catch(error => reject(error));
      resolve(result);
    }).catch(error => reject(error));
  });
}

// Save User's Image
export const saveUserImage = (name, image) => {
  return new Promise((resolve, reject) => {
    uploadBytes(sRef(storage, `${usersRef}${name}`), image).then(async (snapshot) => {
      var result = '';
      await getDownloadURL(sRef(storage, `${usersRef}${name}`)).then((snapshot) => {
        result = snapshot;
      }).catch(error => reject(error));
      resolve(result);
    }).catch(error => reject(error));
  });
}