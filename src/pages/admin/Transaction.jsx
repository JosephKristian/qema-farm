import React, { useState, useReducer, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { transactionReducer } from '../../config/Reducer';
import { getAllTransaction, getUserData, saveWeight } from '../../functions/Database';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

Modal.setAppElement('#root');

const Transaction = () => {
  const [state, dispatch] = useReducer(transactionReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState({});
  const [transactionUser, setTransactionUser] = useState(null);
  const [goatOwner, setGoatOwner] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState([]);
  const navigate = useNavigate();

  const modalStyle = useMemo(() => ({
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: '#000000CC',
      zIndex: '100'
    }
  }), []);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllTransaction();
  }, []);

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  };

  const getUsers = async (buyerUID, ownerUID) => {
    try {
      setLoading(true);
      const buyer = buyerUID ? await getUserData(buyerUID) : null;
      const owner = ownerUID ? await getUserData(ownerUID) : null;
      setTransactionUser(buyer);
      setGoatOwner(owner);
      setTransactionModal(true);
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  };

  const retrieveAllTransaction = async () => {
    try {
      const transactions = await getAllTransaction();

      // Ambil data user per transaksi dan tambahkan ke transaksi
      const transactionsWithUserData = await Promise.all(
        transactions.map(async (tx) => {
          const userData = await getUserData(tx.user);
          return {
            ...tx,
            userData, // simpan data user lengkap di properti userData
          };
        })
      );

      // Urutkan berdasarkan created_at timestamp
      const sortedTransactions = transactionsWithUserData.sort((a, b) => b.created_at - a.created_at);

      dispatch({
        type: 'retrieve_transaction',
        data: [...sortedTransactions],
      });
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  };


  return (
    <div>
      <NavbarAdmin />
      <div className='flex flex-row justify-start'>
        <Sidebar />
        <div className='flex-1 flex flex-col items-center space-y-4 px-4 sm:px-6 md:px-10 my-[90px] overflow-y-auto'>
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[1000px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className="text-white text-xs sm:text-sm md:text-base">
                  <th className="bg-gray-600 border border-white py-4 px-2">No. Transaksi</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Tanggal Dibuat</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Tanggal Konfirmasi</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Nama Pemilik</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Kambing</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Jenis</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Pakan</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Perawatan</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Harga</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Status</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Aksi</th>
                  <th className="bg-gray-600 border border-white py-4 px-2">Berat Live (kg)</th>
                </tr>
              </thead>
              <tbody>
                {state.map((element, index) => (
                  <tr
                    key={`${element.uid}-${index}`}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}
                  >
                    <td className="border border-slate-200 p-2 text-[#333333] max-w-[160px] truncate" title={element.uid}>
                      {element.uid}
                    </td>
                    <td className="border border-slate-200 p-2 text-[#333333]">
                      {element.created_at
                        ? new Date(element.created_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>
                    <td className="border border-slate-200 p-2 text-[#333333]">
                      {element.confirmed_at
                        ? new Date(element.confirmed_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">
                      {element.userData?.name || ''}
                    </td>
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">{element.goat?.name || ''}</td>
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">{element.goat?.type || ''}</td>
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">{element.food?.name || ''}</td>
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">{element.maintenance?.name || ''}</td>
                    <td className="border border-slate-200 p-2 text-[#EA341B] font-medium capitalize">
                      Rp. {element.goat?.price?.toLocaleString().replaceAll(',', '.') || '0'}
                    </td>
                    <td className="border border-slate-200 p-2 text-center">{element.weight || '-'} kg </td>
                    <td className="border border-slate-200 p-2 text-center">
                      {element.confirmed ? (
                        <span role="img" aria-label="confirmed" className="text-green-600 text-xl">✔️</span>
                      ) : (
                        <span role="img" aria-label="pending" className="text-yellow-500 text-xl">⏳</span>
                      )}
                    </td>
                    <td className="border border-slate-200 p-2">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => {
                            getUsers(null, element.user);
                            setTransactionSelected(element);
                          }}
                          className="bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2 text-xs sm:text-sm"
                        >
                          Detail
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          placeholder="Berat (kg)"
                          className="border border-gray-300 rounded px-2 py-1 text-xs w-16"
                        />

                        <button
                          onClick={async () => {
                            await saveWeight(element.uid, weights[index]);
                            await retrieveAllTransaction();
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Simpan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Transaction Modal */}
      <Modal
        isOpen={transactionModal}
        onRequestClose={() => setTransactionModal(false)}
        style={modalStyle}
      >
        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>No. Transaksi</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.uid}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pemilik Kambing</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{goatOwner?.name || '-'}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kambing</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.goat?.name || ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.goat?.livestockTypes || ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kategori Umur</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.goat?.type || ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.food?.name || ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{transactionSelected.maintenance?.name || ''}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='text-base font-medium text-[#145412] flex-1'>Rp. {transactionSelected.goat?.price?.toLocaleString().replaceAll(',', '.') || '0'}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Status</p>
            <p className={transactionSelected.confirmed ? 'text-base font-medium text-[#145412] flex-1' : 'text-base font-medium text-[#EA341B] flex-1'}>
              {transactionSelected.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}
            </p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Tanggal Dibuat</p>
            <p className='text-base font-medium text-[#145412] flex-1'>
              {transactionSelected.created_at ? new Date(transactionSelected.created_at).toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }) : '-'}
            </p>
          </div>
          {transactionSelected.confirmed && (
            <div className='flex flex-row justify-between items-center space-x-8'>
              <p className='text-base font-medium text-[#333333] flex-1'>Tanggal Konfirmasi</p>
              <p className='text-base font-medium text-[#145412] flex-1'>
                {new Date(transactionSelected.confirmed_at).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            {!transactionSelected.confirmed &&
              <button
                onClick={() => navigate(`/confirmation/${transactionSelected.uid}`)}
                className='bg-[#145412] hover:bg-[#0f410d] rounded-lg text-white px-4 py-2'>
                Konfirmasi
              </button>
            }
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setTransactionModal(false)}>Oke</button>
          </div>
        </div>
      </Modal>

      <Loading show={loading} />

      <Modal
        isOpen={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        style={modalStyle}
      >
        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333]'>{title}</h1>
          <p className='flex-1 text-base font-medium text-[#145412]'>{description}</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setVisibleModal(false)}>Oke, Siap</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Transaction;
