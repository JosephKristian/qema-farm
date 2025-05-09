import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Loading from '../../components/Loading';
import { confirmTransaction, getTransaction, getUserData } from '../../functions/Database';
import Navbar from '../../components/Navbar';

const Confirmation = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { transaction } = useParams();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveTransaction();
    return () => {}
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const retrieveTransaction = async () => {
    try {
      setLoading(true);
      await getTransaction(transaction).then(
        async (resolve) => {
          console.log(resolve)
          setTransactionData(resolve);
          await getUserData(resolve.user).then(
            (resolve) => {
              setUserData(resolve);
            },
            (reject) => { throw reject; }
          )
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const confirmOrder = async () => {
    try {
      setLoading(true);
      await confirmTransaction(transaction, transactionData).then(
        (resolve) => {
          showTheModal('Sukses!', 'Transaksi telah dikonfirmasi!');
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
      <Navbar />

      <div className='flex justify-center items-center'>
        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Konsumen</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{userData === null ? '' : userData.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Kambing</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '' : transactionData.goat.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '' : transactionData.goat.type}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Berat per Waktu</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '0' : transactionData.goat.weight} kg / {transactionData === null ? '0' : transactionData.goat.time} Bulan</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Jenis Kelamin</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '' : transactionData.goat.sex}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='w-full border border-gray-200 rounded-md text-[#EA341B] font-medium p-2'>Rp. {transactionData === null ? '0' : transactionData.goat.price.toLocaleString().replaceAll(',', '.')}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '' : transactionData.food.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{transactionData === null ? '' : transactionData.maintenance.name}</p>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => confirmOrder()}>Konfirmasi</button>
          </div>
        </div>
      </div>

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

      {/* Loading */}
      <Loading show={loading} />

    </div>
  );
}

export default Confirmation;