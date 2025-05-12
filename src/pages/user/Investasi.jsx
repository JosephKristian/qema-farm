import React, {useReducer, useEffect, useState} from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import NoAccount from '../../assets/no_account.png';
import { foodReducer, goatReducer, maintenanceReducer } from '../../config/Reducer';
import { getAdmin, getAllFood, getAllGoat, getAllMaintenance, newTransaction } from '../../functions/Database';

const Investasi = () => {
  const [goat, goatDispatch] = useReducer(goatReducer, []);
  const [food, foodDispatch] = useReducer(foodReducer, []);
  const [maintenance, maintenanceDispatch] = useReducer(maintenanceReducer, []);
  const [selectedGoat, setSelectedGoat] = useState(null);
  const [confirmGoat, setConfirmGoat] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [confirmFood, setConfirmFood] = useState(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [confirmMaintenance, setConfirmMaintenance] = useState(null);
  const [goatSearch, setGoatSearch] = useState('');
  const [goatSex, setGoatSex] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [noAccountModal, setNoAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveAllGoat();
    retrieveAllFood();
    retrieveAllMaintenance();
    return () => {}
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const retrieveAllGoat = async () => {
    try {
      await getAllGoat().then(
        (resolve) => {
          goatDispatch({
            type: 'retrieve_goat',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const retrieveAllFood = async () => {
    try {
      await getAllFood().then(
        (resolve) => {
          foodDispatch({
            type: 'retrieve_food',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }
  
  const retrieveAllMaintenance = async () => {
    try {
      await getAllMaintenance().then(
        (resolve) => {
          maintenanceDispatch({
            type: 'retrieve_maintenance',
            data: [...resolve],
          });
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  }

  const renderGoat = () => {
    return (
      <div className='flex flex-col items-center'>
        {/* Search */ }
        <div div className = 'flex flex-row w-1/3 border-2 border-[#5C5C5C] rounded-[10px] items-center self-center mb-11' >
          <input type='text' placeholder='Cari nama kambing' onChange={(e) => setGoatSearch(e.target.value)} className='flex-1 text-sm text-[#333333] font-normal px-2 py-3 outline-none bg-transparent' />
          <AiOutlineSearch size={32} color='#858585' className='mr-2 cursor-pointer' />
        </div>

        {/* Sex Options */ }
        <div div className = 'flex flex-row items-center self-center space-x-4 mb-14' >
          <button onClick={() => goatSex === 'Jantan' ? setGoatSex('') : setGoatSex('Jantan')} className={goatSex === 'Jantan' ? 'text-white text-sm font-medium bg-[#145412] border-2 rounded-full px-6 py-2' : 'text-[#145412] text-sm font-medium border-[#145412] border-2 rounded-full px-6 py-2'}>Jantan</button>
          <button onClick={() => goatSex === 'Betina' ? setGoatSex('') : setGoatSex('Betina')} className={goatSex === 'Betina' ? 'text-white text-sm font-medium bg-[#145412] border-2 rounded-full px-6 py-2' : 'text-[#145412] text-sm font-medium border-[#145412] border-2 rounded-full px-6 py-2'}>Betina</button>
        </div>

        {/* Options Menu */ }
        <div div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4'>
          {
            goat.filter(e => e.name.toLowerCase().includes(goatSearch.toLowerCase().trim()) && e.sex.toLowerCase().includes(goatSex.toLowerCase().trim())).map(element => (
              <div onClick={() => setConfirmGoat(element)} className='bg-white flex flex-col space-y-2 py-2 shadow-lg cursor-pointer'>
                <div className={selectedGoat != null && selectedGoat.uid === element.uid ? 'mx-2 border-2 bg-[#145412] rounded-full w-[30px] h-[30px]' : 'mx-2 border-2 border-[#145412] rounded-full w-[30px] h-[30px]'} />
                <img src={element.image} alt='/' className='w-full' />
                <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{element.name} {element.sex}</h4>
                <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{element.type}</p>
                <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{element.weight} kg / {element.time} bulan</p>
                <p className='text-[#EA341B] text-base font-medium mx-2 overflow-hidden'>Rp. {element.price.toLocaleString().replaceAll(',', '.')}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  const renderFood = () => {
    return (
      <div className='flex flex-col items-center'>

        {/* Options Menu */}
        <div div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4'>
          {
            food.map(element => (
              <div onClick={() => setConfirmFood(element)} className='bg-white flex flex-col space-y-2 py-2 shadow-lg cursor-pointer'>
                <div className={selectedFood != null && selectedFood.uid === element.uid ? 'mx-2 border-2 bg-[#145412] rounded-full w-[30px] h-[30px]' : 'mx-2 border-2 border-[#145412] rounded-full w-[30px] h-[30px]'} />
                <img src={element.image} alt='/' className='w-full' />
                <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{element.name}</h4>
                <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{element.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  const renderMaintenance = () => {
    return (
      <div className='flex flex-col items-center'>

        {/* Options Menu */}
        <div div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4'>
          {
            maintenance.map(element => (
              <div onClick={() => setConfirmMaintenance(element)} className='bg-white flex flex-col space-y-2 py-2 shadow-lg cursor-pointer'>
                <div className={selectedMaintenance != null && selectedMaintenance.uid === element.uid ? 'mx-2 border-2 bg-[#145412] rounded-full w-[30px] h-[30px]' : 'mx-2 border-2 border-[#145412] rounded-full w-[30px] h-[30px]'} />
                <img src={element.image} alt='/' className='w-full' />
                <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{element.name}</h4>
                <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{element.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  const doTransaction = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem('uid');
      await newTransaction(confirmGoat, confirmFood, confirmMaintenance, uid).then(
        async (resolve) => {
          await sendToWhatsapp(resolve);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
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
          const message = `Nama : *${usersName}*\nKambing : *${confirmGoat.name}*\nJenis : *${confirmGoat.type}* (${confirmGoat.weight}/${confirmGoat.time})\nHarga : *${confirmGoat.price}*\nPakan : *${confirmFood.name}*\nPerawatan : *${confirmMaintenance.name}*\n\nKonfirmasi pesanan \n${window.origin}/confirmation/${uid}`;
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

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className="bg-investasi w-full h-[575px] overflow-hidden flex mb-12">
        <div className='flex-1 flex flex-col items-center justify-between bg-[#47474778]'>
          <div className='w-full flex flex-row items-start justify-end'>
            <div className='w-[200px] h-[400px] bg-[#FEEE9A] rounded-full mr-[-60px] mt-[-280px] z-20' />
            <div className='w-[200px] h-[400px] bg-[#FDE568] rounded-full mr-[-80px] mt-[-230px] z-10' />
            <div className='w-[200px] h-[400px] bg-[#FCD403] rounded-full mr-[-100px] mt-[-180px]' />
          </div>
          <h1 className='lg:w-[780px] md:w-[640px] text-center font-bold text-white text-5xl w-full px-10'>PILIH KAMBING INVESTASIMU SEKARANG JUGA!</h1>
          <div className='w-full flex flex-row items-end justify-start'>
            <div className='w-[200px] h-[400px] bg-[#FCD403] rounded-full ml-[-100px] mb-[-200px]' />
            <div className='w-[200px] h-[400px] bg-[#FDE568] rounded-full ml-[-80px] mb-[-250px] z-10' />
            <div className='w-[200px] h-[400px] bg-[#FEEE9A] rounded-full ml-[-60px] mb-[-300px] z-20' />
          </div>
        </div>
      </div>

      {/* Pilih Investasi */}
      <div className='mx-16 flex flex-col mb-16'>
        <div className='text-black text-xl font-semibold w-full px-8 py-5 bg-[#D6F6D5]'>Pilih Investasimu</div>

        {/* Invest Result */}
        <div className='w-full lg:h-[50vh] h-fit grid grid-cols-4 mb-12'>
          <div className='flex-1 flex flex-col items-center justify-center p-4 border-r-2 border-r-[#999999]'>
            <p className='text-md font-normal text-black text-center'>kamu bisa memilih jenis kambing, jenis pakan dan jenis perawatan  di tabel ini</p>
            <button onClick={() => {
              if (localStorage.getItem('uid') === null) {
                setNoAccountModal(true);
              } else if (localStorage.getItem('role') === 'admin') {
                showTheModal('Terjadi Kesalahan!', 'Admin tidak dapat melakukan transaksi!');
              } else {
                if (confirmMaintenance != null) {
                  doTransaction();
                }
              }
            }} className='bg-[#145412C2] text-white text-base font-normal px-8 py-2 rounded-lg mt-4'>Investasi Sekarang</button>
          </div>
          {/* Confirm Goat  */}
          <div className='flex-1 flex flex-col items-center justify-center border-r-2 border-r-[#999999]'>
            {
              confirmGoat
                ? (
                  <div className='flex flex-col space-y-2 py-2 shadow-lg'>
                    <button onClick={() => setConfirmGoat(null)} className={confirmFood ? 'hidden' : 'mx-2 p-1 self-end bg-gray-400'}><AiOutlineClose size={20} color='#000000' /></button>
                    <img src={confirmGoat.image} alt='/' className='w-full' />
                    <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{confirmGoat.name} {confirmGoat.sex}</h4>
                    <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{confirmGoat.type}</p>
                    <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{confirmGoat.weight} kg / {confirmGoat.time} bulan</p>
                    <p className='text-[#EA341B] text-base font-medium mx-2 overflow-hidden'>Rp. {confirmGoat.price.toLocaleString().replaceAll(',', '.')}</p>
                  </div>
                ) : (
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-md font-normal text-[#666666CC] text-center'>Pilih jenis kambingmu</p>
                    <button disabled className='bg-[#CAAA02] text-white text-base font-normal px-8 py-2 rounded-lg mt-4'>Pilih</button>
                  </div>
                )
            }
          </div>
          {/* Confirm Food */}
          <div className='flex-1 flex flex-col items-center justify-center p-4 border-r-2 border-r-[#999999]'>
            {
              confirmFood
                ? (
                  <div className='flex flex-col space-y-2 py-2 shadow-lg'>
                    <button onClick={() => setConfirmFood(null)} className={confirmMaintenance ? 'hidden' : 'mx-2 p-1 self-end bg-gray-400'}><AiOutlineClose size={20} color='#000000' /></button>
                    <img src={confirmFood.image} alt='/' className='w-full' />
                    <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{confirmFood.name}</h4>
                    <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{confirmFood.description}</p>
                  </div>
                )
                : (
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-md font-normal text-[#666666CC] text-center'>Pilih jenis pakan kambingmu</p>
                    <button disabled className={confirmGoat ? 'bg-[#CAAA02] text-white text-base font-normal px-8 py-2 rounded-lg mt-4' : 'hidden'}>Pilih</button>
                  </div>
                )
            }
          </div>
          {/* Confirm Maintenance */}
          <div className='flex-1 flex flex-col items-center justify-center p-4 border-r-[#999999]'>
            {
              confirmMaintenance
                ? (
                  <div className='flex flex-col space-y-2 py-2 shadow-lg'>
                    <button onClick={() => setConfirmMaintenance(null)} className='mx-2 p-1 self-end bg-gray-400'><AiOutlineClose size={20} color='#000000' /></button>
                    <img src={confirmMaintenance.image} alt='/' className='w-full' />
                    <h4 className='font-bold text-[#000000CC] text-base mx-2 overflow-hidden'>{confirmMaintenance.name}</h4>
                    <p className='font-normal text-[#858585] text-sm mx-2 overflow-hidden'>{confirmMaintenance.description}</p>
                  </div>
                )
                : (
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-md font-normal text-[#666666CC] text-center'>Pilih jenis perawatan kambingmu</p>
                    <button disabled className={confirmFood ? 'bg-[#CAAA02] text-white text-base font-normal px-8 py-2 rounded-lg mt-4' : 'hidden'}>Pilih</button>
                  </div>
                )
            }
          </div>
        </div>

        {
          confirmGoat
            ? (
              confirmFood ? renderMaintenance() : renderFood()
            )
            : renderGoat()
        }
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

      {/* No Account Modal */}
      <Modal
        isOpen={noAccountModal}
        onRequestClose={() => setNoAccountModal(false)}
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

        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col items-center justify-between space-y-4'>
          <img src={NoAccount} alt='/' />
          <h1 className='text-xl font-bold text-[#333333] '>kamu belum memiliki akun!</h1>
          <p className='flex-1 text-base font-medium text-[#145412]'>Buat akun terlebih dahulu untuk dapat melakukan investasi</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setNoAccountModal(false)}>Oke, Siap</button>
          </div>
        </div>

      </Modal>

      {/* Loading */}
      <Loading show={loading} />
    </div>
  );
}

export default Investasi;