import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import Modal from 'react-modal';
import Logo from '../assets/logo.png';
import { checkSimilarEmail, checkSimilarPhone, addNewUsersToDatabase, getUserData } from '../functions/Database';
import { registerUsers } from '../functions/Auth';
import Loading from '../components/Loading';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const elementName = useRef();
  const elementEmail = useRef();
  const elementPhone = useRef();
  const elementPassword = useRef();
  const [visible, setVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('uid') != null) {
      navigate('/', { replace: true });
    }
    return () => { }
  }, []);

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const doProcessRegister = async () => {
    try {
      if (doValidation()) {
        setLoading(true);
        await checkSimilarEmail(email).then(
          (resolve) => {
            if (resolve) {
              throw Error('Email sudah digunakan! Gunakan alamat email lainnya!');
            }
          },
          (reject) => { throw Error(reject) },
        );
        await checkSimilarPhone(phone).then(
          (resolve) => {
            if (resolve) {
              throw Error('No. Whatsapp sudah digunakan! Gunakan No. Whatsapp lainnya!');
            }
          },
          (reject) => { throw Error(reject) },
        );
        await registerUsers(email, password).then(
          async (resolve) => {
            const usersUid = resolve.uid;
            await addNewUsersToDatabase(
              usersUid,
              name,
              email,
              phone,
              password,
            ).then(
              async (resolve) => {
                await getUserData(usersUid).then(
                  (resolve) => {
                    localStorage.setItem('uid', usersUid);
                    localStorage.setItem('name', resolve.name);
                    localStorage.setItem('email', resolve.email);
                    localStorage.setItem('phone', resolve.phone);
                    localStorage.setItem('password', resolve.password);
                    localStorage.setItem('role', resolve.role);
                    localStorage.setItem('avatar', resolve.avatar);
                    navigate('/', { replace: true });
                  },
                  (reject) => { throw Error(reject); },
                );
              },
              (reject) => { throw Error(reject) },
            );
          },
          (reject) => { throw Error(reject) },
        );
      }
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.message);
    } finally {
      setLoading(false);
    }
  };

  const doValidation = () => {
    if (name.length < 1) {
      elementName.current.focus();
      showTheModal('Ada Yang Kurang!', 'Nama tidak boleh kosong!');
      return false;
    } else if (email.length < 1) {
      elementEmail.current.focus();
      showTheModal('Ada Yang Kurang!', 'Email tidak boleh kosong!');
      return false;
    } else if (!email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      elementEmail.current.focus();
      showTheModal('Ada Yang Kurang!', 'Email tidak sesuai!');
      return false;
    } else if (phone.length < 1) {
      elementPhone.current.focus();
      showTheModal('Ada Yang Kurang!', 'No. Whatsapp tidak boleh kosong!');
      return false;
    } else if (!phone.match(/^\d+$/)) {
      elementPhone.current.focus();
      showTheModal('Ada Yang Kurang!', 'No. Whatsapp tidak sesuai!');
      return false;
    } else if (password.length < 6) {
      elementPassword.current.focus();
      showTheModal('Ada Yang Kurang!', 'Kata Sandi minimal 6 karakter!');
      return false;
    }
    return true;
  }

  return (
    <div id='component' className='h-screen flex-1 flex flex-row font-inter'>
      {/* Left Panel */}
      <div className='gradient-green-lightgreen text-white p-12 overflow-auto flex-1 sm:flex hidden flex-col justify-between items-center rounded-r-2xl'>
        <h1 className='font-bold text-3xl text-center'>SELAMAT DATANG DI</h1>
        <img src={Logo} alt='Logo' className='w-[300px] my-2' />
        <h1 className='font-bold text-3xl my-2'>QEMAFARM</h1>
        <p className='text-center text-xl leading-tight'>QEMAFARM  sebuah website bisnis yang berfokus pada peternakan hewan kambing, domba dan sapi. Yang mana didalamnya terdapat beberapa fitur sebagai media informasi dan media bisnis. Yang mana tujuan utama pada website ini adalah berbisnis kambing tanpa harus memiliki skill beternak dan lahan sebagai media perawatan, atau nama lainnya berinvestasi pada sektor rill dibilang peternakan.</p>
      </div>

      {/* Right Panel */}
      <div className='sm:p-12 p-6 overflow-auto flex-1 flex flex-col justify-start text-center'>
        <h1 className='text-[#333333] font-bold text-3xl mb-14'>BUAT AKUNMU</h1>
        <form className='flex-1 flex flex-col'>
          {/* Name */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>NAMA</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-3'>
              <input type='text' ref={elementName} placeholder='Tulis nama lengkapmu disini' defaultValue={name} onChange={(event) => setName(event.target.value)} className='pb-1 pt-2 flex-1 border-none text-lg outline-none text-[#333333] bg-transparent' />
            </div>
          </div>

          {/* Email */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>EMAIL</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-3'>
              <input type='email' ref={elementEmail} placeholder='Tulis alamat email disini' defaultValue={email} onChange={(event) => setEmail(event.target.value)} className='pb-1 pt-2 flex-1 border-none text-lg outline-none text-[#333333] bg-transparent' />
            </div>
          </div>

          {/* Phone */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>NO. WHATSAPP</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-3'>
              <input type='tel' maxLength={15} inputMode='tel' pattern='/^\d*$/' ref={elementPhone} placeholder='Tulis nomor whatsapp disini (08xxxxxxxxxx)' defaultValue={phone} onChange={(event) => setPhone(event.target.value)} className='pb-1 pt-2 flex-1 border-none text-lg outline-none text-[#333333] bg-transparent' />
            </div>
          </div>

          {/* password */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>KATA SANDI</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-3 items-center'>
              <input type={visible ? 'text' : 'password'} ref={elementPassword} placeholder='Tulis password disini' defaultValue={password} onChange={(event) => setPassword(event.target.value)} className='pb-1 pt-2 flex-1  border-none text-lg outline-none text-[#333333] bg-transparent' />
              {
                !visible
                  ? <AiOutlineEyeInvisible color='#31D12E' size={48} className='p-2 cursor-pointer' onClick={() => setVisible(!visible)} />
                  : <AiOutlineEye color='#31D12E' size={48} className='p-2 cursor-pointer' onClick={() => setVisible(!visible)} />
              }
            </div>
          </div>

          {/* confirmation */}
          <div className='text-left flex mb-2 items-center' onClick={() => setAgree(!agree)}>
            <div className={agree ? 'bg-[#145412] cursor-pointer duration-150 ease-in-out w-8 h-8 items-center justify-center border-[1px] border-[#ADADAD]' : 'bg-transparent cursor-pointer duration-150 ease-in-out w-8 h-8 items-center justify-center border-[1px] border-[#ADADAD]'}>
              <AiOutlineCheck color='#FFFFFF' size={28} className='m-auto' />
            </div>
            <p className='sm:text-lg text-base text-[#474747] pl-4 font-normal font-inter'>dengan membuat akun, maka kamu menyetujui seluruh kebijakan kami</p>
          </div>

          {/* Button and Navigate */}
          <div className='flex-1'></div>
          <div className='mt-4'>
            <button type='button' disabled={!agree} onClick={() => doProcessRegister()} className='bg-[#145412] text-white font-medium text-lg py-4 px-28 rounded-lg'>Daftar</button>
            <div className='flex justify-center mt-2'>
              <p className='text-[#474747] text-lg font-normal'>sudah punya akun?</p>
              <p className='text-[#145412] text-lg font-normal cursor-pointer ml-2' onClick={() => navigate('/login')}>masuk</p>
            </div>
          </div>
        </form>

      </div>

      {/* Loading */}
      <Loading show={loading} />

      {/* Modal */}
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
    </div>
  );
}

export default Register;