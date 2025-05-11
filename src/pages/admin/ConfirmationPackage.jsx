import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Loading from '../../components/Loading';
import { confirmPackage, getPackageTransaction, getUserData } from '../../functions/Database';
import Navbar from '../../components/Navbar';

const ConfirmationPackage = () => {
  const [packageData, setPackageData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { thepackage } = useParams();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrievePackage();
    return () => { }
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const retrievePackage = async () => {
    try {
      setLoading(true);
      await getPackageTransaction(thepackage).then(
        async (resolve) => {
          setPackageData(resolve);
          console.log(resolve)
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
      await confirmPackage(thepackage, packageData).then(
        (resolve) => {
          showTheModal('Sukses!', 'Paket telah dikonfirmasi!');
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

      <div className='flex justify-center items-center px-4 py-6'>
  <div className='bg-transparent rounded-xl p-4 w-full max-w-md text-black flex flex-col justify-between space-y-4'>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Konsumen</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{userData === null ? '' : userData.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{packageData === null ? '' : packageData.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Detail Paket</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{packageData === null ? '' : packageData.description}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Kambing</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{packageData === null ? '' : packageData.goat.name} {packageData === null ? '' : packageData.goat.sex} ({packageData === null ? '' : packageData.goat.type})</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Pakan</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{packageData === null ? '' : packageData.food.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Perawatan</p>
            <p className='w-full border border-gray-200 rounded-md p-2'>{packageData === null ? '' : packageData.maintenance.name}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='w-full border border-gray-200 rounded-md text-[#EA341B] font-medium p-2'>Rp. {packageData === null ? '0' : packageData.price.toLocaleString().replaceAll(',', '.')}</p>
          </div>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga Diskon</p>
            <p className='w-full border border-gray-200 rounded-md text-[#EA341B] font-medium p-2'>Rp. {packageData === null ? '0' : packageData.discount_price.toLocaleString().replaceAll(',', '.')}</p>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => confirmOrder()}>Konfirmasi</button>
          </div>
        </div>
      </div>

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
            padding: 0,
            border: 'none',
            background: 'transparent',
          },
          overlay: {
            backgroundColor: '#000000CC',
            zIndex: 100,
          }
        }}
      >

      <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
        <h1 className='text-xl font-bold text-[#333333] '>{title}</h1>
        <p className='flex-1 text-base font-medium text-[#145412]'>{description}</p>
        <div className='flex flex-row justify-end items-center space-x-4'>
          <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setVisibleModal(false)}>Oke, Siap</button>
        </div>
      </div>

    </Modal>

      {/* Loading */ }
  <Loading show={loading} />

    </div >
  );
}

export default ConfirmationPackage;