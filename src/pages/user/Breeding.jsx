import React, { useState, useEffect, useReducer } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import Breeding1 from '../../assets/breeding_1.png';
import Breeding2 from '../../assets/breeding_2.png';
import Breeding3 from '../../assets/breeding_3.png';
import Breeding4 from '../../assets/breeding_4.png';
import { addNewPackageTransaction, getAdmin, getAllPackage } from '../../functions/Database';
import { packageReducer } from '../../config/Reducer';

const Breeding = () => {
  const format = Intl.NumberFormat();
  const [packageRed, dispatchPackage] = useReducer(packageReducer, []);
  const [choosenOption, setChoosenOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionModal, setOptionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    retrieveAllPackage();
    return () => { }
  }, [])

  const retrieveAllPackage = async () => {
    try {
      await getAllPackage().then(
        (resolve) => {
          dispatchPackage({
            type: 'retrieve_package',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan! [retrieveAllPackage]', error.toString());
    }
  }

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const buyPackage = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem('uid');
      const date = new Date().getTime();
      await addNewPackageTransaction({ user: uid, confirmed: false, created_at: date, ...choosenOption }).then(
        async (resolve) => {
          await sendToWhatsapp(resolve.key);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan! [addNewPackageTransaction]', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const sendToWhatsapp = async (uid) => {
    try {
      const usersName = localStorage.getItem('name');
      await getAdmin().then(
        async (resolve) => {
          const phone = resolve.phone.substring(1);
          console.log(phone);
          const message = `Nama : *${usersName}*\nPaket : *${choosenOption.name}*\nHarga : *${choosenOption.price}*\nHarga Diskon : *${choosenOption.discount_price}*\n\nKonfirmasi pesanan \n${window.origin}/confirmation_package/${uid}`;
          const url = `https://api.whatsapp.com/send?phone=62${phone}&text=${encodeURI(message)}`;
          window.open(url);
          await fetch(url).then((res) => {
            console.log(res);
          }).catch(error => console.error(error));
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const rendered_option = () => {
    return packageRed.map(element => (
      <div className='flex flex-col justify-evenly items-center space-y-8 px-[36px] aspect-[5/6] bg-[#EDF2FA]'>
        <h4 className='text-black text-2xl font-semibold'>{element.name}</h4>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-[#999999] text-xl line-through'>Rp. {format.format(element.price).replaceAll(',', '.')}</p>
          <p className='text-black text-base font-bold'>Rp. {format.format(element.discount_price).replaceAll(',', '.')}</p>
        </div>
        <p className='text-center text-[#4D4D4D] font-normal text-sm'>{element.description}</p>
        <button className={choosenOption !== null && choosenOption.uid === element.uid ? 'bg-transparent border border-[#145412] px-10 py-4 rounded-md text-[#145412] text-sm font-semibold ease-linear duration-150' : 'bg-[#145412] px-10 py-4 rounded-md text-white text-sm font-semibold ease-linear duration-150'} onClick={() => {
          setSelectedOption(element);
          setOptionModal(prev => true);
        }}>{choosenOption !== null && choosenOption.uid === element.uid ? 'Dipilih' : 'Pilih'}</button>
      </div>
    ));
  };

  const rendered_choosen = () => {
    return choosenOption == null
      ? (
        <div className='col-span-2 bg-[#D6F6D5] flex flex-col space-y-4 items-center justify-center px-20 py-16'>
          <p className='text-center text-[#5C5C5C] text-sm'>Belum Ada Paket Breeding Yang Dipilih</p>
          <p className='text-center text-[#333333] text-sm'>untuk dapat memilih paket breeding, kamu harus memilih  paket yang kamu inginkan di bawah dan tekan tombol  transaksi</p>
        </div>
      ) : (
        <div className='col-span-2 bg-[#D6F6D5] flex flex-col space-y-8 justify-between px-8 py-6'>
          <div className='flex flex-row items-center justify-between space-x-4'>
            {/* <h2 className='rounded-md bg-[#145412] text-white text-xl font-semibold px-3 py-0.5'>{choosenOption.uid}</h2> */}
            <h4 className='text-black text-2xl font-semibold flex-1'>{choosenOption.name}</h4>
            <p className='text-[#145412] text-sm font-medium'>*paket yang telah dipilih</p>
          </div>
          <p className='text-[#333333] text-sm'>{choosenOption.description}</p>
          <h5 className='text-[#EA341B] text-xl font-medium'>Rp. {format.format(choosenOption.discount_price != null ? choosenOption.discount_price : choosenOption.price).replaceAll(',', '.')}</h5>
        </div>
      );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className='gradient-green-white w-full pt-8 px-6 mb-16 overflow-hidden relative'>
        <div className='flex flex-col space-y-5 absolute top-[100px] sm:top-[120px] left-[16px] sm:left-[64px]'>
          <h1 className='text-black text-[30px] sm:text-[40px] font-bold max-w-[832px] relative'>
            Perbanyak kambingmu dengan <span className='text-[#145412]'>BREEDING</span> bersama <span className='text-[#145412]'>QEMAFARM</span>
          </h1>
          <p className='font-inter text-[#333333] text-base sm:text-xl font-normal max-w-[420px] relative'>
            QEMAFARM memberikan jasa breeding untuk kamu yang berinvestasi dengan kami, bersama dengan perawatan, dll.
          </p>
        </div>
        <div className='w-full flex flex-row-reverse justify-between items-end space-x-4'>
          <img src={Breeding1} alt='/' className='rounded-t-full h-1/4 sm:h-1/4 md:h-2/4 lg:h-3/4 xl:h-full' />
          <img src={Breeding2} alt='/' className='rounded-t-full h-2/4 sm:h-2/4 md:h-3/4 lg:h-2/4 xl:h-1/4' />
          <img src={Breeding3} alt='/' className='rounded-t-full h-3/4 sm:h-2/4 md:h-3/4 lg:h-2/4 xl:h-3/4' />
          <img src={Breeding4} alt='/' className='rounded-t-full h-full sm:h-1/2 md:h-3/4 lg:h-full xl:h-full' />
        </div>
      </div>

      {/* Preview Packet */}
      <div className='mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-[68px]'>
        <div>
          <img src={Breeding2} alt='/' className='rounded-t-full' />
        </div>
        <div className='col-span-2 flex flex-col space-y-6'>
          <h1 className='font-bold text-black text-[22px] sm:text-[28px]'>Pilih paket breeding dan perawatan pasca breeding untuk kambingmu di sini</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {rendered_choosen()}
          </div>
          <div>
            <button onClick={() => buyPackage()} className={choosenOption == null ? 'hidden' : 'text-white text-xl font-semibold px-[15px] py-[10px] bg-[#145412B2] rounded-[10px]'}>
              Transaksi
            </button>
          </div>
        </div>
      </div>

      {/* Packet Menu */}
      <div className='mx-4 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-[72px] mb-8'>
        {/* Packet Info */}
        <div className='flex flex-col gap-4 sm:gap-6 w-full'>
          <div className='flex items-center justify-center bg-[#EDF2FA] rounded-xl w-full py-6'>
            <h2 className='text-black text-[20px] sm:text-[26px] font-semibold text-center'>Apa yang kamu dapat?</h2>
          </div>
          <div className='flex flex-col justify-between space-y-4 bg-white rounded-xl w-full px-4 py-4'>
            {[
              "Jasa breeding",
              "Perawatan berkala (vitamin, pakan breeding, pengecekan dokter hewan)",
              "Monitoring proses breeding secara langsung melalui CCTV",
              "Pengajaran dan pengalaman melakukan breeding dengan ahli di peternakan"
            ].map((text, index) => (
              <div key={index} className='flex items-start space-x-4'>
                <FaCheckCircle size={24} className='min-w-[24px]' color='#009500' />
                <p className='text-[#000000] text-base sm:text-xl break-words'>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Packet Options */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
          {rendered_option()}
        </div>
      </div>


      {/* Footer */}
      <Footer />

      {/* Option Modal */}
      <Modal
        isOpen={optionModal}
        onRequestClose={() => {
          setOptionModal(false);
          setSelectedOption(prev => null);
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxWidth: '95vw', // Gunakan lebar maksimal 95% layar
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '100',
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 w-full sm:w-[360px] min-h-[280px] text-black flex flex-col justify-between space-y-6'>
          <div className='flex flex-col justify-between items-start space-y-2 max-w-lg'>
            <p className='text-xl font-semibold text-[#145412] mb-2 flex-1'>{selectedOption === null ? '' : selectedOption.name}</p>
            <p className='text-lg font-bold text-[#b31818] flex-1'>Rp.  <span className={selectedOption === null ? '' : (selectedOption.discount_price !== 0 ? 'line-through text-[#333333] font-normal' : 'text-[#b31818] text-lg font-bold')}>{selectedOption === null ? '' : format.format(selectedOption.price).replaceAll(',', '.')}</span> <span className='text-[#b31818] text-lg font-bold'>{selectedOption === null ? '' : (selectedOption.discount_price !== 0 ? format.format(selectedOption.discount_price).replaceAll(',', '.') : '')}</span></p>
            <ul className='px-4 list-disc py-2'>
              <li className='text-base font-medium text-[#333333]'>{selectedOption === null ? '' : selectedOption.goat.name} {selectedOption === null ? '' : selectedOption.goat.sex}</li>
              <li className='text-base font-medium text-[#333333]'>{selectedOption === null ? '' : selectedOption.goat.type}</li>
              <li className='text-base font-medium text-[#333333]'>{selectedOption === null ? '' : selectedOption.food.name}</li>
              <li className='text-base font-medium text-[#333333]'>{selectedOption === null ? '' : selectedOption.maintenance.name}</li>
            </ul>
          </div>
          <p className='text-base font-medium text-[#333333] mb-2 flex-1'>{selectedOption === null ? '' : selectedOption.description}</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-transparent px-4 py-2 rounded-lg border border-[#145412] text-[#145412] font-semibold text-base' onClick={() => setOptionModal(false)}>Batal</button>
            <button className='bg-[#145412] border border-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => {
              setChoosenOption(prev => selectedOption);
              setSelectedOption(prev => null);
              setOptionModal(false);
            }}>Pilih</button>
          </div>
        </div>

      </Modal>


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

export default Breeding;