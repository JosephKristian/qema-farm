import { database } from '../config/FirebaseConfig';
import { ref, get, orderByChild, equalTo, query, push, set, orderByValue, remove, update } from 'firebase/database';

const usersRef = 'users/';
const goatsRef = 'goats/';
const foodsRef = 'foods/';
const maintenancesRef = 'maintenances/';
const transactionsRef = 'transactions/';
const packagesRef = 'packages/';
const packageTransactionsRef = 'package_transactions/';

// Check The Similar Email
export const checkSimilarEmail = (email) => {
  return new Promise((resolve, reject) => {
    const checkForEmail = query(ref(database, usersRef), orderByChild('email'), equalTo(email));
    get(checkForEmail).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

// Check The Similar Phone
export const checkSimilarPhone = (phone) => {
  return new Promise((resolve, reject) => {
    const checkForPhone = query(ref(database, usersRef), orderByChild('phone'), equalTo(phone));
    get(checkForPhone).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export const hasUserSeenTourForPage = (uid, path) => {
  return new Promise((resolve, reject) => {
    const pageKey = encodeURIComponent(path); // amankan path sebagai key
    const userRef = ref(database, `${usersRef}${uid}/toursSeen/${pageKey}`);
    get(userRef)
      .then(snapshot => resolve(snapshot.val() === true))
      .catch(error => reject(error));
  });
};

// Update status user sudah melihat tour
export const markTourAsSeenForPage = (uid, path) => {
  return new Promise((resolve, reject) => {
    const pageKey = encodeURIComponent(path);
    const userRef = ref(database, `${usersRef}${uid}/toursSeen/${pageKey}`);
    set(userRef, true)
      .then(() => resolve(true))
      .catch(error => reject(error));
  });
};



// Add new User to Database
export const addNewUsersToDatabase = (uid, _name, _email, _phone, _password) => {
  return new Promise((resolve, reject) => {
    set(ref(database, usersRef + uid), {
      name: _name,
      email: _email,
      phone: _phone,
      password: _password,
      avatar: "",
      role: 'user',
      toursSeen: {},
    }).catch((error) => {
      reject(error);
    });
    resolve(true);
  });
}

// Get User Data
export const getUserData = (uid) => {
  return new Promise((resolve, reject) => {
    const userData = query(ref(database, usersRef + uid));
    get(userData).then((snapshot) => {
      resolve(snapshot.val());
    }).catch((error) => reject(error));
  });
}

// Update User Data
export const updateUserData = (uid, userData) => {
  return new Promise((resolve, reject) => {
    set(ref(database, usersRef + uid), {
      avatar: userData.avatar,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: userData.role
    }).then((snapshot) => {
      resolve(true);
    }).catch((error) => reject(error));
  });
}

// Get All User
export const getAllUser = () => {
  return new Promise((resolve, reject) => {
    const userData = query(ref(database, usersRef), orderByChild('role'));
    get(userData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Get All Goat
export const getAllGoat = () => {
  return new Promise((resolve, reject) => {
    const goatData = query(ref(database, goatsRef));
    get(goatData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Add New Goat
export const addNewGoat = (data) => {
  return new Promise((resolve, reject) => {
    push(ref(database, goatsRef), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Edit The Goat
export const editTheGoat = (uid, data) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${goatsRef}${uid}`), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Remove Goat
export const removeGoat = (uid) => {
  return new Promise((resolve, reject) => {
    remove(ref(database, `${goatsRef}${uid}`)).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Get All Food
export const getAllFood = () => {
  return new Promise((resolve, reject) => {
    const foodData = query(ref(database, foodsRef));
    get(foodData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Add New Food
export const addNewFood = (data) => {
  return new Promise((resolve, reject) => {
    push(ref(database, foodsRef), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Edit The Food
export const editTheFood = (uid, data) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${foodsRef}${uid}`), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Remove Food
export const removeFood = (uid) => {
  return new Promise((resolve, reject) => {
    remove(ref(database, `${foodsRef}${uid}`)).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Get All Maintenance
export const getAllMaintenance = () => {
  return new Promise((resolve, reject) => {
    const maintenanceData = query(ref(database, maintenancesRef));
    get(maintenanceData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Add New Maintenance
export const addNewMaintenance = (data) => {
  return new Promise((resolve, reject) => {
    push(ref(database, maintenancesRef), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Edit The Maintenance
export const editTheMaintenance = (uid, data) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${maintenancesRef}${uid}`), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Remove Maintenance
export const removeMaintenance = (uid) => {
  return new Promise((resolve, reject) => {
    remove(ref(database, `${maintenancesRef}${uid}`)).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// New Transaction
export const newTransaction = (theGoat, theFood, theMaintenance, uid) => {
  return new Promise((resolve, reject) => {
    const timeNow = new Date();
    push(ref(database, transactionsRef), {
      goat: theGoat,
      food: theFood,
      maintenance: theMaintenance,
      user: uid,
      created_by: {
        uid: uid,
        name: localStorage.getItem('name') || 'Unknown',
      },
      confirmed: false,
      created_at: timeNow.getTime(),
      updated_at: timeNow.getTime(),
    }).then((snapshot) => {
      resolve(snapshot.key);
    }).catch((error) => reject(error));
  });
}

export const saveWeight = async (transactionId, weight) => {
  try {
    console.log('transactionId', transactionId);
    console.log('weight', weight);
    await update(ref(database, `${transactionsRef}/${transactionId}`), {
      weight: parseFloat(weight),
      updated_at: new Date().getTime(), // jika ingin update timestamp juga
    });
    alert('Berat berhasil disimpan!');
  } catch (error) {
    console.error('Gagal menyimpan berat:', error);
    alert('Terjadi kesalahan saat menyimpan berat.');
  }
};

// Get Transaction
export const getTransaction = (uid) => {
  return new Promise((resolve, reject) => {
    get(query(ref(database, `${transactionsRef}${uid}`))).then((snapshot) => {
      resolve(snapshot.val());
    }).catch((error) => reject(error));
  });
}

// Get All Transaction
export const getAllTransaction = () => {
  return new Promise((resolve, reject) => {
    const transactionData = query(ref(database, transactionsRef));
    get(transactionData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Confirm Transaction
export const confirmTransaction = (uid, transaction) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${transactionsRef}${uid}`), {
      ...transaction,
      confirmed: true,
      confirmed_at: Date.now(), 
      updated_at: Date.now(), 
    }).then(() => {
      resolve(true);
    }).catch((error) => reject(error));
  });
}

// Get Admin
export const getAdmin = () => {
  return new Promise((resolve, reject) => {
    get(query(ref(database, usersRef), orderByChild('role'), equalTo('admin'))).then((snapshot) => {
      let data = {};
      snapshot.forEach(element => {
        data = { uid: element.key, ...element.val() };
      });
      resolve(data);
    }).catch((error) => reject(error));
  });
}

// Add New Package
export const addNewPackage = (data) => {
  return new Promise((resolve, reject) => {
    push(ref(database, packagesRef), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Get All Package
export const getAllPackage = () => {
  return new Promise((resolve, reject) => {
    const packageData = query(ref(database, packagesRef));
    get(packageData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        result.push({ uid: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Get Package
export const getPackage = (uid) => {
  return new Promise((resolve, reject) => {
    get(query(ref(database, `${packagesRef}${uid}`))).then((snapshot) => {
      resolve(snapshot.val());
    }).catch((error) => reject(error));
  });
}

// Confirm Package
export const confirmPackage = (key, thePackage) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${packageTransactionsRef}/${key}`), {
      ...thePackage,
      confirmed: true,
      updated_at: Date.now(),
      confirmed_at: Date.now()
    }).then(() => {
      resolve(true);
    }).catch((error) => reject(error));
  });
};


// Remove Package
export const removePackage = (uid) => {
  return new Promise((resolve, reject) => {
    remove(ref(database, `${packagesRef}${uid}`)).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Edit Package
export const editThePackage = (uid, data) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `${packagesRef}${uid}`), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

// Add New Package Transaction
export const addNewPackageTransaction = (data) => {
  return new Promise((resolve, reject) => {
    push(ref(database, packageTransactionsRef), data).then((snapshot) => {
      resolve(snapshot);
    }).catch((error) => reject(error));
  });
}

export const savePackageWeight = async (packageTransactionId, weight) => {
  try {
    await update(ref(database, `${packageTransactionsRef}/${packageTransactionId}`), {
      weight: parseFloat(weight),
      updated_at: new Date().getTime(),
    });
    alert('Berat paket berhasil disimpan!');
  } catch (error) {
    console.error('Gagal menyimpan berat paket:', error);
    alert('Terjadi kesalahan saat menyimpan berat paket.');
  }
};

export const saveWeightPackageTransacion = async (transactionId, weight) => {
  try {
    await update(ref(database, `${packageTransactionsRef}/${transactionId}`), {
      weight: parseFloat(weight),
      updated_at: new Date().getTime(), // jika ingin update timestamp juga
    });
    alert('Berat berhasil disimpan!');
  } catch (error) {
    console.error('Gagal menyimpan berat:', error);
    alert('Terjadi kesalahan saat menyimpan berat.');
  }
};

// Get All Package Transaction
export const getAllPackageTransaction = () => {
  return new Promise((resolve, reject) => {
    const packageData = query(ref(database, packageTransactionsRef));
    get(packageData).then((snapshot) => {
      const result = [];
      snapshot.forEach(element => {
        console.log(element.key);
        result.push({ key: element.key, ...element.val() });
      });
      resolve(result);
    }).catch((error) => reject(error));
  });
}

// Get Package Transaction
export const getPackageTransaction = (uid) => {
  return new Promise((resolve, reject) => {
    get(query(ref(database, `${packageTransactionsRef}${uid}`))).then((snapshot) => {
      resolve(snapshot.val());
    }).catch((error) => reject(error));
  });
}