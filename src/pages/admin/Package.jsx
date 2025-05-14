import React, { useState, useReducer, useEffect } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { foodReducer, goatReducer, maintenanceReducer, packageReducer } from '../../config/Reducer';
import { addNewPackage, editThePackage, getAllFood, getAllGoat, getAllMaintenance, getAllPackage, removePackage } from '../../functions/Database';
import { useNavigate } from 'react-router-dom';

const Package = () => {
  const format = Intl.NumberFormat();
  let index = 0;
  const [foodRed, dispatchFood] = useReducer(foodReducer, []);
  const [goatRed, dispatchGoat] = useReducer(goatReducer, []);
  const [maintenanceRed, dispatchMaintenance] = useReducer(maintenanceReducer, []);
  const [packageRed, dispatchPackage] = useReducer(packageReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [addPackageModal, setAddPackageModal] = useState(false);
  const [editPackageModal, setEditPackageModal] = useState(false);
  const [detailpackageModal, setDetailPackageModal] = useState(false);
  const [deletePackageModal, setDeletePackageModal] = useState(false);
  const [packageSelected, setPackageSelected] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePrice, setPackagePrice] = useState(0);
  const [packageDiscount, setPackageDiscount] = useState(0);
  const [packageGoat, setPackageGoat] = useState(null);
  const [packageFood, setPackageFood] = useState(null);
  const [packageMaintenance, setPackageMaintenance] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllFood();
    retrieveAllGoat();
    retrieveAllMaintenance();
    retrieveAllPackage();
    return () => { }
  }, [])

  useEffect(() => {
    setPackageName(prev => packageSelected === null ? '' : packageSelected.name);
    setPackagePrice(prev => packageSelected === null ? 0 : packageSelected.price);
    setPackageDiscount(prev => packageSelected === null ? 0 : packageSelected.discount_price);
    setPackageGoat(prev => packageSelected === null ? '' : packageSelected.goat.uid);
    setPackageFood(prev => packageSelected === null ? '' : packageSelected.food.uid);
    setPackageMaintenance(prev => packageSelected === null ? '' : packageSelected.maintenance.uid);
    setPackageDescription(prev => packageSelected === null ? '' : packageSelected.description);
    return () => {
    }
  }, [packageSelected])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const showAddModal = () => {
    setPackageGoat(goatRed.length < 1 ? '' : goatRed[0].uid);
    setPackageFood(foodRed.length < 1 ? '' : foodRed[0].uid);
    setPackageMaintenance(maintenanceRed.length < 1 ? '' : maintenanceRed[0].uid);
    setAddPackageModal(true);
  }

  const resetForm = () => {
    setPackageName(prev => '');
    setPackagePrice(prev => 0);
    setPackageDiscount(prev => 0);
    setPackageGoat(prev => null);
    setPackageFood(prev => null);
    setPackageMaintenance(prev => null);
    setPackageDescription(prev => '');
    setPackageSelected(prev => null);
  }

  const retrieveAllFood = async () => {
    try {
      await getAllFood().then(
        (resolve) => {
          dispatchFood({
            type: 'retrieve_food',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const retrieveAllGoat = async () => {
    try {
      await getAllGoat().then(
        (resolve) => {
          dispatchGoat({
            type: 'retrieve_goat',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const retrieveAllMaintenance = async () => {
    try {
      await getAllMaintenance().then(
        (resolve) => {
          dispatchMaintenance({
            type: 'retrieve_maintenance',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const retrieveAllPackage = async () => {
    try {
      await getAllPackage().then(
        (resolve) => {
          dispatchPackage({
            type: 'retrieve_package',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const addPackage = async () => {
    try {
      if (validation()) {
        setLoading(true);
        await addNewPackage({
          name: packageName,
          description: packageDescription,
          price: packagePrice,
          discount_price: packageDiscount,
          goat: goatRed.filter(element => element.uid === packageGoat)[0],
          food: foodRed.filter(element => element.uid === packageFood)[0],
          maintenance: maintenanceRed.filter(element => element.uid === packageMaintenance)[0],
        }).then(
          async (resolve) => {
            await retrieveAllPackage();
            setAddPackageModal(false);
            resetForm();
          },
          (reject) => {
            console.log(reject);
            throw reject;
          }
        );
      } else {
        throw 'Form harus diisi!';
      }
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const editPackage = async () => {
    try {
      if (validation()) {
        setLoading(true);
        await editThePackage(packageSelected.uid, {
          name: packageName,
          description: packageDescription,
          price: packagePrice,
          discount_price: packageDiscount,
          goat: goatRed.filter(element => element.uid === packageGoat)[0],
          food: foodRed.filter(element => element.uid === packageFood)[0],
          maintenance: maintenanceRed.filter(element => element.uid === packageMaintenance)[0],
        }).then(
          async (resolve) => {
            await retrieveAllPackage();
            setEditPackageModal(false);
            resetForm();
          },
          (reject) => {
            console.log(reject);
            throw reject;
          }
        );
      } else {
        throw 'Form harus diisi!';
      }
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const validation = () => {
    if (packageName.length < 1) {
      console.log('name');
      return false;
    } else if (packagePrice < 1) {
      console.log('price');
      return false;
    } else if (packageGoat === null || packageGoat.length < 1) {
      console.log('goat');
      return false;
    } else if (packageFood === null || packageFood.length < 1) {
      console.log('food');
      return false;
    } else if (packageMaintenance === null || packageMaintenance.length < 1) {
      console.log('maintenance');
      return false;
    } else if (packageDescription.length < 1) {
      console.log('description');
      return false;
    }
    return true;
  }

  const deletePackage = async () => {
    try {
      setLoading(true);
      console.log(packageSelected);
      await removePackage(packageSelected.uid).then(
        async (resolve) => {
          await retrieveAllPackage();
          setDeletePackageModal(false);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      <div className='flex flex-row justify-start'>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className='flex-1 flex flex-col items-center space-y-4 px-4 sm:px-6 md:px-10 my-[90px] overflow-y-auto'>
          {/* Tombol Tambah & Input Pencarian */}
          <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0'>
            <button
              onClick={() => showAddModal()}
              className='bg-[#145412] text-white font-medium text-base sm:text-lg rounded-md px-4 py-2 w-full sm:w-auto'
            >
              Tambah
            </button>
            <input
              type='text'
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Cari Paket'
              className='w-full sm:w-96 border border-gray-200 rounded-md outline-none p-2 text-sm sm:text-base'
            />
          </div>

          {/* Tabel Responsif */}
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[900px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className='text-white text-xs sm:text-sm md:text-base'>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Paket</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Kambing</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Pakan</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Perawatan</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Harga</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 w-[220px]'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  packageRed
                    .filter(e => e.name.toLowerCase().includes(search.toLowerCase().trim()))
                    .map((element, index) => (
                      <tr key={element.uid} className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.name}</td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>
                          {element.goat.name} {element.goat.sex} ({element.goat.type})
                        </td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.food.name}</td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.maintenance.name}</td>
                        <td className='border border-slate-200 p-2 text-[#b31818] capitalize'>
                          Rp.{' '}
                          <span className={element.discount_price !== 0
                            ? 'line-through text-[#333333] font-normal'
                            : 'text-[#b31818] text-base font-medium'}>
                            {format.format(element.price).replaceAll(',', '.')}
                          </span>{' '}
                          <span className='text-[#b31818] text-base font-semibold'>
                            {element.discount_price !== 0 ? format.format(element.discount_price).replaceAll(',', '.') : ''}
                          </span>
                        </td>
                        <td className='border border-slate-200 p-2 w-[220px]'>
                          <div className='flex flex-wrap gap-2 justify-start'>
                            <button
                              onClick={() => {
                                setPackageSelected(element);
                                setDetailPackageModal(true);
                              }}
                              className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-3 py-2 text-xs sm:text-sm whitespace-nowrap'
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => {
                                setPackageSelected(element);
                                setEditPackageModal(true);
                              }}
                              className='bg-[#145412] rounded-lg text-white px-3 py-2 text-xs sm:text-sm whitespace-nowrap'
                            >
                              Ubah
                            </button>
                            <button
                              onClick={() => {
                                setPackageSelected(element);
                                setDeletePackageModal(true);
                              }}
                              className='bg-[#b31818] rounded-lg text-white px-3 py-2 text-xs sm:text-sm whitespace-nowrap'
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Package Modal */}
      <Modal
        isOpen={addPackageModal}
        onRequestClose={() => {
          resetForm();
          setAddPackageModal(false);
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '20'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[480px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* Package Name */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket <span className='text-red-600'>*</span></p>
            <input type='text' defaultValue='' onChange={(e) => setPackageName(e.target.value)} placeholder='Nama Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Package Price */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Paket <span className='text-red-600'>*</span></p>
            <input type='number' defaultValue={0} onChange={(e) => setPackagePrice(e.target.value.length < 1 ? 1 : parseInt(e.target.value))} placeholder='Harga Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Package Discount */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Diskon</p>
            <input type='number' defaultValue={0} onChange={(e) => setPackageDiscount(e.target.value === '' ? 1 : parseInt(e.target.value))} placeholder='Harga Diskon Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Goat */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1
            '>Jenis Kambing <span className='text-red-600'>*</span></p>
            <select defaultValue={goatRed.length < 1 ? '' : goatRed[0].uid} onChange={(e) => setPackageGoat(goatRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                goatRed.map(element => (
                  <option value={element.uid}>{element.name} {element.type} ({element.sex})</option>
                ))
              }
            </select>
          </div>
          {/* Food */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan <span className='text-red-600'>*</span></p>
            <select defaultValue={foodRed.length < 1 ? '' : foodRed[0].uid} onChange={(e) => setPackageFood(foodRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                foodRed.map(element => (
                  <option value={element.uid}>{element.name}</option>
                ))
              }
            </select>
          </div>
          {/* Maintenance */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan <span className='text-red-600'>*</span></p>
            <select defaultValue={maintenanceRed.length < 1 ? '' : maintenanceRed[0].uid} onChange={(e) => setPackageMaintenance(maintenanceRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                maintenanceRed.map(element => (
                  <option value={element.uid}>{element.name}</option>
                ))
              }
            </select>
          </div>
          {/* Description */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi Paket <span className='text-red-600'>*</span></p>
            <textarea defaultValue='' onChange={(e) => setPackageDescription(e.target.value)} placeholder='Deskripsi Paket' rows={3} className='w-full border border-gray-200 rounded-md outline-none p-2'></textarea>
          </div>
          {/* Button */}
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setAddPackageModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => addPackage()}>Tambah</button>
          </div>
        </div>

      </Modal>

      {/* Edit Package Modal */}
      <Modal
        isOpen={editPackageModal}
        onRequestClose={() => {
          resetForm();
          setEditPackageModal(false);
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '20'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[480px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* Name */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket <span className='text-red-600'>*</span></p>
            <input type='text' defaultValue={packageSelected === null ? '' : packageSelected.name} onChange={(e) => setPackageName(e.target.value)} placeholder='Nama Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Price */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Paket <span className='text-red-600'>*</span></p>
            <input type='number' defaultValue={packageSelected === null ? 0 : packageSelected.price} onChange={(e) => setPackagePrice(e.target.value.length < 1 ? 1 : parseInt(e.target.value))} placeholder='Harga Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Discount */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Diskon</p>
            <input type='number' defaultValue={packageSelected === null ? 0 : packageSelected.discount_price} onChange={(e) => setPackageDiscount(e.target.value === '' ? 1 : parseInt(e.target.value))} placeholder='Harga Diskon Paket' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Goat */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kambing <span className='text-red-600'>*</span></p>
            <select defaultValue={packageSelected === null ? (goatRed.length < 1 ? '' : goatRed[0].uid) : packageSelected.goat.uid} onChange={(e) => setPackageGoat(goatRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                goatRed.map(element => (
                  <option value={element.uid}>{element.name} {element.type} ({element.sex})</option>
                ))
              }
            </select>
          </div>
          {/* Food */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan <span className='text-red-600'>*</span></p>
            <select defaultValue={packageSelected === null ? (foodRed.length < 1 ? '' : foodRed[0].uid) : packageSelected.food.uid} onChange={(e) => setPackageFood(foodRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                foodRed.map(element => (
                  <option value={element.uid}>{element.name}</option>
                ))
              }
            </select>
          </div>
          {/* Maintenance */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan <span className='text-red-600'>*</span></p>
            <select defaultValue={packageSelected === null ? (maintenanceRed.length < 1 ? '' : maintenanceRed[0].uid) : packageSelected.maintenance.uid} onChange={(e) => setPackageMaintenance(maintenanceRed.filter(data => data.uid === e.target.value)[0].uid)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {
                maintenanceRed.map(element => (
                  <option value={element.uid}>{element.name}</option>
                ))
              }
            </select>
          </div>
          {/* Description */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi Paket <span className='text-red-600'>*</span></p>
            <textarea defaultValue={packageSelected === null ? '' : packageSelected.description} onChange={(e) => setPackageDescription(e.target.value)} placeholder='Deskripsi Paket' rows={3} className='w-full border border-gray-200 rounded-md outline-none p-2'></textarea>
          </div>
          {/* Button */}
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setEditPackageModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => editPackage()}>Ubah</button>
          </div>
        </div>

      </Modal>

      {/* Detail Package Modal */}
      <Modal
        isOpen={detailpackageModal}
        onRequestClose={() => {
          resetForm();
          setDetailPackageModal(false);
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '20'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{packageSelected === null ? '' : packageSelected.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Paket</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>Rp. <span className={packageSelected === null ? '' : (packageSelected.discount_price !== 0 ? 'line-through text-[#333333] font-normal' : 'text-[#b31818] text-base font-medium')}>{packageSelected === null ? '' : format.format(packageSelected.price).replaceAll(',', '.')}</span> <span className='text-[#b31818] text-base font-semibold'>{packageSelected === null ? '' : (packageSelected.discount_price !== 0 ? format.format(packageSelected.discount_price).replaceAll(',', '.') : '')}</span></p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kambing</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{packageSelected === null ? '' : packageSelected.goat.name} {packageSelected ? packageSelected.goat.sex : ''}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Tipe Kambing</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{packageSelected ? packageSelected.goat.type : ''}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{packageSelected ? packageSelected.food.name : ''}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{packageSelected ? packageSelected.maintenance.name : ''}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi</p>
            <div className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {packageSelected ? packageSelected.description : ''}
            </div>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setDetailPackageModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deletePackageModal}
        onRequestClose={() => setDeletePackageModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '10',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333] '>Konfirmasi</h1>
          <p className='flex-1 text-base font-medium text-[#b31818]'>Apakah anda yakin ingin menghapus <span className='font-bold'>{packageSelected ? packageSelected.name : ''}</span>?</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='border border-[#b31818] px-4 py-2 rounded-lg text-[#b31818] font-semibold text-base' onClick={() => setDeletePackageModal(false)}>Batal</button>
            <button className='bg-[#b31818] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => deletePackage()}>Hapus</button>
          </div>
        </div>

      </Modal>

      {/* Loading */}
      <Loading show={loading} />

      {/* Dialog Modal */}
      <Modal
        isOpen={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '100',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333] '>{title}</h1>
          <p className='flex-1 text-base font-medium text-[#145412]'>{description}</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setVisibleModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>
    </div>
  );
}

export default Package;