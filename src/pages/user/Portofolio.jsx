import React, {useState} from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import InvestMonitoring from '../../components/InvestMonitoring';
import Navbar from '../../components/Navbar';
import PortofolioImage from '../../assets/portofolio.png';
import Money from '../../assets/money.png';
import Goat from '../../assets/goat-white.png';
import Maintenance from '../../assets/maintenance.png';
import Grass from '../../assets/grass.png';
import Decoration1 from '../../assets/decoration-box-1.png';
import Decoration2 from '../../assets/decoration-box-2.png';
import NoPortofolio from '../../assets/no_portofolio.png';

const Portofolio = () => {
  const numberFormatter = Intl.NumberFormat();
  const [specialDay, setSpecialDay] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const hargaAwal = [7120000, 7000000];
  const hargaBulan1 = [7200000, 7060000];
  const hargaBulan2 = [7260000, 7110000];
  const hargaBulan3 = [7300000, 7180000];
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className={localStorage.getItem('uid') === null ? 'hidden' : 'bg-[#dad6d6] flex flex-row flex-nowrap justify-center py-8 space-x-12 mb-12'}>
        <div className='w-fit flex justify-start items-end shadow-2xl'>
          <img src={PortofolioImage} alt='/' />
          <h1 className='bg-[#145412CF] p-10 rounded-tr-3xl text-white text-4xl font-bold absolute z-10'>Segera Buat Portofoliomu</h1>
        </div>
      </div>

      {/* Content */}
      <div className={localStorage.getItem('uid') === null ? 'hidden' : 'mx-16 grid grid-cols-4 gap-28 mb-4'}>
        {/* Left Panel */}
        <div className='col-span-1 grid grid-rows-4 gap-5'>
          <div className='rounded-2xl bg-[#D6F6D5] px-4 pb-4 flex flex-col justify-between space-y-4 items-start relative overflow-hidden shadow-lg'>
            <img src={Decoration1} alt='/' className='absolute right-0 mt-[-16px]' />
            <div className='bg-[#145412] rounded-md p-2'>
              <img src={Money} alt='/' />
            </div>
            <h3 className='text-black text-xl font-medium'>Jumlah uang sebelum investasi</h3>
            <p className='text-[#666666] text-sm font-normal'>Rp. 7.000.000</p>
            <p className='text-[#145412] text-sm font-normal w-4/5'>*jumlah uang saat investasi pertama</p>
          </div>
          <div className='rounded-2xl bg-[#D6F6D5] px-4 pb-4 flex flex-col justify-between space-y-4 items-start relative overflow-hidden shadow-lg'>
            <img src={Decoration2} alt='/' className='absolute right-0 bottom-0' />
            <div className='bg-[#145412] rounded-md p-2'>
              <img src={Goat} alt='/' />
            </div>
            <h3 className='text-black text-xl font-medium'>Jumlah kambing yang dimiliki</h3>
            <p className='text-[#666666] text-sm font-normal'>1 ekor</p>
            <p className='text-[#145412] text-sm font-normal w-4/5'>Tambah investasi</p>
          </div>
          <div className='rounded-2xl bg-[#D6F6D5] px-4 pb-4 flex flex-col justify-between space-y-4 items-start relative overflow-hidden shadow-lg'>
            <div src={Decoration2} alt='/' className='bg-transparent p-6 border-[20px] border-[#145412] absolute right-[-10%] top-[-10%] rounded-full' />
            <div className='bg-[#145412] rounded-md p-2'>
              <img src={Maintenance} alt='/' />
            </div>
            <h3 className='text-black text-xl font-medium'>Perawatan yang dipilih</h3>
            <p className='text-[#666666] text-sm font-normal'>Perawatan bulanan kambing dewasa paket 1</p>
            <p className='text-[#145412] text-sm font-normal w-4/5'>*akan ikut bertambah bersama kambing</p>
          </div>
          <div className='rounded-2xl bg-[#D6F6D5] px-4 pb-4 flex flex-col justify-between space-y-4 items-start relative overflow-hidden shadow-lg'>
            <div src={Decoration2} alt='/' className='bg-transparent p-6 border-[20px] border-[#145412] absolute right-[-10%] bottom-[-10%] rounded-full' />
            <div className='bg-[#145412] rounded-md p-2'>
              <img src={Grass} alt='/' />
            </div>
            <h3 className='text-black text-xl font-medium'>Pakan yang dipilih</h3>
            <p className='text-[#666666] text-sm font-normal'>Rumput 75%, hijauan kacangan 25% (200-250gr/ekor/hari</p>
            <p className='text-[#145412] text-sm font-normal w-4/5'>*ikut bertambah besama kambing</p>
          </div>
        </div>
        {/* Right Panel */}
        <div className='col-span-3 flex flex-col items-center'>
          <h1 className='text-black text-2xl font-bold mb-16'>Simulasi dan kalkulasi harga kambing per/3bulan</h1>
          <div className='w-full flex-1 flex-col border-2 border-[#EBEBEB] rounded-xl px-[18px] py-14'>
            <div className='flex flex-row justify-start space-x-8'>
              <button onClick={() => setSpecialDay(true)} className={specialDay ? 'border-[#145412] border-2 px-5 py-[10px] text-[#145412] text-xl font-normal rounded-full' : 'border-[#C2C2C2] border-2 px-5 py-[10px] text-[#C2C2C2] text-xl font-normal rounded-full'}>Idul Adha</button>
              <button onClick={() => setSpecialDay(false)} className={specialDay ? 'border-[#C2C2C2] border-2 px-5 py-[10px] text-[#C2C2C2] text-xl font-normal rounded-full' : 'border-[#145412] border-2 px-5 py-[10px] text-[#145412] text-xl font-normal rounded-full'}>Hari Biasa</button>
            </div>
            <div className='grid grid-cols-3 gap-6 mt-14'>
              <p className='text-black text-xl font-normal'>Jumlah kambing :</p>
              <div className='col-span-2 flex space-x-8'>
                <button onClick={() => setQuantity(quantity-1)} disabled={quantity === 0} className='text-black text-xl font-normal'><AiOutlineMinus size={16} color='#000000' /></button>
                <input type='number' value={quantity} onChange={(e) => e.target.value.length < 1 ? setQuantity(0) : setQuantity(parseInt(e.target.value))} pattern='0-9' className='w-20 outline-none border-2 border-[#C2C2C2] text-center p-2' />
                <button onClick={() => setQuantity(quantity+1)} className='text-black text-xl font-normal'><AiOutlinePlus size={16} color='#000000' /></button>
              </div>
              <p className='text-black text-xl font-normal'>harga awal kambing :</p>
              <p className='text-black text-xl font-normal col-span-2 '>Rp. {!specialDay ? numberFormatter.format(hargaAwal[1] * quantity).replaceAll(',', '.') : numberFormatter.format(hargaAwal[0] * quantity).replaceAll(',', '.')}</p>
              <p className='text-black text-xl font-normal'>Kalkulasi :</p>
              <div className='col-span-2'></div>
              <p className='text-black text-xl font-normal text-right'>Bulan 1 :</p>
              <p className='text-black text-xl font-normal col-span-2 '>Rp. {!specialDay ? numberFormatter.format(hargaBulan1[1] * quantity).replaceAll(',', '.') : numberFormatter.format(hargaBulan1[0] * quantity).replaceAll(',', '.')}</p>
              <p className='text-black text-xl font-normal text-right'>Bulan 2 :</p>
              <p className='text-black text-xl font-normal col-span-2 '>Rp. {!specialDay ? numberFormatter.format(hargaBulan2[1] * quantity).replaceAll(',', '.') : numberFormatter.format(hargaBulan2[0] * quantity).replaceAll(',', '.')}</p>
              <p className='text-black text-xl font-normal text-right'>Bulan 3 :</p>
              <p className='text-black text-xl font-normal col-span-2 '>Rp. {!specialDay ? numberFormatter.format(hargaBulan3[1] * quantity).replaceAll(',', '.') : numberFormatter.format(hargaBulan3[0] * quantity).replaceAll(',', '.')}</p>
            </div>
            <div className='flex-1 flex flex-col mt-12 items-start justify-center space-y-8'>
              <p className='text-[#333333] text-base font-normal'>*jika melakukan investasi kambing 5 bulan sebelum idul adha, maka penjualan kambing akan mengikuti kalkulasi harga idul adha, dan keuntungan akan semakin besar. namun jika pembelian dan penjualan dilakukan pada hari selalin idul adha harga akan mengikuti harga hari biasa.</p>
              <p className='text-[#218A1F] text-base font-normal'>*untuk bisa melihat kalkulasi harga pada hari biasa klik tombol hari biasa diatas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invest Monitoring */}
      {
        localStorage.getItem('uid') === null
          ? (<div className='w-full flex flex-col items-center space-y-4 px-4 mt-[90px] mb-16'>
            <img src={NoPortofolio} alt='/' className='w-[45%]' />
            <h1 className='text-black text-3xl font-extrabold'>Uppss! Kamu belum memiliki portofolio</h1>
            <h1 className='text-[#474747] text-3xl font-medium'>Daftarkan akunmu terlebih dahulu untuk mulai berinvestasi</h1>
            <button onClick={() => navigate('/login')} className='text-white text-sm font-medium bg-[#145412] p-4 rounded-[10px]'>Mulai Sekarang</button>
          </div>)
          : <InvestMonitoring />
      }

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Portofolio;