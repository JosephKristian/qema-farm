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
  const navigation = useNavigate();

  return (
    <div className='w-full bg-[#F1FAE9] min-h-[300px] pb-8 sm:pt-12 pt-6 sm:px-12 px-6 flex lg:flex-row flex-col lg:space-x-8 space-y-8'>
      <div className='flex-[3] flex sm:flex-row flex-col items-center'>
        <img src={Logo} alt='/' className='sm:h-44 h-32' />
        <p className='text-[#333333] font-medium text-sm sm:mx-4 mx-1'>Qemafarm adalah sebuah website bisnis yang berfokus pada peternakan hewan kambing, domba dan sapi. Yang mana didalamnya terdapat beberapa fitur sebagai media informasi dan media bisnis. Yang mana tujuan utama pada website ini adalah berbisnis kambing tanpa harus memiliki skill beternak dan lahan sebagai media perawatan, atau nama lainnya berinvestasi pada sektor rill dibilang peternakan.</p>
      </div>
      <div className='flex-[2] flex items-start justify-around space-x-12'>
        <div className='flex flex-col'>
          <h6 className='text-[#145412] text-xl font-bold mb-9'>Jasa Kami</h6>
          <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/investasi')}>Investasi</p>
          <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/portofolio')}>Portofolio</p>
          <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/breeding')}>Breeding</p>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-[#145412] text-xl font-bold mb-9'>Fitur Lain</h6>
          <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/')}>Home</p>
          <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/profil')}>Profile</p>
          {
            localStorage.getItem('role') == 'admin'
              ? <p className='text-[#145412] text-xl font-medium mb-5 cursor-pointer' onClick={() => navigation('/admin')}>Admin Panel</p>
              : <div></div>
          }
          </div>
      </div>
      <div className='flex-[2] flex items-end justify-between lg:space-x-8 md:space-x-4'>
        <FaFacebookF size={24} color='#333333' className='cursor-pointer' />
        <FaTwitter size={24} color='#333333' className='cursor-pointer' />
        <FaTiktok size={24} color='#333333' className='cursor-pointer' />
        <FaPinterestP size={24} color='#333333' className='cursor-pointer' />
        <FaInstagram size={24} color='#333333' className='cursor-pointer' />
        <FaWhatsapp size={24} color='#333333' className='cursor-pointer' />
        <FaEnvelope size={24} color='#333333' className='cursor-pointer' />
      </div>
    </div>
  );
}

export default Footer;