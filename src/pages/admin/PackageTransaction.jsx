import React, { useState, useReducer, useEffect } from 'react'
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { packageTransactionReducer } from '../../config/Reducer';
import { getAllPackageTransaction, getUserData, saveWeight, saveWeightPackageTransacion } from '../../functions/Database';
// import NoAvatar from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const PackageTransaction = () => {
  const format = Intl.NumberFormat();
  let index = 0;
  const [state, dispatch] = useReducer(packageTransactionReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [packageModal, setPackageModal] = useState(false);
  const [packageSelected, setPackageSelected] = useState({});
  const [packageUser, setPackageUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState([]);
  // const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllPackageTransaction();
    return () => { }
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const getUser = async (uid) => {
    try {
      setLoading(true);
      await getUserData(uid).then(
        (resolve) => {
          setPackageUser(resolve);
          setPackageModal(true);
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const retrieveAllPackageTransaction = async () => {
    try {
      const transactions = await getAllPackageTransaction();

      const transactionsWithUserData = await Promise.all(
        transactions.map(async (tx) => {
          const userData = await getUserData(tx.user);
          return {
            ...tx,
            userData,
          };
        })
      );
      console.log(JSON.stringify(transactionsWithUserData, null, 2));

      const sortedTransactions = transactionsWithUserData.sort((a, b) => b.created_at - a.created_at);

      dispatch({
        type: 'retrieve_package_transaction',
        data: [...sortedTransactions],
      });
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  };


  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      <div className='flex flex-row justify-start'>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className='flex-1 flex flex-col items-center space-y-4 px-4 sm:px-6 md:px-10 my-[90px] overflow-y-auto'>
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[800px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className="text-white text-xs sm:text-sm md:text-base">
                  {[
                    "No. Paket",
                    "Nama",
                    "Kode Pemilik",
                    "Tanggal Dibuat",
                    "Tanggal Konfirmasi",
                    "Paket",
                    "Harga",
                    "Status",
                    "Berat Live",
                    "Aksi"
                  ].map((header, idx) => (
                    <th key={idx} className="bg-gray-600 border border-white py-3 px-2 text-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.map((element, index) => (
                  <tr
                    key={element.uid}
                    className={`${index % 2 === 0 ? "bg-gray-100" : ""} text-xs sm:text-sm md:text-base font-medium`}
                  >
                    {/* No. Paket */}
                    <td className="border border-slate-200 p-2 text-[#333333] max-w-[160px] truncate" title={element.uid}>
                      {element.key || element.uid}
                    </td>

                    {/* Nama */}
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">
                      {element.userData?.name || "-"}
                    </td>

                    <td className="border border-slate-200 p-2 text-[#333333] max-w-[140px] truncate whitespace-nowrap" title={element.user}>
                      {element.user}
                    </td>

                    <td className="border border-slate-200 p-2 text-[#333333]">
                      {element.created_at
                        ? new Date(element.created_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>
                    <td className="border border-slate-200 p-2 text-[#333333]">
                      {element.confirmed_at
                        ? new Date(element.confirmed_at).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : '-'}
                    </td>

                    {/* Paket */}
                    <td className="border border-slate-200 p-2 text-[#333333] capitalize">{element.name}</td>

                    {/* Harga */}
                    <td className="border border-slate-200 p-2 text-[#EA341B] text-sm">
                      {element.discount_price != null ? (
                        <div className="flex flex-col space-y-1">
                          <span className="line-through text-[#999999] text-xs">
                            Rp. {format.format(element.price).replaceAll(",", ".")}
                          </span>
                          <span className="text-[#EA341B] text-base font-semibold">
                            Rp. {format.format(element.discount_price).replaceAll(",", ".")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#EA341B] text-sm font-medium">
                          Rp. {format.format(element.price).replaceAll(",", ".")}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="border border-slate-200 p-2 text-center">
                      {element.confirmed ? (
                        <span role="img" aria-label="confirmed" className="text-green-600 text-xl">
                          ✔️
                        </span>
                      ) : (
                        <span role="img" aria-label="pending" className="text-yellow-500 text-xl">
                          ⏳
                        </span>
                      )}
                    </td>
                    <td className="border border-slate-200 p-2 text-center">{element.weight || '-'} kg </td>
                    {/* Aksi */}
                    <td className="border border-slate-200 p-2 text-nowrap">
                      <div className="flex flex-col sm:flex-row sm:space-x-2 sm:items-center space-y-2 sm:space-y-0">
                        <button
                          onClick={() => {
                            getUser(element.user);
                            setPackageSelected(element);
                          }}
                          className="bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2 text-xs sm:text-sm"
                        >
                          Detail
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          placeholder="Berat (kg)"
                          className="border border-gray-300 rounded px-2 py-1 text-xs w-20"
                          value={weights[index] || ''}
                          onChange={(e) => {
                            const updatedWeights = [...weights];
                            updatedWeights[index] = e.target.value;
                            setWeights(updatedWeights);
                          }}
                        />
                        <button
                          onClick={async () => {
                            await saveWeightPackageTransacion(element.key , weights[index]);
                            await retrieveAllPackageTransaction();
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Simpan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Package Modal */}
      <Modal
        isOpen={packageModal}
        onRequestClose={() => setPackageModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '95vh',
          },
          overlay: {
            color: '#00000000',
            backgroundColor: '#000000CC',
            zIndex: '100'
          }
        }} >

        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          {/* Transaction ID */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>No. Transaksi</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.key}</p>
          </div>
          {/* Customer Name */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Konsumen</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageUser ? packageUser.name : ''}</p>
          </div>
          {/* Package Name */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama Paket</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.name ? packageSelected.name : ''}</p>
          </div>
          {/* Package Desciption */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Deskripsi Paket</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{packageSelected.description ? packageSelected.description : ''}</p>
          </div>
          {/* Package Price */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Harga</p>
            <p className='text-base font-medium text-[#145412] flex-1'>Rp. <span className={packageSelected.discount_price != null ? 'line-through text-[#333333] font-normal' : 'text-[#145412] text-sm font-medium'}>{format.format(packageSelected.price).replaceAll(',', '.')}</span> <span className='text-[#145412] text-base font-semibold'>{packageSelected.discount_price != null ? format.format(packageSelected.discount_price).replaceAll(',', '.') : ''}</span></p>
          </div>
          {/* Package Status */}
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Status</p>
            <p className={packageSelected.confirmed ? 'text-base font-medium text-[#145412] flex-1' : 'text-base font-medium text-[#EA341B] flex-1'}>{packageSelected.confirmed ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}</p>
          </div>
          {/* Button */}
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            {packageSelected.confirmed ? <div></div> : <button onClick={() => navigate(`/confirmation_package/${packageSelected.key}`)} className='bg-[#145412] hover:bg-[#0f410d] rounded-lg text-white px-4 py-2'>Konfirmasi</button>}
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setPackageModal(false)}>Oke</button>
          </div>
        </div>

      </Modal>

      {/* Loading */}
      <Loading show={loading} />

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
    </div>
  );
}

export default PackageTransaction;