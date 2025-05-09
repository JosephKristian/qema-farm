import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import SignOutPicture from '../assets/signout.png';

const Sidebar = () => {
  const path = window.location.pathname;
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  }

  return (
    <div className='bg-gray-800 flex flex-col w-48 min-h-screen shadow-md overflow-auto'>
      <div className='flex-1 flex flex-col items-stretch mt-[60px] pt-8 pb-4'>
        <ul className='flex flex-col py-4 space-y-2 flex-1'>
          <li className={path.includes('/admin') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/admin')}>Dasbor</li>
          <li className={path.includes('/pengguna') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/pengguna')}>Pengguna</li>
          <li className={path.includes('/kambing') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/kambing')}>Kambing</li>
          <li className={path.includes('/pakan') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/pakan')}>Pakan</li>
          <li className={path.includes('/perawatan') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/perawatan')}>Perawatan</li>
          <li className={path.includes('/paket') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/paket')}>Paket</li>
          <li className={path.includes('/transaksi') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/transaksi')}>Transaksi</li>
          <li className={path.includes('/trans_paket') ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out' : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'} onClick={() => navigate('/trans_paket')}>Transaksi Paket</li>
        </ul>
        <ul className='pt-12'>
          <li className='px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]' onClick={() => navigate('/')}>Halaman Pengguna</li>
        </ul>
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
            borderRadius: '16px',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
          }
        }} >

        <div className='bg-transparent rounded-xl p-4 text-black flex flex-col items-center justify-between space-y-6'>
          <img src={SignOutPicture} alt='/' />
          <h1 className='text-black text-3xl font-extrabold'>Apakah Kamu Yakin Akan Keluar?</h1>
          <button onClick={() => doSignOut()} className='text-white text-sm font-normal bg-[#EA341B] py-4 px-8 rounded-[10px]'>Keluar</button>
        </div>

      </Modal>
    </div>
  );
}

export default Sidebar;