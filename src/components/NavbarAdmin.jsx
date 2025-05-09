import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import SignOutPicture from '../assets/signout.png';

const NavbarAdmin = () => {
  const path = window.location.pathname;
  const [userName, setUserName] = useState(localStorage.getItem('name'));
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  }

  return (
    <div className='fixed w-full h-[60px] top-0 px-8 pt-1 pb-1 mt-0 flex flex-row justify-between bg-gray-800 items-center z-10 shadow-md'>

      <div onClick={() => navigate('/admin')} class="flex flex-shrink w-1/3 justify-start text-white text-3xl font-semibold cursor-pointer">
        <h1>QEMAFARM</h1>
      </div>

      <div class="flex py-2 content-center justify-end">
        <ul class="list-reset justify-between flex items-center">
          <li class="mr-12">
            <button onClick={() => navigate('/profil_admin')} class="inline-block py-2 px-4 text-white font-semibold text-xl">Halo, {localStorage.getItem('name') === null ? '' : localStorage.getItem('name').split(' ')[0]}</button>
          </li>
          <li class="mr-3">
            <button onClick={() => doSignOut()} class="inline-block text-white rounded-lg bg-[#EA341B] hover:bg-[#E24631] py-2 px-4">Logout</button>
          </li>
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

export default NavbarAdmin;