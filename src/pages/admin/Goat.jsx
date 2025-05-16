import React, { useState, useReducer, useEffect, useRef } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { goatReducer } from '../../config/Reducer';
import { addNewGoat, editTheGoat, getAllGoat, removeGoat } from '../../functions/Database';
import { saveGoatImage } from '../../functions/Storage';
import { useNavigate } from 'react-router-dom';

const Goat = () => {
  const format = Intl.NumberFormat();
  let index = 0;
  const [state, dispatch] = useReducer(goatReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [editGoatModal, setEditGoatModal] = useState(false);
  const [addGoatModal, setAddGoatModal] = useState(false);
  const [detailGoatModal, setDetailGoatModal] = useState(false);
  const [deleteGoatModal, setDeleteGoatModal] = useState(false);
  const [goatSelected, setGoatSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [goatName, setGoatName] = useState('');
  const [goatWeight, setGoatWeight] = useState(0);
  const [goatTime, setGoatTime] = useState(0);
  const [goatType, setGoatType] = useState('');
  const [goatLivestockTypes, setLivestockTypes] = useState('');
  const [goatPrice, setGoatPrice] = useState(0);
  const [goatSex, setGoatSex] = useState('');
  const [goatImage, setGoatImage] = useState({});
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const types = ['Dewasa', 'Muda', 'Cempe'];
  const livestockTypes = ['Domba', 'Kambing'];
  const sex = ['Betina', 'Jantan'];
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllGoat();
    return () => { }
  }, [])

  useEffect(() => {
    setGoatName(prev => goatSelected === null ? '' : goatSelected.name);
    setGoatWeight(prev => goatSelected === null ? 0 : goatSelected.weight);
    setGoatTime(prev => goatSelected === null ? 0 : goatSelected.time);
    setGoatType(prev => goatSelected === null ? '' : goatSelected.type);
    setLivestockTypes(prev => goatSelected === null ? '' : goatSelected.livestockTypes);
    setGoatSex(prev => goatSelected === null ? '' : goatSelected.sex);
    setGoatPrice(prev => goatSelected === null ? 0 : goatSelected.price);
    return () => { }
  }, [goatSelected])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const resetForm = () => {
    setGoatName('');
    setGoatPrice(0);
    setGoatWeight(0);
    setGoatTime(0);
    setGoatType('');
    setLivestockTypes('');
    setGoatImage({});
  }

  const retrieveAllGoat = async () => {
    try {
      await getAllGoat().then(
        (resolve) => {
          dispatch({
            type: 'retrieve_goat',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan! [retrieveAllGoat]', error.toString());
    }
  }

  const addGoat = async () => {
    try {
      if (!validation()) throw 'Form harus diisi dengan lengkap!';
  
      setLoading(true);
      const goatImageName = new Date().getTime();
      const uploadedImageUrl = await saveGoatImage(goatImageName, goatImage);
  
      const data = {
        name: goatName,
        type: goatType,
        livestockTypes: goatLivestockTypes,
        sex: goatSex,
        weight: goatWeight,
        time: goatTime,
        price: parseInt(goatPrice),
        image: uploadedImageUrl,
        created_at: goatImageName,
      };
  
      await addNewGoat(data);
      await retrieveAllGoat();
      setAddGoatModal(false);
      resetForm();
  
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  };  

  const editGoat = async () => {
    try {
      if (validationForEdit()) {
        setLoading(true);
        await editTheGoat(goatSelected.uid, {
          name: goatName,
          price: parseInt(goatPrice),
          sex: goatSex,
          type: goatType,
          livestockTypes: goatLivestockTypes,
          time: goatTime,
          weight: goatWeight,
          image: goatSelected.image,
          created_at: goatSelected.created_at,
        }).then(
          async (resolve) => {
            await retrieveAllGoat();
            setEditGoatModal(false);
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
    const errors = [];
  
    if (goatName.length < 1) errors.push('Nama kambing belum diisi.');
    if (goatPrice.length < 1 || parseInt(goatPrice) === 0) errors.push('Harga belum diisi atau bernilai 0.');
    if (goatWeight.length < 1 || parseInt(goatWeight) === 0) errors.push('Berat belum diisi atau bernilai 0.');
    if (goatTime.length < 1 || parseInt(goatTime) === 0) errors.push('Waktu belum diisi atau bernilai 0.');
    if (goatType.length < 1) errors.push('Kategori umur belum dipilih.');
    if (goatLivestockTypes.length < 1) errors.push('Jenis ternak belum dipilih.');
    if (goatSex.length < 1) errors.push('Jenis kelamin belum dipilih.');
    if (!goatImage?.name) errors.push('Gambar belum dipilih.');
  
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
  
    return true;
  };

  
  const validationForEdit = () => {
    const errors = [];
  
    if (!goatName?.length) errors.push('Nama kambing belum diisi.');
    if (!goatPrice || parseInt(goatPrice) === 0) errors.push('Harga belum diisi atau bernilai 0.');
    if (!goatWeight || parseInt(goatWeight) === 0) errors.push('Berat belum diisi atau bernilai 0.');
    if (!goatTime || parseInt(goatTime) === 0) errors.push('Waktu belum diisi atau bernilai 0.');
    if (!goatType?.length) errors.push('Kategori umur belum dipilih.');
    if (!goatLivestockTypes?.length) errors.push('Jenis ternak belum dipilih.');
    if (!goatSex?.length) errors.push('Jenis kelamin belum dipilih.');
    
  
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
  
    return true;
  };
  

  const deleteGoat = async () => {
    try {
      setLoading(true);
      console.log(goatSelected);
      await removeGoat(goatSelected.uid).then(
        async (resolve) => {
          await retrieveAllGoat();
          setDeleteGoatModal(false);
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
          {/* Header: Tombol Tambah dan Input Search */}
          <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0'>
            <button
              onClick={() => {
                setAddGoatModal(true);
                setGoatType(types[0]);
                setLivestockTypes(livestockTypes[0]);
                setGoatSex(sex[0]);
              }}
              className='bg-[#145412] text-white font-medium text-base sm:text-lg rounded-md px-4 py-2 w-full sm:w-auto'
            >
              Tambah
            </button>
            <input
              type='text'
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Cari Kambing'
              className='w-full sm:w-96 border border-gray-200 rounded-md outline-none p-2 text-sm sm:text-base'
            />
          </div>

          {/* Tabel Container dengan Scroll Horizontal */}
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[900px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className='text-white text-xs sm:text-sm md:text-base'>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Ternak</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Jenis</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Kategori Umur</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Berat per Waktu</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Jenis Kelamin</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Harga</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4 w-[220px]'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  state
                    .filter(e => e.name.toLowerCase().includes(search.toLowerCase().trim()))
                    .map((element, index) => (
                      <tr key={element.uid} className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.name}</td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.livestockTypes}</td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.type}</td>
                        <td className='border border-slate-200 p-2 text-[#333333]'>{element.weight} kg / {element.time} bulan</td>
                        <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.sex}</td>
                        <td className='border border-slate-200 p-2 text-[#EA341B] font-medium capitalize'>Rp. {element.price.toLocaleString().replaceAll(',', '.')}</td>
                        <td className='border border-slate-200 p-2 w-[220px]'>
                          <div className='flex flex-wrap gap-2 justify-start'>
                            <button
                              onClick={() => {
                                setGoatSelected(element);
                                setDetailGoatModal(true);
                              }}
                              className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-3 py-2 text-xs sm:text-sm whitespace-nowrap'
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => {
                                setGoatSelected(element);
                                setEditGoatModal(true);
                              }}
                              className='bg-[#145412] rounded-lg text-white px-3 py-2 text-xs sm:text-sm whitespace-nowrap'
                            >
                              Ubah
                            </button>
                            <button
                              onClick={() => {
                                setGoatSelected(element);
                                setDeleteGoatModal(true);
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

      {/* Add Goat Modal */}
      <Modal
        isOpen={addGoatModal}
        onRequestClose={() => {
          resetForm();
          setAddGoatModal(false);
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
            zIndex: '20',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {
            goatImage.name === undefined || goatImage.name === null
              ? (
                <button onClick={() => imageRef.current.click()} className='flex items-center justify-center self-center rounded-lg w-[160px] h-[160px] mb-4 border border-gray-800 text-gray-800 text-lg font-medium'>
                  Tambah Foto
                </button>
              )
              : <img onClick={() => imageRef.current.click()} src={URL.createObjectURL(goatImage)} alt='/' className='self-center rounded-lg w-[160px] h-[160px] mb-4' />
          }
          <input type='file' ref={imageRef} multiple={false} onChange={(e) => {
            console.log(URL.createObjectURL(e.target.files[0]));
            if (e.target.files && e.target.files[0] && e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png') setGoatImage(e.target.files[0]);
          }} className='hidden' />
          {/* Name */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama</p>
            <input type='text' defaultValue='' onChange={(e) => setGoatName(e.target.value)} placeholder='Nama Kambing' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Price */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <input type='number' defaultValue='' onChange={(e) => setGoatPrice(e.target.value)} placeholder='Harga Kambing' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Sex */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kelamin</p>
            <select defaultValue={sex[0]} onChange={(e) => setGoatSex(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {sex.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Type */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <select defaultValue={livestockTypes[0]} onChange={(e) => setLivestockTypes(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {livestockTypes.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Kategori Umur */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kategori Umur</p>
            <select defaultValue={types[0]} onChange={(e) => setGoatType(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {types.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Weight and Time */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Berat per Waktu</p>
            <div className='flex flex-row justify-between items-center space-x-2'>
              <input type='number' defaultValue={0} onChange={(e) => setGoatWeight(e.target.value)} placeholder='Berat (kg)' className='w-full border border-gray-200 rounded-md outline-none p-2' />
              <p>kg</p>
              <p>/</p>
              <input type='number' defaultValue={0} onChange={(e) => setGoatTime(e.target.value)} placeholder='Waktu (bulan)' className='w-full border border-gray-200 rounded-md outline-none p-2' />
              <p>bulan</p>
            </div>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setAddGoatModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => addGoat()}>Tambah</button>
          </div>
        </div>

      </Modal>

      {/* Edit Goat Modal */}
      <Modal
        isOpen={editGoatModal}
        onRequestClose={() => {
          resetForm();
          setEditGoatModal(false);
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
            zIndex: '20',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* Name */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama</p>
            <input type='text' defaultValue={goatSelected === null ? '' : goatSelected.name} onChange={(e) => setGoatName(e.target.value)} placeholder='Nama Kambing' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Price */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <input type='number' defaultValue={goatSelected === null ? '' : goatSelected.price} onChange={(e) => setGoatPrice(e.target.value)} placeholder='Harga Kambing' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          {/* Sex */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kelamin</p>
            <select defaultValue={goatSelected === null ? '' : goatSelected.sex} onChange={(e) => setGoatSex(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {sex.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Type */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <select defaultValue={goatSelected === null ? '' : goatSelected.livestockTypes} onChange={(e) => setGoatType(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {livestockTypes.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Kategori Umur */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <select defaultValue={goatSelected === null ? '' : goatSelected.type} onChange={(e) => setGoatType(e.target.value)} className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {types.map((element) =>
              (
                <option>
                  {element}
                </option>
              )
              )}
            </select>
          </div>
          {/* Weight and Time */}
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Berat per Waktu</p>
            <div className='flex flex-row justify-between items-center space-x-2'>
              <input type='number' defaultValue={goatSelected === null ? '' : goatSelected.weight} onChange={(e) => setGoatWeight(e.target.value)} placeholder='Berat (kg)' className='w-full border border-gray-200 rounded-md outline-none p-2' />
              <p>kg</p>
              <p>/</p>
              <input type='number' defaultValue={goatSelected === null ? '' : goatSelected.time} onChange={(e) => setGoatTime(e.target.value)} placeholder='Waktu (bulan)' className='w-full border border-gray-200 rounded-md outline-none p-2' />
              <p>bulan</p>
            </div>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setEditGoatModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => editGoat()}>Ubah</button>
          </div>
        </div>

      </Modal>

      {/* Detail Goat Modal */}
      <Modal
        isOpen={detailGoatModal}
        onRequestClose={() => {
          resetForm();
          setDetailGoatModal(false);
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
          <img src={goatSelected === null ? '' : goatSelected.image} alt='/' className='self-center rounded-lg w-[160px] h-[160px] mb-4' />
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Kambing</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{goatSelected === null ? '' : goatSelected.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{goatSelected === null ? '' : goatSelected.livestockTypes}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kategori Umur</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{goatSelected === null ? '' : goatSelected.type}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Berat per Waktu</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{goatSelected === null ? '' : goatSelected.weight} kg / {goatSelected === null ? '' : goatSelected.time} Bulan</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kelamin</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{goatSelected === null ? '' : goatSelected.sex}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='w-full border border-gray-200 rounded-md text-[#EA341B] font-medium p-2'>Rp. {goatSelected === null ? 0 : format.format(goatSelected.price).replaceAll(',', '.')}</p>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setDetailGoatModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteGoatModal}
        onRequestClose={() => setDeleteGoatModal(false)}
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
            zIndex: '10',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333] '>Konfirmasi</h1>
          <p className='flex-1 text-base font-medium text-[#b31818]'>Apakah anda yakin ingin menghapus <span className='font-bold'>{goatSelected === null ? '' : goatSelected.name}</span>?</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='border border-[#b31818] px-4 py-2 rounded-lg text-[#b31818] font-semibold text-base' onClick={() => setDeleteGoatModal(false)}>Batal</button>
            <button className='bg-[#b31818] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => deleteGoat()}>Hapus</button>
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

export default Goat;