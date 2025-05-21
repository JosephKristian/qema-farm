import React, { useState, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import NoAvatar from '../../assets/logo.png';
import Modal from 'react-modal';
import { getUserData, updateUserData } from '../../functions/Database';
import { changePass } from '../../functions/Auth';
import { saveUserImage } from '../../functions/Storage';

const Profile = () => {
  const [userName, setUserName] = useState(localStorage.getItem('name'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const [userPhone, setUserPhone] = useState(localStorage.getItem('phone'));
  const [userPassword, setUserPassword] = useState(localStorage.getItem('password'));
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('avatar'));
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const imageRef = useRef();

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const updateUserProfile = async () => {
    try {
      if (validation()) {
        setLoading(true);
        const uid = localStorage.getItem('uid');
        const role = localStorage.getItem('role');
        await updateUserData(uid, {
          avatar: userAvatar,
          name: userName,
          email: userEmail,
          phone: userPhone,
          password: userPassword,
          role: role
        }).then(
          async (resolve) => {
            await changePass(userPassword).then(
              async (resolve) => {
                await getUserData(uid).then(
                  (resolve) => {
                    localStorage.setItem('name', userName);
                    localStorage.setItem('email', userEmail);
                    localStorage.setItem('phone', userPhone);
                    localStorage.setItem('password', userPassword);
                    localStorage.setItem('role', role);
                    localStorage.setItem('avatar', userAvatar);
                    setUserName(localStorage.getItem('name'));
                    setUserEmail(localStorage.getItem('email'));
                    setUserPhone(localStorage.getItem('phone'));
                    setUserPassword(localStorage.getItem('password'));
                    setUserAvatar(localStorage.getItem('avatar'));
                    showTheModal('Sukses!', 'Data berhasil diubah!');
                  },
                  (reject) => { throw Error(reject); },
                );
              },
              (reject) => { throw reject; }
            );
          },
          (reject) => { throw reject; }
        );
      } else {
        throw 'Form harus diisi!';
      }
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const updateAvatar = async (file) => {
    try {
      setLoading(true);
      const uid = localStorage.getItem('uid');
      await saveUserImage(uid, file).then(
        async (resolve) => {
          setUserAvatar(resolve);
          await updateUserProfile();
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const validation = () => {
    if (userName.length < 1) {
      return false;
    } else if (userPhone.length < 1) {
      return false;
    } else if (userPassword.length < 6) {
      return false;
    }
    return true;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className='w-full h-[264px] bg-[#CAAA02] rounded-b-[30px]'></div>

      {/* Form & Profile Info Panel */}
      <div className='w-full lg:px-16 md:px-10 px-6 flex flex-col lg:flex-row justify-between items-start lg:space-x-8 space-y-12 lg:space-y-0 mb-14'>

        {/* Info Panel */}
        <div className='w-full lg:w-1/2 flex flex-col items-center mt-[-80px] tour-profile-info'>
          <div className='flex flex-col items-center space-y-4'>
            <img src={userAvatar.length < 1 ? NoAvatar : userAvatar} alt='/' onClick={() => imageRef.current.click()} className='bg-white rounded-full w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] cursor-pointer' />
            <input type='file' ref={imageRef} multiple={false} onChange={(e) => {
              if (e.target.files && e.target.files[0] && ['image/jpeg', 'image/jpg', 'image/png'].includes(e.target.files[0].type)) {
                updateAvatar(e.target.files[0]);
              }
            }} className='hidden' />
            <p className='text-black text-[22px] lg:text-[26px] font-normal text-center'>{localStorage.getItem('name')}</p>
            <p className='text-[#333333] text-base lg:text-xl font-normal text-center'>{localStorage.getItem('email')}</p>
            <p className='text-[#333333] text-base lg:text-xl font-normal text-center'>{localStorage.getItem('phone')}</p>
          </div>
        </div>

        {/* Form Panel */}
        <div className='w-full lg:w-1/2 flex items-center justify-center tour-profile-edit'>
          <div className='bg-[#D6F6D5] w-full lg:w-[80%] flex flex-col space-y-10 rounded-[20px] mt-0 lg:mt-14 py-6 px-4'>
            <h4 className='text-black text-center text-xl lg:text-2xl font-medium'>Ubah Profil</h4>

            {/* Nama */}
            <div className='flex flex-col items-start space-y-2 border-b-2 border-b-[#31D12E]'>
              <p className='text-[#333333] text-base lg:text-lg font-medium'>NAMA</p>
              <input type='text' placeholder='Nama Anda' defaultValue={userName} onChange={(e) => setUserName(e.target.value)} className='w-full pb-1 pt-2 border-none text-base outline-none text-[#333333] bg-transparent' />
            </div>

            {/* Email */}
            <div className='flex flex-col items-start space-y-2 border-b-2 border-b-[#31D12E]'>
              <p className='text-[#333333] text-base lg:text-lg font-medium'>EMAIL (*tidak dapat diubah)</p>
              <input type='email' readOnly placeholder='Email Anda' defaultValue={userEmail} className='w-full pb-1 pt-2 border-none text-base outline-none text-[#333333] bg-transparent' />
            </div>

            {/* Whatsapp */}
            <div className='flex flex-col items-start space-y-2 border-b-2 border-b-[#31D12E]'>
              <p className='text-[#333333] text-base lg:text-lg font-medium'>NO. WHATSAPP</p>
              <input type='tel' placeholder='No. Whatsapp Anda' defaultValue={userPhone} onChange={(e) => setUserPhone(e.target.value)} className='w-full pb-1 pt-2 border-none text-base outline-none text-[#333333] bg-transparent' />
            </div>

            {/* Kata Sandi */}
            <div className='flex flex-col items-start space-y-2 border-b-2 border-b-[#31D12E]'>
              <p className='text-[#333333] text-base lg:text-lg font-medium'>KATA SANDI</p>
              <div className='w-full flex items-start'>
                <input type={visible ? 'text' : 'password'} placeholder='Kata Sandi' defaultValue={userPassword} onChange={(e) => setUserPassword(e.target.value)} className='w-full pb-1 pt-2 border-none text-base outline-none text-[#333333] bg-transparent' />
                {
                  visible
                    ? <AiOutlineEye color='#31D12E' size={32} className='p-1 cursor-pointer' onClick={() => setVisible(!visible)} />
                    : <AiOutlineEyeInvisible color='#31D12E' size={32} className='p-1 cursor-pointer' onClick={() => setVisible(!visible)} />
                }
              </div>
            </div>

            {/* Button */}
            <div className='text-center'>
              <button onClick={() => updateUserProfile()} className='bg-[#145412BF] text-white text-sm font-medium px-4 py-3 rounded-tl-xl rounded-br-xl'>Perbarui</button>
            </div>
          </div>
        </div>

      </div>


      {/* Footer */}
      <Footer />

      {/* Dialog Modal */}
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
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '100',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333] '>{title}</h1>
          <p className='flex-1 text-base font-medium text-[#145412]'>{description}</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setVisibleModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>

      {/* Loading */}
      <Loading show={loading} />
    </div>
  );
}

export default Profile;