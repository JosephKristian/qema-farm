import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import SignOutPicture from '../assets/signout.png';

const NavbarAdmin = () => {
  const path = window.location.pathname;
  const [userName, setUserName] = useState(localStorage.getItem('name'));
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('name'));
  }, [localStorage.getItem('name')]);

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  };

  const displayName = userName ? userName.split(' ')[0] : '';

  return (
    <div className="fixed w-full h-auto min-h-[60px] top-0 px-4 md:px-8 py-2 flex flex-col md:flex-row md:justify-between bg-gray-800 items-center z-10 shadow-md space-y-2 md:space-y-0">
      {/* Logo */}
      <div
        onClick={() => navigate('/admin')}
        className="w-full md:w-1/3 text-white text-2xl sm:text-3xl font-semibold cursor-pointer text-center md:text-left"
      >
        QEMA FARM
      </div>

      {/* Info + Tombol */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-2 sm:space-y-0 sm:space-x-6">
        <button
          onClick={() => navigate('/profil_admin')}
          className="text-white font-semibold text-base sm:text-xl"
        >
          Halo, {displayName}
        </button>
        <button
          onClick={() => setVisibleModal(true)}
          className="text-white text-sm sm:text-base rounded-lg bg-[#EA341B] hover:bg-[#E24631] py-2 px-4"
        >
          Logout
        </button>
      </div>

      {/* Modal Konfirmasi Logout */}
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
            backgroundColor: '#000000CC',
          },
        }}
      >
        <div className="bg-transparent rounded-xl p-4 text-black flex flex-col items-center justify-between space-y-6">
          <img src={SignOutPicture} alt="signout" className="w-24 h-24 object-contain" />
          <h1 className="text-black text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
            Apakah Kamu Yakin Akan Keluar?
          </h1>
          <button
            onClick={doSignOut}
            className="text-white text-sm font-normal bg-[#EA341B] py-3 px-6 sm:py-4 sm:px-8 rounded-[10px]"
          >
            Keluar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NavbarAdmin;
