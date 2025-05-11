import React, { useState, useReducer, useEffect, useRef } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { maintenanceReducer } from '../../config/Reducer';
import { addNewMaintenance, editTheMaintenance, getAllMaintenance, removeMaintenance } from '../../functions/Database';
import { saveMaintenanceImage } from '../../functions/Storage';
import { useNavigate } from 'react-router-dom';

const Maintenance = () => {
  let index = 0;
  const [state, dispatch] = useReducer(maintenanceReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [addMaintenanceModal, setAddMaintenanceModal] = useState(false);
  const [editMaintenanceModal, setEditMaintenanceModal] = useState(false);
  const [detailMaintenanceModal, setDetailMaintenanceModal] = useState(false);
  const [deleteMaintenanceModal, setDeleteMaintenanceModal] = useState(false);
  const [maintenanceSelected, setMaintenanceSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [maintenanceName, setMaintenanceName] = useState('');
  const [maintenanceDescription, setMaintenanceDescription] = useState('');
  const [maintenanceImage, setMaintenanceImage] = useState({});
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllMaintenance();
    return () => { }
  }, [])

  useEffect(() => {
    setMaintenanceName(prev => maintenanceSelected === null ? '' : maintenanceSelected.name);
    setMaintenanceDescription(prev => maintenanceSelected === null ? '' : maintenanceSelected.description);
    return () => { }
  }, [maintenanceSelected])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const resetForm = () => {
    setMaintenanceName('');
    setMaintenanceDescription('');
    setMaintenanceImage({});
    setMaintenanceSelected(null);
  }

  const retrieveAllMaintenance = async () => {
    try {
      await getAllMaintenance().then(
        (resolve) => {
          dispatch({
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

  const addMaintenance = async () => {
    try {
      if (validation()) {
        setLoading(true);
        const maintenanceImageName = new Date().getTime();
        await saveMaintenanceImage(maintenanceImageName, maintenanceImage).then(
          async (resolve) => {
            const data = {
              name: maintenanceName,
              description: maintenanceDescription,
              image: resolve,
              created_at: maintenanceImageName,
            };
            await addNewMaintenance(data).then(
              async (resolve) => {
                await retrieveAllMaintenance();
                setAddMaintenanceModal(false);
                resetForm();
              },
              (reject) => {
                console.log(reject);
                throw reject;
              }
            );
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

  const editMaintenance = async () => {
    try {
      if (validationForEdit()) {
        setLoading(true);
        await editTheMaintenance(maintenanceSelected.uid, {
          name: maintenanceName,
          description: maintenanceDescription,
          image: maintenanceSelected.image,
          created_at: maintenanceSelected.created_at,
        }).then(
          async (resolve) => {
            await retrieveAllMaintenance();
            setEditMaintenanceModal(false);
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
    if (maintenanceName.length < 1) {
      return false;
    } else if (maintenanceDescription.length < 1) {
      return false;
    } else if (maintenanceImage.name === undefined || maintenanceImage.name === null) {
      return false;
    }
    return true;
  }

  const validationForEdit = () => {
    if (maintenanceName.length < 1) {
      return false;
    } else if (maintenanceDescription.length < 1) {
      return false;
    }
    return true;
  }

  const deleteMaintenance = async () => {
    try {
      setLoading(true);
      console.log(maintenanceSelected);
      await removeMaintenance(maintenanceSelected.uid).then(
        async (resolve) => {
          await retrieveAllMaintenance();
          setDeleteMaintenanceModal(false);
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
              onClick={() => setAddMaintenanceModal(true)}
              className='bg-[#145412] text-white font-medium text-base sm:text-lg rounded-md px-4 py-2 w-full sm:w-auto'
            >
              Tambah
            </button>
            <input
              type='text'
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Cari Perawatan'
              className='w-full sm:w-96 border border-gray-200 rounded-md outline-none p-2 text-sm sm:text-base'
            />
          </div>

          {/* Tabel Container */}
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[700px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className='text-white text-xs sm:text-sm md:text-base'>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Perawatan</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  state.filter(e => e.name.toLowerCase().includes(search.toLowerCase().trim())).map((element, index) => (
                    <tr key={element.uid} className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}>
                      <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.name}</td>
                      <td className='border border-slate-200 p-2'>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                          <button
                            onClick={() => {
                              setMaintenanceSelected(element);
                              setDetailMaintenanceModal(true);
                            }}
                            className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2 w-full sm:w-auto text-xs sm:text-sm'
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              setMaintenanceSelected(element);
                              setEditMaintenanceModal(true);
                            }}
                            className='bg-[#145412] rounded-lg text-white px-4 py-2 w-full sm:w-auto text-xs sm:text-sm'
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => {
                              setMaintenanceSelected(element);
                              setDeleteMaintenanceModal(true);
                            }}
                            className='bg-[#b31818] rounded-lg text-white px-4 py-2 w-full sm:w-auto text-xs sm:text-sm'
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

      {/* Add Maintenance Modal */}
      <Modal
        isOpen={addMaintenanceModal}
        onRequestClose={() => {
          resetForm();
          setAddMaintenanceModal(false);
        }}
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
            zIndex: '20'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {
            maintenanceImage.name === undefined || maintenanceImage.name === null
              ? (
                <button onClick={() => imageRef.current.click()} className='flex items-center justify-center self-center rounded-lg w-[160px] h-[160px] mb-4 border border-gray-800 text-gray-800 text-lg font-medium'>
                  Tambah Foto
                </button>
              )
              : <img onClick={() => imageRef.current.click()} src={URL.createObjectURL(maintenanceImage)} alt='/' className='self-center rounded-lg w-[160px] h-[160px] mb-4' />
          }
          <input type='file' ref={imageRef} multiple={false} onChange={(e) => {
            console.log(URL.createObjectURL(e.target.files[0]));
            if (e.target.files && e.target.files[0] && e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png') setMaintenanceImage(e.target.files[0]);
          }} className='hidden' />
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Perawatan <span className='text-red-600'>*</span></p>
            <input type='text' defaultValue='' onChange={(e) => setMaintenanceName(e.target.value)} placeholder='Nama Perawatan' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi <span className='text-red-600'>*</span></p>
            <textarea defaultValue='' onChange={(e) => setMaintenanceDescription(e.target.value)} placeholder='Deskripsi Perawatan' rows={4} className='w-full border border-gray-200 rounded-md outline-none p-2'></textarea>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setAddMaintenanceModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => addMaintenance()}>Tambah</button>
          </div>
        </div>

      </Modal>

      {/* Edit Maintenance Modal */}
      <Modal
        isOpen={editMaintenanceModal}
        onRequestClose={() => {
          resetForm();
          setEditMaintenanceModal(false);
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
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Perawatan <span className='text-red-600'>*</span></p>
            <input type='text' defaultValue={maintenanceSelected === null ? '' : maintenanceSelected.name} onChange={(e) => setMaintenanceName(e.target.value)} placeholder='Nama Perawatan' className='w-full border border-gray-200 rounded-md outline-none p-2' />
          </div>
          <div className='flex flex-col justify-between items-start space-y-2'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi <span className='text-red-600'>*</span></p>
            <textarea defaultValue={maintenanceSelected === null ? '' : maintenanceSelected.description} onChange={(e) => setMaintenanceDescription(e.target.value)} placeholder='Deskripsi Perawatan' rows={4} className='w-full border border-gray-200 rounded-md outline-none p-2'></textarea>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='border border-[#145412] px-4 py-2 rounded-lg text-[#145412] font-semibold text-base' onClick={() => {
              resetForm();
              setEditMaintenanceModal(false);
            }}>Batal</button>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => editMaintenance()}>Ubah</button>
          </div>
        </div>

      </Modal>

      {/* Detail Maintenance Modal */}
      <Modal
        isOpen={detailMaintenanceModal}
        onRequestClose={() => {
          resetForm();
          setDetailMaintenanceModal(false);
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
          <img src={maintenanceSelected === null ? '' : maintenanceSelected.image} alt='/' className='self-center rounded-lg w-[160px] h-[160px] mb-4' />
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Perawatan</p>
            <p className='w-full border border-gray-200 rounded-md outline-none p-2'>{maintenanceSelected === null ? '' : maintenanceSelected.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi</p>
            <div className='w-full border border-gray-200 rounded-md outline-none p-2'>
              {maintenanceSelected === null ? '' : maintenanceSelected.description}
            </div>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setDetailMaintenanceModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteMaintenanceModal}
        onRequestClose={() => setDeleteMaintenanceModal(false)}
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
          <p className='flex-1 text-base font-medium text-[#b31818]'>Apakah anda yakin ingin menghapus <span className='font-bold'>{maintenanceSelected === null ? '' : maintenanceSelected.name}</span>?</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='border border-[#b31818] px-4 py-2 rounded-lg text-[#b31818] font-semibold text-base' onClick={() => setDeleteMaintenanceModal(false)}>Batal</button>
            <button className='bg-[#b31818] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => deleteMaintenance()}>Hapus</button>
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

export default Maintenance;