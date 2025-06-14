import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Loading from '../../components/Loading';
import { confirmTransaction, getTransaction, getUserData } from '../../functions/Database';
import Navbar from '../../components/Navbar';

const Confirmation = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { transaction } = useParams();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    retrieveTransaction();
    return () => { }
  }, [])

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  }

  const retrieveTransaction = async () => {
    try {
      setLoading(true);
      await getTransaction(transaction).then(
        async (resolve) => {
          console.log(resolve)
          setTransactionData(resolve);
          await getUserData(resolve.user).then(
            (resolve) => {
              setUserData(resolve);
            },
            (reject) => { throw reject; }
          )
        },
        (reject) => { throw reject; }
      );
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    } finally {
      setLoading(false);
    }
  }

  const confirmOrder = async () => {
    try {
      setLoading(true);
      await confirmTransaction(transaction, transactionData).then(
        (resolve) => {
          showTheModal('Sukses!', 'Transaksi telah dikonfirmasi!');
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
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl p-4 w-full max-w-xl mx-auto text-black flex flex-col space-y-4 shadow-md">
          {/* Nama Konsumen */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Nama Konsumen</label>
            <p className="border border-gray-200 rounded-md p-2">{userData?.name || ''}</p>
          </div>

          {/* Nama Kambing */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Nama Kambing</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.goat?.name || ''}</p>
          </div>

          {/* Jenis */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Jenis</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.goat?.livestockTypes || ''}</p>
          </div>
          
          {/* Kategori Umur */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Kategori Umur</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.goat?.type || ''}</p>
          </div>

          {/* Berat per Waktu */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Berat per Waktu</label>
            <p className="border border-gray-200 rounded-md p-2">
              {transactionData ? `${transactionData.goat.weight} kg / ${transactionData.goat.time} Bulan` : ''}
            </p>
          </div>

          {/* Jenis Kelamin */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.goat?.sex || ''}</p>
          </div>

          {/* Harga */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Harga</label>
            <p className="border border-gray-200 rounded-md text-red-600 font-semibold p-2">
              Rp. {transactionData?.goat?.price?.toLocaleString().replaceAll(',', '.') || '0'}
            </p>
          </div>

          {/* Pakan */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Pakan</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.food?.name || ''}</p>
          </div>

          {/* Perawatan */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Perawatan</label>
            <p className="border border-gray-200 rounded-md p-2">{transactionData?.maintenance?.name || ''}</p>
          </div>

          {/* Tombol Konfirmasi */}
          {transactionData?.confirmed === false && (
          <div className="flex justify-end pt-4">
            <button
              onClick={confirmOrder}
              className="bg-green-700 hover:bg-green-800 transition text-white font-semibold px-4 py-2 rounded-lg"
            >
              Konfirmasi
            </button>
          </div>
          )}

          {transactionData?.confirmed === true && (
          <div className="p-4 bg-green-100 text-green-800 rounded-md font-semibold">
            Transaksi sudah dikonfirmasi ✅
          </div>
        )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={visibleModal}
        onRequestClose={() => {
          setVisibleModal(false);
          window.location.reload();
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: '#00000099',
            zIndex: '100',
          },
        }}
      >
        <div className="p-4 w-full max-w-sm text-black space-y-6">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-base font-medium text-green-800">{description}</p>
          <div className="flex justify-end">
            <button
             onClick={() => {
              setVisibleModal(false);
              window.location.reload();
            }}            
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg"
            >
              Oke, Siap
            </button>
          </div>
        </div>
      </Modal>

      {/* Loading */}
      <Loading show={loading} />
    </div>
  );
}

export default Confirmation;