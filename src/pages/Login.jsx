import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.png';
import Modal from 'react-modal';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { checkSimilarEmail, getUserData } from '../functions/Database';
import { loginUsers } from '../functions/Auth';
import Loading from '../components/Loading';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const elementEmail = useRef();
  const elementPassword = useRef();
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

  const doProcessLogin = async () => {
    try {
      if (doValidation()) {
        setLoading(true);
        await checkSimilarEmail(email).then(
          (resolve) => {},
          (reject) => { console.log(reject); throw Error(reject) },
        );
        await loginUsers(email, password).then(
          (resolve) => {
            doSaveUserData(resolve.uid);
          },
          (reject) => { throw Error(reject); }
        );
      }
    } catch (error) {
      console.log(error);
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const doSaveUserData = async (uid) => {
    try {
      await getUserData(uid).then(
        (resolve) => {
          localStorage.setItem('uid', uid);
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
    } catch (error) {
      console.log(error);
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const doValidation = () => {
    if (email.length < 1) {
      elementEmail.current.focus();
      showTheModal('Ada Yang Kurang!', 'Email tidak boleh kosong!');
      return false;
    } else if (!email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      elementEmail.current.focus();
      showTheModal('Ada Yang Kurang!', 'Email tidak sesuai!');
      return false;
    } else if (password.length < 6) {
      elementPassword.current.focus();
      showTheModal('Ada Yang Kurang!', 'Kata Sandi minimal 6 karakter!');
      return false;
    }
    return true;
  }

  return (
    <div className='h-screen flex-1 flex flex-row font-inter'>
      {/* Left Panel */}
      <div className='hidden gradient-green-lightgreen text-white p-12 overflow-auto flex-1 sm:flex flex-col justify-between items-center rounded-r-2xl'>
        <h1 className='font-bold text-3xl text-center'>SELAMAT DATANG KEMBALI DI</h1>
        <img src={Logo} alt='Logo' className='w-[300px] my-2' />
        <h1 className='font-bold text-3xl my-2'>QEMAFARM</h1>
        <p className='text-center text-xl leading-tight'>QEMAFARM  sebuah website bisnis yang berfokus pada peternakan hewan kambing, domba dan sapi. Yang mana didalamnya terdapat beberapa fitur sebagai media informasi dan media bisnis. Yang mana tujuan utama pada website ini adalah berbisnis kambing tanpa harus memiliki skill beternak dan lahan sebagai media perawatan, atau nama lainnya berinvestasi pada sektor rill dibilang peternakan.</p>
      </div>

      {/* Right Panel */}
      <div className='sm:p-12 p-6 overflow-auto flex-1 flex flex-col justify-start text-center'>
        <h1 className='text-[#333333] font-bold text-3xl mb-16'>MASUK KE AKUNMU</h1>
        <form className='flex-1 flex flex-col'>
          {/* Email */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>EMAIL</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-4'>
              <input type='text' placeholder='Tulis alamat email disni' ref={elementEmail} onChange={(e) => setEmail(e.target.value)} className='pb-1 pt-2 flex-1 border-none text-lg outline-none text-[#333333] bg-transparent' />
            </div>
          </div>

          {/* Password */}
          <div className='text-left mb-2'>
            <p className='text-[#333333] font-medium text-xl'>KATA SANDI</p>
            <div className='border-b-[1px] border-[#31D12E] flex text-[#999999] font-normal my-4 items-center'>
              <input type={visible ? 'text' : 'password'} placeholder='Tulis password disini' ref={elementPassword} onChange={(e) => setPassword(e.target.value)} className='pb-1 pt-2 flex-1 border-none text-lg outline-none text-[#333333] bg-transparent' />
              {
                !visible
                  ? <AiOutlineEyeInvisible color='#31D12E' size={48} className='p-2 cursor-pointer' onClick={() => setVisible(!visible)} />
                  : <AiOutlineEye color='#31D12E' size={48} className='p-2 cursor-pointer' onClick={() => setVisible(!visible)} />
              }
            </div>
          </div>

          {/* Button and Navigate */}
          <div className='sm:flex-1 mt-14'></div>
          <div className='sm:mt-auto'>
            <button type='button' className='bg-[#145412] text-white font-medium text-lg py-4 px-28 rounded-lg' disabled={loading} onClick={() => doProcessLogin()}>Masuk</button>
            <div className='flex mt-2 justify-center'>
              <p className='text-[#474747] text-lg font-normal'>belum punya akun?</p>
              <p className='text-[#145412] text-lg font-normal cursor-pointer ml-2' onClick={() => navigate('/register')}>daftar</p>
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

export default Login;