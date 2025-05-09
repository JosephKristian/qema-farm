import React, { useState, useReducer, useEffect } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { transactionReducer } from '../../config/Reducer';
import { getAllTransaction, getUserData } from '../../functions/Database';
// import NoAvatar from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const Transaction = () => {
  let index = 0;
  const [state, dispatch] = useReducer(transactionReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState({});
  const [transactionUser, setTransactionUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllTransaction();
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
          setTransactionUser(resolve);
          setTransactionModal(true);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const retrieveAllTransaction = async () => {
    try {
      await getAllTransaction().then(
        (resolve) => {
          dispatch({
            type: 'retrieve_transaction',
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
        <div className='flex-1 flex flex-col items-center space-y-4 px-10 my-[90px] overflow-y-auto'>
          {/* <input type='text' defaultValue={search} onChange={(e) => setSearch(e.target.value)} placeholder='Cari Nama Pengguna' className='w-96 border border-gray-200 rounded-md self-end outline-none p-2' /> */}
          <div className='py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md'>
            <table class="bg-white w-full table-fixed border-collapse bordertext-sm">
              <thead>
                <tr className='text-white text-lg'>
                  <th className='bg-gray-600 border border-white py-4'>No. Transaksi</th>
                  <th className='bg-gray-600 border border-white py-4'>Kambing</th>
                  <th className='bg-gray-600 border border-white py-4'>Jenis</th>
                  <th className='bg-gray-600 border border-white py-4'>Pakan</th>
                  <th className='bg-gray-600 border border-white py-4'>Perawatan</th>
                  <th className='bg-gray-600 border border-white py-4'>Harga</th>
                  <th className='bg-gray-600 border border-white py-4'>Status</th>
                  <th className='bg-gray-600 border border-white py-4'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  state.map(element => {
                    index++;
                    return (
                      <tr key={element.uid} className={(index % 2) === 0 ? 'text-base font-medium bg-gray-100' : 'text-base font-medium'}>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333]'>{element.uid}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333] capitalize'>{element.goat.name}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333] capitalize'>{element.goat.type}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333] capitalize'>{element.food.name}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333] capitalize'>{element.maintenance.name}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#EA341B] font-medium capitalize'>Rp. {element.goat.price.toLocaleString().replaceAll(',', '.')}</td>
                        <td className='border border-slate-200 overflow-auto p-2 text-[#333333] capitalize'>{element.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}</td>
                        <td className='flex flex-col space-y-4 items-start overflow-auto p-1'>
                          <button onClick={() => {
                            getUser(element.user);
                            setTransactionSelected(element);
                          }} className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2'>Detail</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Transaction Modal */}
      <Modal
        isOpen={transactionModal}
        onRequestClose={() => setTransactionModal(false)}
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
            zIndex: '100'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* <img src={transactionSelected.avatar === undefined || transactionSelected.avatar.length < 1 ? NoAvatar : transactionSelected.avatar} alt='/' className='self-center rounded-full w-[160px] h-[160px] mb-4' /> */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>No. Transaksi</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.uid}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Konsumen</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionUser ? transactionUser.name : ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kambing</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.goat ? transactionSelected.goat.name : ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.goat ? transactionSelected.goat.type : ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.food ? transactionSelected.food.name : ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.maintenance ? transactionSelected.maintenance.name : ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='text-base font-medium text-[#145412] flex-1'>Rp. {transactionSelected.goat ? transactionSelected.goat.price.toLocaleString().replaceAll(',', '.') : '0'}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Status</p>
            <p className={transactionSelected.confirmed ? 'text-base font-medium text-[#145412] flex-1' : 'text-base font-medium text-[#EA341B] flex-1'}>{transactionSelected.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}</p>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            {transactionSelected.confirmed ? <div></div> : <button onClick={() => navigate(`/confirmation/${transactionSelected.uid}`)} className='bg-[#145412] hover:bg-[#0f410d] rounded-lg text-white px-4 py-2'>Konfirmasi</button>}
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setTransactionModal(false)}>Oke</button>
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

export default Transaction;