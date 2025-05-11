import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { signOutUser } from '../functions/Auth';
import Logo from '../assets/logo.png';
import SignOutPicture from '../assets/signout.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    setUserName(name);
  }, []);

  const doSignOut = () => {
    localStorage.clear();
    signOutUser();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsPortfolioOpen(false);
  };

  const renderButton = () => {
    if (!localStorage.getItem('uid')) {
      return (
        <div className="flex sm:space-x-4 space-x-2 mt-4 sm:mt-0">
          <button
            className="text-[#ADADAD] font-medium text-base sm:text-lg py-2 px-4 sm:px-8 rounded-lg"
            onClick={() => handleNavigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-[#145412] text-white font-medium text-base sm:text-lg py-2 px-4 sm:px-8 rounded-lg"
            onClick={() => handleNavigate('/register')}
          >
            Daftar
          </button>
        </div>
      );
    }

    return (
      <div className="flex sm:space-x-4 space-x-2 mt-4 sm:mt-0">
        <button
          onClick={() => handleNavigate('/profil')}
          className="py-2 px-4 sm:px-8 text-[#ADADAD] text-sm sm:text-lg"
        >
          Halo, <span className="text-[#145412]">{userName.split(' ')[0]}</span>
        </button>
        <button
          className="bg-[#EA341B] text-white font-medium text-sm sm:text-lg py-2 px-4 sm:px-8 rounded-lg"
          onClick={() => setVisibleModal(true)}
        >
          Keluar
        </button>
      </div>
    );
  };

  const path = window.location.pathname;

  return (
    <nav className="w-full bg-[#FCFCFC] shadow-md z-50 fixed top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[90px] flex justify-between items-center">
        {/* Logo */}
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-16 sm:w-20 h-auto cursor-pointer"
            onClick={() => handleNavigate('/')}
          />
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsPortfolioOpen(false);
            }}
            aria-label="Toggle menu"
            className="text-2xl text-[#145412]"
          >
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row absolute sm:static top-[90px] left-0 w-full sm:w-auto bg-[#FCFCFC] sm:bg-transparent z-40 sm:z-auto px-4 sm:px-0 py-4 sm:py-0 space-y-4 sm:space-y-0 sm:space-x-8`}
        >
          <li
            className={`font-semibold text-base sm:text-lg cursor-pointer ${
              path.includes('/investasi') ? 'text-[#218A1F]' : 'text-[#ADADAD]'
            }`}
            onClick={() => handleNavigate('/investasi')}
          >
            Investasi
          </li>

          {/* Dropdown Portofolio */}
          <li className="relative">
            <button
              className={`font-semibold text-base sm:text-lg cursor-pointer ${
                path.includes('/portofolio') ? 'text-[#218A1F]' : 'text-[#ADADAD]'
              }`}
              onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
            >
              Portofolio ▾
            </button>
            {isPortfolioOpen && (
              <ul className="absolute sm:absolute bg-white rounded shadow-md mt-2 py-2 w-[180px] z-50">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNavigate('/portofolio')}
                >
                  Detail Portofolio
                </li>
              </ul>
            )}
          </li>

          <li
            className={`font-semibold text-base sm:text-lg cursor-pointer ${
              path.includes('/breeding') ? 'text-[#218A1F]' : 'text-[#ADADAD]'
            }`}
            onClick={() => handleNavigate('/breeding')}
          >
            Breeding
          </li>

          {/* Tombol login/logout */}
          <li className="sm:hidden">{renderButton()}</li>
        </ul>

        {/* Desktop login/logout */}
        <div className="hidden sm:block">{renderButton()}</div>
      </div>

      {/* Modal Logout */}
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
            padding: '20px',
          },
          overlay: {
            backgroundColor: '#000000CC',
            zIndex: 30,
          },
        }}
      >
        <div className="bg-transparent rounded-xl p-4 text-black flex flex-col items-center justify-between space-y-6">
          <img src={SignOutPicture} alt="signout" />
          <h1 className="text-black text-3xl font-extrabold text-center">Apakah Kamu Yakin Akan Keluar?</h1>
          <button
            onClick={doSignOut}
            className="text-white text-sm font-normal bg-[#EA341B] py-4 px-8 rounded-[10px]"
          >
            Keluar
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
