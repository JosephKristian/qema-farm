import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import Logo from '../assets/logo.png';
import SignOutPicture from '../assets/signout.png';

const Navbar = () => {
  const path = window.location.pathname;
  const [userName, setUserName] = useState(localStorage.getItem('name'));
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  }

  const renderButton = () => {
    if (localStorage.getItem('uid') === null || localStorage.getItem('uid').length < 1) {
      return (
        <div className='flex sm:space-x-4 space-x-1'>
          <button className='text-[#ADADAD] font-medium sm:text-lg text-base py-2 px-8 rounded-lg cursor-pointer' onClick={() => navigate('/login')}>
            Login
          </button>
          <button className='bg-[#145412] text-white font-medium sm:text-lg text-base py-2 px-8 rounded-lg cursor-pointer' onClick={() => navigate('/register')}>
              Daftar
          </button>
        </div>
      );
    }
    return (
      <div className='flex sm:space-x-4 space-x-1'>
        <button onClick={() => navigate('/profil')} className='bg-transparent py-2 px-8 text-[#ADADAD] text-xl font-normal'>
          Halo, <span className='text-[#145412] sm:text-xl text-base font-normal'>{ userName.split(' ')[0] }</span>
        </button>
        <button className='bg-[#EA341B] text-white font-medium sm:text-lg text-base py-2 px-8 rounded-lg cursor-pointer' onClick={() => setVisibleModal(true)}>
          Keluar
        </button>
      </div>
    );
  }

  return (
    <div className='w-full h-[90px] top-0 sm:px-8 px-4 flex flex-row sm:justify-between justify-end bg-[#FCFCFC] items-center z-50 shadow-md'>
      <img src={Logo} alt='/' className='hidden sm:inline w-20 h-20 cursor-pointer' onClick={() => navigate('/')} />
      <ul className='lg:flex hidden px-6 flex-1'>
        <li className={path.includes('/investasi') ? 'px-8 font-semibold text-lg cursor-pointer text-[#218A1F]' : 'px-8 font-semibold text-lg cursor-pointer text-[#ADADAD]'} onClick={() => navigate('/investasi')}>Investasi</li>
        <li className={path.includes('/portofolio') ? 'px-8 font-semibold text-lg cursor-pointer text-[#218A1F]' : 'px-8 font-semibold text-lg cursor-pointer text-[#ADADAD]'} onClick={() => navigate('/portofolio')}>Portofolio</li>
        <li className={path.includes('/breeding') ? 'px-8 font-semibold text-lg cursor-pointer text-[#218A1F]' : 'px-8 font-semibold text-lg cursor-pointer text-[#ADADAD]'} onClick={() => navigate('/breeding')}>Breeding</li>
      </ul>
      {renderButton()}

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
            zIndex: '30'
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

export default Navbar;