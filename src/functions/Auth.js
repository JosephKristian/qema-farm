import { auth } from '../config/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth';

// Register
export const registerUsers = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      resolve(user);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

// Login
export const loginUsers = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      resolve(user);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

// Change Pass
export const changePass = (password) => {
  return new Promise((resolve, reject) => {
    loginUsers(localStorage.getItem('email'), localStorage.getItem('password')).then(
      (resolve) => {
        const user = auth.currentUser;
        updatePassword(user, password).then(() => {
          resolve(true);
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
      },
      (reject) => { throw reject }
    );
  });
}

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve('Link reset password berhasil dikirim ke email Anda.');
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

// Check Auth
export const checkAuthState = () => {
  return localStorage.getItem('uid') !== null ? localStorage.getItem('uid') : null;
}

// Sign Out
export const signOutUser = () => {
  signOut(auth);
}