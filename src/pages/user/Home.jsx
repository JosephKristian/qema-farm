import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as Chartjs,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dashboard from '../../assets/dashboard.png';
import Goat from '../../assets/goat.png';
import Plant from '../../assets/plant.png';
import Task from '../../assets/task.png';
import InvestMonitoring from '../../components/InvestMonitoring';
import Slide1 from '../../assets/slide_1.png';
import Slide2 from '../../assets/slide_2.png';
import Slide3 from '../../assets/slide_3.png';
import GoatWhite from '../../assets/goat-white.png';
import Maintenance from '../../assets/maintenance.png';
import Grass from '../../assets/grass.png';

const Home = () => {
  const navigate = useNavigate();
  const [visibleModal, setVisibleModal] = useState(false);
  const [goatContent, setGoatContent] = useState(false);
  const [foodContent, setFoodContent] = useState(false);
  const [maintenanceContent, setMaintenanceContent] = useState(false);
  const [articleIndex, setArticleIndex] = useState(0);
  const [data, setData] = useState({
    labels: ['Marica', 'Boer', 'Jawarandu', 'Gembrong', 'PE', 'Kacang', 'Etawa'],
    datasets: [
      {
        label: 'betina',
        data: ['Marica', 'Boer', 'Jawarandu', 'Gembrong', 'PE', 'Kacang', 'Etawa'].map(() => Math.floor(Math.random() * 100)),
        borderColor: '#FA595B',
        backgroundColor: '#FA595B',
      },
      {
        label: 'jantan',
        data: ['Marica', 'Boer', 'Jawarandu', 'Gembrong', 'PE', 'Kacang', 'Etawa'].map(() => Math.floor(Math.random() * 100)),
        borderColor: '#F9C74F',
        backgroundColor: '#F9C74F',
      },
    ],
  });
  const articles = [
    {
      title: 'Kotoran Kambing sebagai pupuk untuk tanaman sayur',
      short_desc: 'Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara',
      desc: "Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara\
Kotoran ternak dapat dimanfaatkan sebagai pupuk kandang karena kandungan unsur hara seperti nitrogen (N), fosfor (P), dan kalium (K) yang dibutuhkan oleh tanaman dan kesuburan tanah. Salah satu kotoran ternak yang dapat digunakan untuk pupuk kandang adalah kotoran kambing. Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara.\
Kotoran kambing yang masih segar bersifat panas karena kandungan amoniaknya terbilang cukup tinggi. Itu sebabnya kotoran kambing tidak bisa langsung digunakan sebagai pupuk karena dapat membakar tanaman. Kotoran tersebut baru bisa digunakan sebagai pupuk setelah melalui proses fermentasi.\
Proses fermentasi berguna untuk mengurai bahan-bahan organik yang ada di dalam kotoran menjadi unsur hara yang stabil dan mudah diserap oleh tanaman. Fermentasi juga berguna untuk membunuh bakteri jahat dan pathogen yang berada di dalam kotoran. Kedua mikroorganisme tersebut dapat menjadi sumber penyakit bagi tanaman. Kotoran yang masih mentah juga mengandung biji-biji gulma atau rumput yang memungkinkan untuk tumbuh kembali apabila kotoran yang masih segar langsung digunakan sebagai pupuk. Kotoran yang sudah disortir langsung dihamparkan secara merata menjadi lapisan yang agak tipis agar memudahkan proses selanjutnya. Siapkan 5 liter air dan EM4 agar proses fermentasi pupuk kandang berjalan lebih cepat. Di dalam EM4 terdapat bakteri menguntungkan yang masih tertidur atau dorman. Bakteri tersebut dapat diaktifkan dengan cara dikocok terlebih dahulu, kemudian dicampurkan dengan air bersih.\
Untuk 100 kg kotoran kambing dibutuhkan 2 tutup botol cairan EM4 dan dicampurkan dengan 5 liter air. Tambahkan molasses, tetes tebu, gula pasir, atau gula merah sebanyak 100 gram sebagai sumber nutrisi bagi bakteri-bakteri tersebut. Aduk hingga semua bahan tercampur merata dan diamkan hingga bakteri di dalam EM4 mulai aktif. Setelah itu, masukkan larutan ke sprayer agar mudah diaplikasikan.",
      image: Slide1,
    },
    {
      title: 'Fermentasi kotoran kambing',
      short_desc: 'Kotoran kambing yang masih segar bersifat panas karena kandungan amoniaknya terbilang cukup tinggi. Itu sebabnya kotoran kambing tidak bisa langsung digunakan sebagai pupuk karena dapat membakar tanaman. Kotoran tersebut baru bisa digunakan sebagai pupuk setelah melalui proses fermentasi.',
      desc: "Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara\
Kotoran ternak dapat dimanfaatkan sebagai pupuk kandang karena kandungan unsur hara seperti nitrogen (N), fosfor (P), dan kalium (K) yang dibutuhkan oleh tanaman dan kesuburan tanah. Salah satu kotoran ternak yang dapat digunakan untuk pupuk kandang adalah kotoran kambing. Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara.\
Kotoran kambing yang masih segar bersifat panas karena kandungan amoniaknya terbilang cukup tinggi. Itu sebabnya kotoran kambing tidak bisa langsung digunakan sebagai pupuk karena dapat membakar tanaman. Kotoran tersebut baru bisa digunakan sebagai pupuk setelah melalui proses fermentasi.\
Proses fermentasi berguna untuk mengurai bahan-bahan organik yang ada di dalam kotoran menjadi unsur hara yang stabil dan mudah diserap oleh tanaman. Fermentasi juga berguna untuk membunuh bakteri jahat dan pathogen yang berada di dalam kotoran. Kedua mikroorganisme tersebut dapat menjadi sumber penyakit bagi tanaman. Kotoran yang masih mentah juga mengandung biji-biji gulma atau rumput yang memungkinkan untuk tumbuh kembali apabila kotoran yang masih segar langsung digunakan sebagai pupuk. Kotoran yang sudah disortir langsung dihamparkan secara merata menjadi lapisan yang agak tipis agar memudahkan proses selanjutnya. Siapkan 5 liter air dan EM4 agar proses fermentasi pupuk kandang berjalan lebih cepat. Di dalam EM4 terdapat bakteri menguntungkan yang masih tertidur atau dorman. Bakteri tersebut dapat diaktifkan dengan cara dikocok terlebih dahulu, kemudian dicampurkan dengan air bersih.\
Untuk 100 kg kotoran kambing dibutuhkan 2 tutup botol cairan EM4 dan dicampurkan dengan 5 liter air. Tambahkan molasses, tetes tebu, gula pasir, atau gula merah sebanyak 100 gram sebagai sumber nutrisi bagi bakteri-bakteri tersebut. Aduk hingga semua bahan tercampur merata dan diamkan hingga bakteri di dalam EM4 mulai aktif. Setelah itu, masukkan larutan ke sprayer agar mudah diaplikasikan.",
      image: Slide2,
    },
    {
      title: 'Implementasi TTG Berupa Pengolah Kotoran Kambing Menjadi Serbuk',
      short_desc: 'Tim mengimplementasikan teknologi tepat guna berupa peralatan pengolah kotoran kambing menjadi serbuk di Kelompok Ternak Kambing, Kingdom-8. Hal tersebut didasari belum maksimalnya pengolahan limbah kotoran kambing yang berada di kelompok tersebut.',
      desc: "Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara\
Kotoran ternak dapat dimanfaatkan sebagai pupuk kandang karena kandungan unsur hara seperti nitrogen (N), fosfor (P), dan kalium (K) yang dibutuhkan oleh tanaman dan kesuburan tanah. Salah satu kotoran ternak yang dapat digunakan untuk pupuk kandang adalah kotoran kambing. Kotoran kambing digunakan sebagai pupuk kandang didasari oleh alasan bahwa kotoran kambing memiliki kandungan unsur hara relatif lebih seimbang dibanding pupuk alam lainnya dan kotoran kambing bercampur dengan air seninya (urine) yang juga mengandung unsur hara.\
Kotoran kambing yang masih segar bersifat panas karena kandungan amoniaknya terbilang cukup tinggi. Itu sebabnya kotoran kambing tidak bisa langsung digunakan sebagai pupuk karena dapat membakar tanaman. Kotoran tersebut baru bisa digunakan sebagai pupuk setelah melalui proses fermentasi.\
Proses fermentasi berguna untuk mengurai bahan-bahan organik yang ada di dalam kotoran menjadi unsur hara yang stabil dan mudah diserap oleh tanaman. Fermentasi juga berguna untuk membunuh bakteri jahat dan pathogen yang berada di dalam kotoran. Kedua mikroorganisme tersebut dapat menjadi sumber penyakit bagi tanaman. Kotoran yang masih mentah juga mengandung biji-biji gulma atau rumput yang memungkinkan untuk tumbuh kembali apabila kotoran yang masih segar langsung digunakan sebagai pupuk. Kotoran yang sudah disortir langsung dihamparkan secara merata menjadi lapisan yang agak tipis agar memudahkan proses selanjutnya. Siapkan 5 liter air dan EM4 agar proses fermentasi pupuk kandang berjalan lebih cepat. Di dalam EM4 terdapat bakteri menguntungkan yang masih tertidur atau dorman. Bakteri tersebut dapat diaktifkan dengan cara dikocok terlebih dahulu, kemudian dicampurkan dengan air bersih.\
Untuk 100 kg kotoran kambing dibutuhkan 2 tutup botol cairan EM4 dan dicampurkan dengan 5 liter air. Tambahkan molasses, tetes tebu, gula pasir, atau gula merah sebanyak 100 gram sebagai sumber nutrisi bagi bakteri-bakteri tersebut. Aduk hingga semua bahan tercampur merata dan diamkan hingga bakteri di dalam EM4 mulai aktif. Setelah itu, masukkan larutan ke sprayer agar mudah diaplikasikan.",
      image: Slide3,
    }
  ];
  const goats = [
    {
      name: 'ETAWA',
      desccription: 'Kambing etawa ini merupakan kambing yang diternakkan sebagai penghasil daging dan susu. Berat kambing peranakan etawa jantan dewasa berkisar 40 kilogram dan betina dewasanya memiliki berat 35 kilogram.',
    },
    {
      name: 'PE (PERANAKAN ETAWA)',
      desccription: 'Kambing PE merupakan hasil perkawinan dari spesies kambing kacang dan spesies kambing etawa sehingga terkenal dengan nama peranakan etawa. Jenis ini mampu tumbuh dengan baik di berbagai wilayah di Indonesia, khususnya di pulau jawa. Ukuran kambing ini juga relatif besar, yaitu mencapai 91 kg untuk seekor jantan dewasa.',
    },
    {
      name: 'JAWARANDU',
      desccription: 'Spesies hasil persilangan dari kambing PE dan kambing kacang ini memiliki postur relatif mungkin jika dibandingkan jenis kambing lainnya. Rata-rata kambing jawarandu dewasa memiliki bobot sekitar 40 kg dengan telinga panjang, lebar, hingga terkulai di samping wajah.',
    },
    {
      name: 'KACANG',
      desccription: 'Jenis kambing kacang merupakan salah satu ras unggul yang banyak diternakan di Indonesia. Kambing ini memiliki ciri utama yaitu tubuh mungil dengan bobot sekitar 20 kg hingga 30 kg untuk ukuran dewasa.',
    },
    {
      name: 'GEMBRONG',
      desccription: 'Kambing gembrong terkenal karena kelebatan bulunya yang nyari menyerupai seekor anjing dewasa. Bulu lebat ini bisa tubuh hingga 30 cm dan akan berkilau mengkilap ketika terpapar sinar matahari.',
    },
    {
      name: 'MARICA',
      desccription: 'kambing ini memiliki daya tahan tubuh paling baik sehingga mampu beradaptasi di musim kemarau dan lingkungan kering sekalipun.',
    },
    {
      name: 'BOER',
      desccription: 'Kambing boer merupakan jenis kambing qurban 2020 yang memiliki bobot tubuh relatif besar, yaitu bisa mencapai 150 kg untuk seekor jantan dewasa. Kelebihan lainnya jika menggunakan kambing ini sebagai kurban adalah karena memiliki karkas mencapai 50% dari total massa tubuhnya.',
    },
  ];
  const foods = [
    {
      name: 'PAKAN UNTUK KAMBING MUDA',
      desccription: 'rumput 60 %, hijauan kacang-kacangan 40 % dan pemberian konsentrat 200 - 250 gram/ekor/hari.  Cocok untuk kambing yang sedang dalam masa pertumbuhan.',
    },
    {
      name: 'PAKAN UNTUK KAMBING JANTAN DEWASA',
      desccription: 'rumput 75 %, %, hijauan kacang-kacangan 25 % dan pemberian konsentrat 200 - 250 gram/ekor/hari. Untuk kambing jantan dewasa biasa yang bukan pemacek.',
    },
    {
      name: 'PAKAN UNTUK KAMBING BETINA DEWASA',
      desccription: 'rumput 75 %, %, hijauan kacang-kacangan 25 % dan pemberian konsentrat 200 - 250 gram/ekor/hari. Untuk kambing betina dewasa biasa yang bukan indukan hamil atau menyususi.',
    },
    {
      name: 'PAKAN UNTUK KAMBING BETINA HAMIL',
      desccription: 'rumput 60 %, hijauan kacang-kacangan 40 % dan pemberian konsentrat 200 - 250 gram/ekor/hari.',
    },
    {
      name: 'PAKAN UNTUK KAMBING BETINA MENYUSUI',
      desccription: 'rumput 50 %, %, hijauan kacang-kacangan 50 % dan pemberian konsentrat 200 - 250 gram/ekor/hari.',
    },
    {
      name: 'PAKAN UNTUK KAMBING PEMACEK',
      desccription: 'rumput 75 %, %, hijauan kacang-kacangan 25 % dan pemberian konsentrat 200 - 250 gram/ekor/hari.',
    },
    {
      name: 'PAKAN UNTUK KAMBING ANAKAN',
      desccription: 'rumput/ hijauan secukupnya dan susu indukan.',
    },
  ];
  const maintenances = [
    {
      name: 'PERAWATAN STANDART/BULAN',
      desccription: 'pemberian vitamin rutin mingguan. pemeriksaan dokter bulanan rutin. Perawatan ini cocok untuk seua jenis kambing yang dalam tahap pertumbuhan (muda) ataupun kambing dewasa.',
    },
    {
      name: 'PERAWATAN INDUKAN/BULAN',
      desccription: 'vitamin indukan hamil dan pemeriksaan bulanan, pemberian nutrisi lebih. perawatan ini cocok untuk kambing betina yang akan dijadikan indukan atau kambing betina yang sedang dalam fase kehamilan atau menyusui.',
    },
    {
      name: 'PERAWATAN ANAK KAMBING',
      desccription: 'pemberian vitamin khusus anak kambing, susu tambahan dan pemeriksaan rutin. perawatan jenis ini cocok untuk semua jenis anak kambing mulai dari baru lahir hingga 1 bulan pertama. ',
    },
    {
      name: 'PERAWATAN KAMBING PEMACEK',
      desccription: 'pemberian vitamin khusus kambing pemacek dan pemeriksaan secara rutin. perawatan jenis ini cocok untuk kambing jantan yang dijadikan pemacek untuk breeding.',
    },
  ];

  Chartjs.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  useEffect(() => {
    if (visibleModal) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [visibleModal]);

  const closeModal = () => {
    setGoatContent(false);
    setFoodContent(false);
    setMaintenanceContent(false);
    setVisibleModal(false);
  }

  const renderContent = () => {
    if (goatContent) {
      return (<div className='flex flex-col space-y-4'>
        {goats.map((element) => (
          <div className='flex flex-row justify-between space-x-4'>
            <div className='bg-[#145412] self-start rounded-[5px] p-2'>
              <img src={GoatWhite} alt='/' className='w-6 h-6' />
            </div>
            <div className='flex-1 flex flex-col space-y-[10px]'>
              <p className='text-base text-[#333333] font-semibold uppercase'>{element.name}</p>
              <p className='text-base text-[#474747] font-normal'>{element.desccription}</p>
            </div>
          </div>
        ))}
      </div>);
    } else if (foodContent) {
      return (<div className='flex flex-col space-y-4'>
        {foods.map((element) => (
          <div className='flex flex-row justify-between space-x-4'>
            <div className='bg-[#145412] self-start rounded-[5px] p-2'>
              <img src={Maintenance} alt='/' className='w-6 h-6' />
            </div>
            <div className='flex-1 flex flex-col space-y-[10px]'>
              <p className='text-base text-[#333333] font-semibold uppercase'>{element.name}</p>
              <p className='text-base text-[#474747] font-normal'>{element.desccription}</p>
            </div>
          </div>
        ))}
      </div>);
    }
    return (<div className='flex flex-col space-y-4'>
      {maintenances.map((element) => (
        <div className='flex flex-row justify-between space-x-4'>
          <div className='bg-[#145412] self-start rounded-[5px] p-2'>
            <img src={Grass} alt='/' className='w-6 h-6' />
          </div>
          <div className='flex-1 flex flex-col space-y-[10px]'>
            <p className='text-base text-[#333333] font-semibold uppercase'>{element.name}</p>
            <p className='text-base text-[#474747] font-normal'>{element.desccription}</p>
          </div>
        </div>
      ))}
    </div>);
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className='gradient-green-yellow h-[86vh] w-full rounded-b-[40%] flex sm:flex-row flex-col-reverse items-center sm:px-16 px-8 pt-4 pb-[10vh]'>
        <div className='flex-1 flex flex-col items-start text-white'>
          <h1 className='lg:text-6xl md:text-4xl sm:text-4xl mb-6 font-bold'>SELAMAT DATANG DI QEMAFARM!</h1>
          <div className='flex border-l-[#FCD403] border-l-[10px] pl-4 lg:text-base text-sm'>
            <p>QEMA FARM membantu anda untuk dapat berinvestasi  di sektor rill secara mudah dan terpercaya. dapatkan mabing investasimu di sini, dan dapatkan kekuntungan maksismal bersama kami!</p>
          </div>
          <button onClick={() => navigate('investasi')} className='mt-6 py-2 px-6 bg-[#FCD403] rounded-tl-2xl rounded-br-2xl text-[#021701] font-semibold md:text-base text-sm'>Mulai Sekarang</button>
        </div>
        <div className='sm:flex-1 sm:mb-0 mb-4'>
          <img src={Dashboard} alt='/' />
        </div>
      </div>

      {/* Card Panel */}
      <div className='w-full flex items-center sm:mt-[-10vh] mt-[8vh] mb-24'>
        <div className='flex sm:flex-row flex-col p-4 bg-[#145412BF] mx-auto rounded-[20px]'>
          <div onClick={() => {
            setGoatContent(true);
            setVisibleModal(true);
          }} className='w-36 m-4 bg-[#EBF7EA] py-6 px-4 flex flex-col space-y-5 items-center rounded-lg cursor-pointer'>
            <img src={Goat} alt='/' className='w-7 h-7' />
            <p className='font-semibold text-[16px] text-[#333333] text-center'>Jenis kambing</p>
            <p className='font-semibold text-[16px] text-[#333333] text-center'>{goats.length}</p>
          </div>
          <div onClick={() => {
            setFoodContent(true);
            setVisibleModal(true);
          }} className='w-36 m-4 bg-[#EBF7EA] py-6 px-4 flex flex-col space-y-5 items-center rounded-lg cursor-pointer'>
            <img src={Plant} alt='/' className='w-7 h-7' />
            <p className='font-semibold text-[16px] text-[#333333] text-center'>Jenis pakan</p>
            <p className='font-semibold text-[16px] text-[#333333] text-center'>{foods.length}</p>
          </div>
          <div onClick={() => {
            setMaintenanceContent(true);
            setVisibleModal(true);
          }} className='w-36 m-4 bg-[#EBF7EA] py-6 px-4 flex flex-col space-y-5 items-center rounded-lg cursor-pointer'>
            <img src={Task} alt='/' className='w-7 h-7' />
            <p className='font-semibold text-[16px] text-[#333333] text-center'>perawatan</p>
            <p className='font-semibold text-[16px] text-[#333333] text-center'>{maintenances.length}</p>
          </div>
        </div>
      </div>

       {/* Graphic of Traffic Market */}
      <div className='flex flex-col items-center mb-24'>
        <div className='w-full border-l-[64px] border-l-[#218A1F] sm:text-[26px] text-xl font-bold text-[#218A1F] pl-8 mb-6'>
          <p>Pergerakan Harga Jual Kambing Per Desember</p>
          <p>2022</p>
        </div>
        <div className='flex flex-col lg:w-[896px] w-full sm:mx-8 mx-2 p-7 bg-white shadow-md'>
          <p className='mb-4 font-medium sm:text-lg text-base text-black'>HARGA TERTINGGI</p>
          <h3 className='mb-8 font-medium sm:text-2xl text-xl text-black'>Rp. 35.000.000</h3>
          <p className='mb-6 font-medium sm:text-lg text-[#4F4F4F]'>Etawa jantan</p>
          <div className='w-full h-60vh'>
            <Bar data={data} options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }} />
          </div>
        </div>
      </div>
      {/* Invest Monitoring */}
      <InvestMonitoring />

      {/* Article Panel */}
      <div className='w-full flex flex-col items-center pt-16 mb-24 bg-[#EBEBEB]'>
        <div className='w-full border-l-[64px] border-l-[#218A1F] text-[26px] font-bold text-[#218A1F] pl-8 mb-16'>
          <p>Ketahui Pengolahan Limbah Kotoran</p>
          <p>Kambing Kamu!</p>
        </div>
        <div className='lg:w-[1024px] w-full mt-16 pb-12 flex lg:px-0 px-4'>
          {/* Left button */}
          <div className='max-h-[500px] flex items-center'>
            <button onClick={() => {
              if (articleIndex <= 0) {
                setArticleIndex(prev => articles.length - 1);
              } else {
                setArticleIndex(prev => articleIndex - 1);
              }
            }} className='bg-[#218A1F] hover:bg-[#145412] py-4 px-2 flex lg:block md:hidden'>
              <AiOutlineLeft color='#FFFFFF' size={18} />
            </button>
          </div>

          {/* Article Content */}
          <div className='bg-[#218A1F] max-h-[500px] lg:ml-[15%] rounded-br-[25%] overflow-visible grid grid-cols-1 lg:grid-cols-2 gap-4 mx-2'>
            <div className='lg:ml-[-15%]'>
              <img src={articles[articleIndex].image} alt='/' className='rounded-bl-[25%] w-full h-auto' />
            </div>
            <div className='flex flex-col justify-between py-4 px-4'>
              <div className='gradient-green-transparent py-4 px-4'>
                <h3 className='text-[#FCFCFC] text-lg font-bold'>{articles[articleIndex].title}</h3>
              </div>
              <div className='px-4'>
                <p className='text-[#FCFCFC] text-sm font-normal'>{articles[articleIndex].short_desc}</p>
              </div>
              <div className='px-4'>
                <button className='font-semibold text-[12px] text-white w-[120px] py-2 rounded-full bg-[#145412]' onClick={() => navigate('/artikel', { state: { article: articles[articleIndex] } })}>Baca</button>
              </div>
            </div>
          </div>

          {/* Right button */}
          <div className='max-h-[500px] flex items-center'>
            <button onClick={() => {
              if (articleIndex === (articles.length - 1)) {
                setArticleIndex(prev => 0);
              } else {
                setArticleIndex(prev => articleIndex + 1);
              }
            }} className='bg-[#218A1F] hover:bg-[#145412] py-4 px-2 flex lg:block md:hidden'>
              <AiOutlineRight color='#FFFFFF' size={18} />
            </button>
          </div>
        </div>
      </div>


      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal
        isOpen={visibleModal}
        onRequestClose={() => closeModal()}
        style={{
          content: {
            position: "absolute",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            alignContent: 'center',
            borderRadius: '16px',
            zIndex: "1000",
            padding: "8px",
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '1000',
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            overflowY: "hidden",
            overflowX: "hidden",
          }
        }} >

        <div className='bg-transparent rounded-xl p-4 min-w-[320px] max-w-full text-black flex flex-col space-y-[5px]'>
          <div className='self-end'>
            <button onClick={() => closeModal()} className='bg-[#CCCCCC] p-2'><AiOutlineClose size={12} color='#28303F' /></button>
          </div>
          {renderContent()}
        </div>

      </Modal>
    </div>
  );
}

export default Home;