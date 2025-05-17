import React, { useReducer, useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import NoAccount from '../../assets/no_account.png';
import { foodReducer, goatReducer, maintenanceReducer } from '../../config/Reducer';
import { getAdmin, getAllFood, getAllGoat, getAllMaintenance, newTransaction } from '../../functions/Database';
import { resetTourReady, setTourReady } from '../../functions/TourReady';
import { useNavigate } from 'react-router-dom';

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
  const [deleteConfirm, setDeleteConfirm] = useState({ type: '', show: false });
  const [isDataReady, setIsDataReady] = useState(false);
  const navigate = useNavigate();

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const scrollToOptions = () => {
    const element = document.getElementById('options-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [goats, foods, maintenances] = await Promise.all([
          getAllGoat(),
          getAllFood(),
          getAllMaintenance()
        ]);

        goatDispatch({ type: 'retrieve_goat', data: goats });
        foodDispatch({ type: 'retrieve_food', data: foods });
        maintenanceDispatch({ type: 'retrieve_maintenance', data: maintenances });

        setIsDataReady(true);
        setTourReady();
      } catch (error) {
        if (error.message && error.message.toLowerCase().includes('permission denied')) {
          showTheModal('Silahkan Login/Daftar Terlebih Dahulu!');
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 1500);
        } else {
          showTheModal('Terjadi Kesalahan!', error.toString());
        }
      }
    };

    fetchAll();

    return () => {
      resetTourReady();
      setIsDataReady(false);
    };
  }, []);


  const renderGoat = () => {
    return (
      <div className='flex flex-col items-center mb-10'>
        {/* Search */}
        <div className='flex flex-row w-1/3 border-2 border-[#5C5C5C] rounded-[10px] items-center self-center mb-11' >
          <input type='text' placeholder='Cari Nama Ternak' onChange={(e) => setGoatSearch(e.target.value)} className='flex-1 text-sm text-[#333333] font-normal px-2 py-3 outline-none bg-transparent' />
          <AiOutlineSearch size={32} color='#858585' className='mr-2 cursor-pointer' />
        </div>

        {/* Sex Options */}
        <div className='flex flex-row items-center self-center space-x-4 mb-14 tour-goat-filter' >
          <button onClick={() => goatSex === 'Jantan' ? setGoatSex('') : setGoatSex('Jantan')} className={goatSex === 'Jantan' ? 'text-white text-sm font-medium bg-[#145412] border-2 rounded-full px-6 py-2' : 'text-[#145412] text-sm font-medium border-[#145412] border-2 rounded-full px-6 py-2'}>Jantan</button>
          <button onClick={() => goatSex === 'Betina' ? setGoatSex('') : setGoatSex('Betina')} className={goatSex === 'Betina' ? 'text-white text-sm font-medium bg-[#145412] border-2 rounded-full px-6 py-2' : 'text-[#145412] text-sm font-medium border-[#145412] border-2 rounded-full px-6 py-2'}>Betina</button>
        </div>

        {/* Options Menu */}
        <div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4 tour-goat-card'>
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
      <div className='flex flex-col items-center mb-10'>

        {/* Options Menu */}
        <div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4 tour-food-card'>
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
      <div className='flex flex-col items-center mb-10'>

        {/* Options Menu */}
        <div className='w-full h-fit grid grid-cols-4 lg:gap-12 md:gap-6 gap-4 tour-maintenance-card'>
          {
            maintenance
              .filter(e => confirmMaintenance == null || e.uid !== confirmMaintenance.uid)
              .map(element => (
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
          const message = `Nama : *${usersName}*\nKambing : *${confirmGoat.name}*\nJenis : *${confirmGoat.type}* (${confirmGoat.weight}/${confirmGoat.time})\nHarga : *Rp ${confirmGoat.price.toLocaleString().replaceAll(',', '.')}*\nPakan : *${confirmFood.name}*\nPerawatan : *${confirmMaintenance.name}*\n\nKonfirmasi pesanan \n${window.origin}/confirmation/${uid}`;
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

  const ConfirmCard = ({ data, onRemove, isHidden }) => (
    <div className='flex flex-col space-y-2 py-2 shadow-lg w-full min-h-[300px]'>
      <button onClick={onRemove} className={isHidden ? 'hidden' : 'mx-2 p-1 self-end bg-gray-400'}>
        <AiOutlineClose size={20} color='#000' />
      </button>
      <img src={data.image} alt='/' className='w-full rounded' />
      <h4 className='font-bold text-[#000000CC] text-base mx-2'>{data.name}</h4>
      {data.sex && <p className='font-normal text-[#858585] text-sm mx-2'>{data.sex}</p>}
      {data.type && <p className='font-normal text-[#858585] text-sm mx-2'>{data.type}</p>}
      {data.weight && <p className='font-normal text-[#858585] text-sm mx-2'>{data.weight} kg / {data.time} bulan</p>}
      {data.price && <p className='text-[#EA341B] text-base font-medium mx-2'>Rp. {data.price.toLocaleString().replaceAll(',', '.')}</p>}
      {data.description && <p className='font-normal text-[#858585] text-sm mx-2'>{data.description}</p>}
    </div>
  );

  const PlaceholderCard = ({ label, showButton }) => (
    <div className='flex flex-col justify-center items-center min-h-[300px] text-center'>
      <p className='text-md font-normal text-[#666666CC]'>{label}</p>
      {showButton && (
        <button
          onClick={scrollToOptions}
          className='bg-[#CAAA02] text-white text-base font-normal px-8 py-2 rounded-lg mt-4 cursor-pointer'
        >
          Pilih
        </button>

      )}
    </div>
  );


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
          <h1 className='lg:w-[780px] md:w-[640px] text-center font-bold text-white text-5xl w-full px-10'>PILIH TERNAK INVESTASIMU SEKARANG JUGA!</h1>
          <div className='w-full flex flex-row items-end justify-start'>
            <div className='w-[200px] h-[400px] bg-[#FCD403] rounded-full ml-[-100px] mb-[-200px]' />
            <div className='w-[200px] h-[400px] bg-[#FDE568] rounded-full ml-[-80px] mb-[-250px] z-10' />
            <div className='w-[200px] h-[400px] bg-[#FEEE9A] rounded-full ml-[-60px] mb-[-300px] z-20' />
          </div>
        </div>
      </div>

      {/* Pilih Investasi */}
      <div className='mx-16 flex flex-col mb-16 tour-goat-header min-h-screen pb-20'>

        <div className='text-black text-xl font-semibold w-full px-8 py-5 bg-[#D6F6D5]'>Pilih Investasimu</div>
        <div className="w-full flex flex-col gap-8">
          <div className='w-full lg:h-[50vh] grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 pb-4 tour-invest-card'>
            {/* Section 1 - Penjelasan dan CTA */}
            <div className='flex flex-col items-center justify-center p-6 border rounded'>
              <p className='text-md text-black text-center mb-4'>
                Kamu bisa memilih jenis ternak, jenis pakan, dan jenis perawatan di tabel ini
              </p>
              <button
                onClick={() => {
                  if (localStorage.getItem('uid') === null) {
                    setNoAccountModal(true);
                  } else if (localStorage.getItem('role') === 'admin') {
                    showTheModal('Terjadi Kesalahan!', 'Admin tidak dapat melakukan transaksi!');
                  } else {
                    if (confirmMaintenance != null) {
                      doTransaction();
                    }
                  }
                }}
                className='bg-[#145412C2] text-white px-8 py-2 rounded-lg tour-invest-button'
              >
                Investasi Sekarang
              </button>
            </div>

            {/* Section 2 - Goat */}
            <div className='p-4 border rounded'>
              {confirmGoat ? (
                <ConfirmCard data={confirmGoat} onRemove={() => setDeleteConfirm({ type: 'goat', show: true })} isHidden={confirmFood} />
              ) : (
                <PlaceholderCard label='Pilih jenis ternakmu' showButton={true} />
              )}
            </div>

            {/* Section 3 - Food */}
            <div className='p-4 border rounded'>
              {confirmFood ? (
                <ConfirmCard data={confirmFood} onRemove={() => setDeleteConfirm({ type: 'food', show: true })} isHidden={confirmMaintenance} />
              ) : (
                <PlaceholderCard label='Pilih jenis pakan ternakmu' showButton={!!confirmGoat} />
              )}
            </div>

            {/* Section 4 - Maintenance */}
            <div className='p-4 border rounded'>
              {confirmMaintenance ? (
                <ConfirmCard data={confirmMaintenance} onRemove={() => setDeleteConfirm({ type: 'maintenance', show: true })} />
              ) : (
                <PlaceholderCard label='Pilih jenis perawatan ternakmu' showButton={!!confirmFood} />
              )}
            </div>
          </div>


          <div id="options-container" className="w-full">
            <Loading show={!isDataReady} />
            {isDataReady && (
              confirmGoat && confirmFood && confirmMaintenance ? (
                <div className="w-full h-16 mt-4" />
              ) : (
                confirmGoat
                  ? (
                    confirmFood ? renderMaintenance() : renderFood()
                  )
                  : renderGoat()
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <Modal
        isOpen={deleteConfirm.show}
        onRequestClose={() => setDeleteConfirm({ type: '', show: false })}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: '#000000CC',
            zIndex: '100',
          },
        }}>
        <div className='bg-white rounded-xl p-4 w-[360px] text-black flex flex-col space-y-6'>
          <h1 className='text-lg font-bold text-[#333333]'>Yakin ingin menghapus pilihan ini?</h1>
          <div className='flex justify-end space-x-4'>
            <button
              className='px-4 py-2 text-gray-600 border border-gray-400 rounded-lg'
              onClick={() => setDeleteConfirm({ type: '', show: false })}>
              Batal
            </button>
            <button
              className='px-4 py-2 bg-red-600 text-white rounded-lg'
              onClick={() => {
                if (deleteConfirm.type === 'goat') setConfirmGoat(null);
                if (deleteConfirm.type === 'food') setConfirmFood(null);
                if (deleteConfirm.type === 'maintenance') setConfirmMaintenance(null);
                setDeleteConfirm({ type: '', show: false });
              }}>
              Hapus
            </button>
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