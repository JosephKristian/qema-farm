import React, { useState, useReducer, useEffect } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { packageTransactionReducer } from '../../config/Reducer';
import { getAllPackageTransaction, getUserData } from '../../functions/Database';
// import NoAvatar from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const PackageTransaction = () => {
  const format = Intl.NumberFormat();
  let index = 0;
  const [state, dispatch] = useReducer(packageTransactionReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [packageModal, setPackageModal] = useState(false);
  const [packageSelected, setPackageSelected] = useState({});
  const [packageUser, setPackageUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllPackageTransaction();
    return () => { }
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const getUser = async (uid) => {
    try {
      setLoading(true);
      await getUserData(uid).then(
        (resolve) => {
          setPackageUser(resolve);
          setPackageModal(true);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const retrieveAllPackageTransaction = async () => {
    try {
      await getAllPackageTransaction().then(
        (resolve) => {
          dispatch({
            type: 'retrieve_package_transaction',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
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
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[800px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className='text-white text-xs sm:text-sm md:text-base'>
                  <th className='bg-gray-600 border border-white py-4 px-2'>No. Paket</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Paket</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Harga</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Status</th>
                  <th className='bg-gray-600 border border-white py-4 px-2'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  state.map((element, index) => (
                    <tr key={element.uid} className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}>
                      <td className='border border-slate-200 p-2 text-[#333333]'>{element.key}</td>
                      <td className='border border-slate-200 p-2 text-[#333333] capitalize'>{element.name}</td>
                      <td className='border border-slate-200 p-2 text-[#EA341B] capitalize'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                          <span className={element.discount_price != null ? 'line-through text-[#333333] font-normal' : 'text-[#EA341B] text-sm font-medium'}>
                            Rp. {format.format(element.price).replaceAll(',', '.')}
                          </span>
                          {element.discount_price != null && (
                            <span className='text-[#EA341B] text-base font-semibold'>
                              {format.format(element.discount_price).replaceAll(',', '.')}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className='border border-slate-200 p-2 text-[#333333] capitalize'>
                        {element.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}
                      </td>
                      <td className='border border-slate-200 p-2'>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                          <button
                            onClick={() => {
                              console.log(element);
                              getUser(element.user);
                              setPackageSelected(element);
                            }}
                            className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2 text-xs sm:text-sm'
                          >
                            Detail
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

      {/* Detail Package Modal */}
      <Modal
        isOpen={packageModal}
        onRequestClose={() => setPackageModal(false)}
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
            zIndex: '100'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* Transaction ID */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>No. Transaksi</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.key}</p>
          </div>
          {/* Customer Name */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Konsumen</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageUser ? packageUser.name : ''}</p>
          </div>
          {/* Package Name */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.name ? packageSelected.name : ''}</p>
          </div>
          {/* Package Desciption */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi Paket</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.description ? packageSelected.description : ''}</p>
          </div>
          {/* Package Price */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='text-base font-medium text-[#145412] flex-1'>Rp. <span className={packageSelected.discount_price != null ? 'line-through text-[#333333] font-normal' : 'text-[#145412] text-sm font-medium'}>{format.format(packageSelected.price).replaceAll(',', '.')}</span> <span className='text-[#145412] text-base font-semibold'>{packageSelected.discount_price != null ? format.format(packageSelected.discount_price).replaceAll(',', '.') : ''}</span></p>
          </div>
          {/* Package Status */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Status</p>
            <p className={packageSelected.confirmed ? 'text-base font-medium text-[#145412] flex-1' : 'text-base font-medium text-[#EA341B] flex-1'}>{packageSelected.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}</p>
          </div>
          {/* Button */}
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            {packageSelected.confirmed ? <div></div> : <button onClick={() => navigate(`/confirmation_package/${packageSelected.key}`)} className='bg-[#145412] hover:bg-[#0f410d] rounded-lg text-white px-4 py-2'>Konfirmasi</button>}
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setPackageModal(false)}>Oke</button>
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

export default PackageTransaction;