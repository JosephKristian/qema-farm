import React, { useEffect, useState } from 'react';
import { AiOutlineLineChart, AiOutlineRise } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import PortofolioImage from '../../assets/portofolio.png';
import Footer from '../../components/Footer';
import InvestMonitoring from '../../components/InvestMonitoring';
import Navbar from '../../components/Navbar';
import Money from '../../assets/money.png';
import Goat from '../../assets/goat-white.png';
import Decoration1 from '../../assets/decoration-box-1.png';
import Decoration2 from '../../assets/decoration-box-2.png';
import NoPortofolio from '../../assets/no_portofolio.png';
import { getAllGoat, getAllTransaction } from '../../functions/Database';

// Format angka
const numberFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});



const Portofolio = () => {
  const [specialDay, setSpecialDay] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [userTransactions, setUserTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem('uid');

  const [averagePrice, setAveragePrice] = useState(3500000);
  const [loadingPrices, setLoadingPrices] = useState(true);
  // Harga awal per ekor
  useEffect(() => {
    const fetchHargaKambing = async () => {
      try {
        const goats = await getAllGoat();
        if (goats.length === 0) {
          setAveragePrice(3500000);
          setLoadingPrices(false);
          return;
        }

        const total = goats.reduce((sum, goat) => sum + (goat.price || 0), 0);
        const avg = Math.round(total / goats.length); // rata-rata harga
        setAveragePrice(avg);
      } catch (error) {
        console.error('Gagal mengambil data harga kambing:', error);
        setAveragePrice(3500000); // fallback
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchHargaKambing();
  }, []);

  // Asumsikan naik 30% saat Idul Adha
  const persentaseNaik = 0.3; // 30%

  const hargaIdulAdha = averagePrice * (1 + persentaseNaik);
  const hargaBiasa = averagePrice;

  // Harga per bulan (naik bertahap)
  const hargaBulan1 = hargaBiasa * 1.06; // +6%
  const hargaBulan2 = hargaBulan1 * 1.06; // +6%
  const hargaBulan3 = hargaBulan2 * 1.06; // +6%

  useEffect(() => {
    if (!uid) return;

    getAllTransaction().then((data) => {
      const filtered = data
        .filter(trx => trx.user === uid)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Urut dari terbaru ke terlama

      setUserTransactions(filtered);
      setLoading(false);
    });
  }, [uid]);


  // Kalkulasi
  const calculateInvestment = (transactions) => {
    const totalGoat = transactions.length;
    const initialPrice = transactions[0]?.goat?.price || 0;
    const totalInvested = transactions.reduce((acc, trx) => acc + (trx.goat?.price || 0), 0);
    const estimatedProfit = totalInvested * 0.2; // Asumsi keuntungan 20%
    const totalNow = totalInvested + estimatedProfit;

    return {
      initialPrice,
      totalGoat,
      totalInvested,
      estimatedProfit,
      totalNow
    };
  };

  if (!uid) {
    return (
      <>
        <Navbar />
        <div className={`${localStorage.getItem('uid') === null ? 'hidden' : 'bg-[#dad6d6] flex justify-center py-8 px-4 sm:px-8 mb-12'}`}>
          <div className="relative w-full max-w-6xl">
            <img src={PortofolioImage} alt="/" className="w-full h-auto rounded-xl shadow-xl" />
            <h1 className="absolute top-4 left-4 sm:top-10 sm:left-10 bg-[#145412CF] p-4 sm:p-10 rounded-tr-3xl text-white text-2xl sm:text-4xl font-bold z-10">Segera Buat Portofoliomu</h1>
          </div>
        </div>

        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Silakan login terlebih dahulu</h1>
            <p className="text-gray-500">Halaman ini hanya tersedia untuk pengguna terdaftar.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={`${localStorage.getItem('uid') === null ? 'hidden' : 'bg-[#dad6d6] flex justify-center py-8 px-4 sm:px-8 mb-12'}`}>
          <div className="relative w-full max-w-6xl">
            <img src={PortofolioImage} alt="/" className="w-full h-auto rounded-xl shadow-xl" />
            <h1 className="absolute top-4 left-4 sm:top-10 sm:left-10 bg-[#145412CF] p-4 sm:p-10 rounded-tr-3xl text-white text-2xl sm:text-4xl font-bold z-10">Segera Buat Portofoliomu</h1>
          </div>
        </div>
        <div className="min-h-screen flex items-center justify-center text-center">
          <div className="text-lg font-medium text-gray-600">Memuat data portofolio...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (userTransactions.length === 0) {
    return (
      <>
        <Navbar />
        <div className={`${localStorage.getItem('uid') === null ? 'hidden' : 'bg-[#dad6d6] flex justify-center py-8 px-4 sm:px-8 mb-12'}`}>
          <div className="relative w-full max-w-6xl">
            <img src={PortofolioImage} alt="/" className="w-full h-auto rounded-xl shadow-xl" />
            <h1 className="absolute top-4 left-4 sm:top-10 sm:left-10 bg-[#145412CF] p-4 sm:p-10 rounded-tr-3xl text-white text-2xl sm:text-4xl font-bold z-10">Segera Buat Portofoliomu</h1>
          </div>
        </div>
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Belum ada portofolio</h2>
            <p className="text-gray-500">Anda belum memiliki transaksi investasi.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { initialPrice, totalGoat, totalInvested, estimatedProfit, totalNow } = calculateInvestment(userTransactions);

  const data = [
    {
      image: <img src={Money} alt="uang" className="w-10 h-10" />,
      title: 'Jumlah uang sebelum investasi',
      desc: numberFormatter.format(initialPrice),
      note: '*jumlah uang saat investasi pertama',
      deco: Decoration1
    },
    {
      image: <img src={Goat} alt="kambing" className="w-10 h-10" />,
      title: 'Jumlah kambing diinvestasikan',
      desc: `${totalGoat} ekor`,
      note: '*total transaksi investasi',
      deco: Decoration2
    },
    {
      image: <AiOutlineLineChart className="w-10 h-10 text-blue-500" />,
      title: 'Perkiraan nilai saat ini',
      desc: numberFormatter.format(totalNow),
      note: '*perkiraan nilai berdasarkan investasi awal dan keuntungan',
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Top Panel */}
      <div className={`${localStorage.getItem('uid') === null ? 'hidden' : 'bg-[#dad6d6] flex justify-center py-8 px-4 sm:px-8 mb-12'}`}>
        <div className="relative w-full max-w-6xl">
          <img src={PortofolioImage} alt="/" className="w-full h-auto rounded-xl shadow-xl" />
          <h1 className="absolute top-4 left-4 sm:top-10 sm:left-10 bg-[#145412CF] p-4 sm:p-10 rounded-tr-3xl text-white text-2xl sm:text-4xl font-bold z-10">Segera Buat Portofoliomu</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-12">
          {/* Left Panel */}
          <div className="grid grid-cols-1 gap-6">
            {data.map((item, index) => (
              <div key={index} className="rounded-2xl bg-[#D6F6D5] px-4 pb-4 pt-6 relative overflow-hidden shadow-lg flex flex-col space-y-4">
                {item.deco && <img src={item.deco} alt="/" className="absolute right-0 bottom-0 w-16 opacity-20" />}
                <div className="bg-[#145412] rounded-md p-2 w-fit">
                  {item.image}
                </div>
                <h3 className="text-black text-base sm:text-xl font-medium">{item.title}</h3>
                <p className="text-[#666666] text-sm">{item.desc}</p>
                <p className="text-[#145412] text-sm w-4/5">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <h1 className='text-black text-lg sm:text-2xl font-bold mb-6 text-center'>Simulasi dan kalkulasi harga ternak per/3bulan</h1>
            <div className='w-full border-2 border-[#EBEBEB] rounded-xl px-4 sm:px-6 py-10 sm:py-14'>
              {/* Button for selecting special day */}
              <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
                <button
                  onClick={() => setSpecialDay(true)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-xl font-medium border-2 ${specialDay ? 'border-[#145412] text-[#145412]' : 'border-[#C2C2C2] text-[#C2C2C2]'}`}
                >
                  Idul Adha
                </button>
                <button
                  onClick={() => setSpecialDay(false)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-xl font-medium border-2 ${!specialDay ? 'border-[#145412] text-[#145412]' : 'border-[#C2C2C2] text-[#C2C2C2]'}`}
                >
                  Hari Biasa
                </button>
              </div>

              {/* Quantity and price calculations */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-base sm:text-xl'>
                <p className='font-medium'>Jumlah Ternak :</p>
                <div className='sm:col-span-2 flex items-center space-x-4'>
                  <button
                    onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                    disabled={quantity === 0}
                    className="disabled:opacity-50"
                  >
                    <AiOutlineMinus size={20} />
                  </button>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                    className='w-20 border-2 text-center p-2 rounded-md'
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <AiOutlinePlus size={20} />
                  </button>
                </div>
                {loadingPrices ? (
                  <p>Memuat harga ternak...</p>
                ) : (
                  <>
                    {/* Tombol +/- dan input quantity */}
                  </>
                )}

                <p className='font-medium'>Harga Awal Ternak :</p>
                <p className='sm:col-span-2'>
                  Rp. {numberFormatter.format((specialDay ? hargaIdulAdha : hargaBiasa) * quantity).replaceAll(',', '.')}
                </p>

                {/* Di bagian map harga bulanan */}
                {[hargaBulan1, hargaBulan2, hargaBulan3].map((harga, idx) => (
                  <React.Fragment key={idx}>
                    <p className='text-right'>Bulan {idx + 1} :</p>
                    <p className='sm:col-span-2'>
                      Rp. {numberFormatter.format((specialDay ? hargaIdulAdha : harga) * quantity).replaceAll(',', '.')}
                    </p>
                  </React.Fragment>
                ))}
              </div>

              {/* Additional Info */}
              <div className='mt-10 space-y-4 text-sm sm:text-base'>
                <p className='text-[#333333]'>
                  *jika melakukan investasi ternak 5 bulan sebelum Idul Adha, maka penjualan ternak akan mengikuti kalkulasi harga Idul Adha, dan keuntungan akan semakin besar. namun jika pembelian dan penjualan dilakukan pada hari selain Idul Adha harga akan mengikuti harga hari biasa.
                </p>
                <p className='text-[#218A1F]'>
                  *untuk bisa melihat kalkulasi harga pada hari biasa klik tombol hari biasa diatas
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* Tabel Detail Kepemilikan Kambing */}
      {uid && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Detail Kepemilikan Ternak</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Kode Ternak</th>
                  <th className="py-2 px-4 border">Berat Awal (kg)</th>
                  <th className="py-2 px-4 border">Berat Terkini (kg)</th>
                  <th className="py-2 px-4 border">Harga Investasi</th>
                  <th className="py-2 px-4 border">Tanggal Dibuat</th>       {/* Kolom baru */}
                  <th className="py-2 px-4 border">Tanggal Konfirmasi</th>  {/* Kolom baru */}
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((trx, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="py-2 px-4 border">{idx + 1}</td>
                    <td className="py-2 px-4 border">{trx.goat?.code || `${trx.goat?.livestockTypes}-${trx.goat?.name}-${trx.goat?.type}-${uid?.slice(0, 4).toUpperCase()}${trx.uid}`}</td>
                    <td className="py-2 px-4 border">{trx.goat?.weight ? `${trx.goat.weight} kg` : '-'}</td>
                    <td className="py-2 px-4 border">{trx.weight ? `${trx.weight} kg` : '-'}</td>
                    <td className="py-2 px-4 border">
                      Rp. {numberFormatter.format(trx.goat?.price || 0).replaceAll(',', '.')}
                    </td>
                    <td className="py-2 px-4 border">
                      {trx.created_at
                        ? new Date(trx.created_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>
                    <td className="py-2 px-4 border">
                      {trx.confirmed_at
                        ? new Date(trx.confirmed_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Invest Monitoring or No Portofolio */}
      {uid === null ? (
        <div className="w-full flex flex-col items-center space-y-4 px-4 mt-20 mb-16 text-center">
          <img src={NoPortofolio} alt="/" className="w-full max-w-sm sm:max-w-md" />
          <h1 className="text-black text-2xl sm:text-3xl font-extrabold">Uppss! Kamu belum memiliki portofolio</h1>
          <h1 className="text-[#474747] text-lg sm:text-2xl font-medium">Daftarkan akunmu terlebih dahulu untuk mulai berinvestasi</h1>
        </div>
      ) : (
        <InvestMonitoring transactions={userTransactions} />
      )}

      <Footer />
    </div>
  );
};

export default Portofolio;
