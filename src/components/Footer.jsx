import React from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaMailchimp,
  FaMailBulk,
  FaRegEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F1FAE9] min-h-[300px] pt-6 sm:pt-12 pb-16 px-6 sm:px-12 relative">

      {/* Wrapper content */}
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col lg:space-x-8 space-y-8">
        
        {/* Left section */}
        <div className="flex-[3] flex sm:flex-row flex-col items-center text-center sm:text-left">
          <img src={Logo} alt="Logo" className="sm:h-44 h-32" />
          <p className="text-[#333333] font-medium text-sm sm:mx-4 mx-1 mt-4 sm:mt-0">
            Qema farm adalah sebuah website bisnis yang berfokus pada peternakan hewan kambing, domba dan sapi. Yang mana di dalamnya terdapat beberapa fitur sebagai media informasi dan media bisnis. Tujuan utama website ini adalah berbisnis kambing tanpa harus memiliki skill beternak dan lahan sebagai media perawatan, atau nama lainnya berinvestasi pada sektor rill di bidang peternakan.
          </p>
        </div>

        {/* Middle section */}
        <div className="flex-[2] flex flex-col lg:flex-row items-start justify-around lg:space-x-12 space-y-4 lg:space-y-0">
          <div className="flex flex-col">
            <h6 className="text-[#145412] text-xl font-bold mb-6">Jasa Kami</h6>
            <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/investasi')}>Investasi</p>
            <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/portofolio')}>Portofolio</p>
            <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/breeding')}>Breeding</p>
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#145412] text-xl font-bold mb-6">Fitur Lain</h6>
            <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/')}>Home</p>
            <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/profil')}>Profile</p>
            {localStorage.getItem('role') === 'admin' && (
              <p className="text-[#145412] text-xl font-medium mb-4 cursor-pointer" onClick={() => navigate('/admin')}>Admin Panel</p>
            )}
          </div>
        </div>
      </div>

      {/* Social icons bottom-right aligned to padding */}
      <div className="absolute bottom-6 right-6 sm:right-12 flex gap-4">
        <a
          href="https://www.instagram.com/qemafarm?igsh=OTgzZ2p5Ynh4cWU4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} color="#333333" className="cursor-pointer" />
        </a>
        <a
          href="https://wa.me/6282143190730"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={24} color="#333333" className="cursor-pointer" />
        </a>
        <a
          href="mailto:Usamah.husain@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRegEnvelope size={24} color="#333333" className="cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
