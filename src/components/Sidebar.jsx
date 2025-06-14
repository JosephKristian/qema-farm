import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import SignOutPicture from '../assets/signout.png';

const Sidebar = () => {
  const path = window.location.pathname;
  const [visibleModal, setVisibleModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dasbor', path: '/admin' },
    { label: 'Pengguna', path: '/pengguna' },
    { label: 'Kambing', path: '/kambing' },
    { label: 'Pakan', path: '/pakan' },
    { label: 'Perawatan', path: '/perawatan' },
    { label: 'Paket', path: '/paket' },
    { label: 'Transaksi', path: '/transaksi' },
    { label: 'Transaksi Paket', path: '/trans_paket' }
  ];

  const renderMenu = () => (
    <ul className="flex flex-col py-4 space-y-2 flex-1">
      {menuItems.map((item, idx) => (
        <li
          key={idx}
          className={
            path.includes(item.path)
              ? 'px-4 py-2 font-medium text-lg cursor-pointer bg-[#ffffff10] text-white duration-1000 ease-in-out'
              : 'px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]'
          }
          onClick={() => {
            navigate(item.path);
            setIsMobileSidebarOpen(false); // tutup sidebar di mobile
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );

  const renderSidebarContent = () => (
    <div className="flex flex-col w-48 min-h-screen bg-gray-800 shadow-md overflow-y-auto">
      <div className="flex-1 flex flex-col items-stretch mt-[60px] pt-8 pb-4">
        {renderMenu()}
        <ul className="pt-12">
          <li
            className="px-4 py-2 font-normal text-lg cursor-pointer text-gray-400 hover:bg-[#ffffff25]"
            onClick={() => {
              navigate('/');
              setIsMobileSidebarOpen(false);
            }}
          >
            Halaman Pengguna
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol toggle (hanya tampil di mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={() => setIsMobileSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar untuk desktop */}
      <div className="hidden md:flex">{renderSidebarContent()}</div>

      {/* Sidebar overlay untuk mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-64 bg-gray-800 min-h-screen shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSidebarContent()}
          </div>
          <div className="flex-1 bg-black bg-opacity-50" />
        </div>
      )}

      {/* Modal sign out */}
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
        }}
      >
        <div className="bg-transparent rounded-xl p-4 text-black flex flex-col items-center justify-between space-y-6">
          <img src={SignOutPicture} alt="signout" />
          <h1 className="text-black text-3xl font-extrabold">Apakah Kamu Yakin Akan Keluar?</h1>
          <button
            onClick={doSignOut}
            className="text-white text-sm font-normal bg-[#EA341B] py-4 px-8 rounded-[10px]"
          >
            Keluar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
