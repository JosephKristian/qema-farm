import React from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaPinterestP,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F1FAE9] min-h-[300px] pb-8 sm:pt-12 pt-6 sm:px-12 px-6 flex lg:flex-row flex-col lg:space-x-8 space-y-8">
      
      {/* Left section: Logo and description */}
      <div className="flex-[3] flex sm:flex-row flex-col items-center text-center sm:text-left">
        <img src={Logo} alt="/" className="sm:h-44 h-32" />
        <p className="text-[#333333] font-medium text-sm sm:mx-4 mx-1 mt-4 sm:mt-0">
          Qemafarm adalah sebuah website bisnis yang berfokus pada peternakan hewan kambing, domba dan sapi. Yang mana didalamnya terdapat beberapa fitur sebagai media informasi dan media bisnis. Tujuan utama website ini adalah berbisnis kambing tanpa harus memiliki skill beternak dan lahan sebagai media perawatan, atau nama lainnya berinvestasi pada sektor rill di bidang peternakan.
        </p>
      </div>
      
      {/* Middle section: Navigation links */}
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

      {/* Right section: Social media icons */}
      <div className="flex-[2] flex items-end justify-between lg:space-x-8 md:space-x-4 space-x-4">
        <FaFacebookF size={24} color="#333333" className="cursor-pointer" />
        <FaTwitter size={24} color="#333333" className="cursor-pointer" />
        <FaTiktok size={24} color="#333333" className="cursor-pointer" />
        <FaPinterestP size={24} color="#333333" className="cursor-pointer" />
        <FaInstagram size={24} color="#333333" className="cursor-pointer" />
        <FaWhatsapp size={24} color="#333333" className="cursor-pointer" />
        <FaEnvelope size={24} color="#333333" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
