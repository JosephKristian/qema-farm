import React, { useState, useReducer, useEffect } from 'react';
import Modal from 'react-modal';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { userReducer } from '../../config/Reducer';
import { getAllUser } from '../../functions/Database';
import NoAvatar from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const UsersAdmin = () => {
  const [state, dispatch] = useReducer(userReducer, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(''); // NEW
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/', { replace: true });
    }
    retrieveAllUser();
  }, []);

  const showTheModal = (title, description) => {
    setTitle(title);
    setDescription(description);
    setVisibleModal(true);
  };

  const retrieveAllUser = async () => {
    try {
      const result = await getAllUser();
      dispatch({
        type: 'retrieve_user',
        data: [...result],
      });
    } catch (error) {
      showTheModal('Terjadi Kesalahan!', error.toString());
    }
  };

  const filteredUsers = state.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase().trim());
    const matchesRole = roleFilter === '' || e.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <NavbarAdmin />
      <div className='flex flex-row justify-start'>
        <Sidebar />

        {/* Content */}
        <div className='flex-1 flex flex-col items-center space-y-4 px-4 sm:px-6 md:px-10 my-[90px] overflow-y-auto'>
          {/* Search & Filter */}
          <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Cari Nama Pengguna...'
              className='flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#145412]'
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className='border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#145412]'
            >
              <option value=''>Semua Role</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </div>

          {/* Table */}
          <div className='w-full py-6 rounded-lg border border-slate-300 bg-slate-200 shadow-md overflow-x-auto'>
            <table className="bg-white w-full min-w-[700px] table-fixed border-collapse border text-sm">
              <thead>
                <tr className='text-white text-xs sm:text-sm md:text-base'>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Nama</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Email</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>No. Whatsapp</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Role</th>
                  <th className='bg-gray-600 border border-white py-4 px-2 sm:px-4'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((element, index) => (
                  <tr key={element.uid} className={`${index % 2 === 0 ? 'bg-gray-100' : ''} text-xs sm:text-sm md:text-base font-medium`}>
                    <td className={`border border-slate-200 p-2 capitalize ${element.role === 'admin' ? 'text-[#145412]' : 'text-[#333333]'}`}>
                      {element.name}
                    </td>
                    <td className={`border border-slate-200 p-2 break-all ${element.role === 'admin' ? 'text-[#145412]' : 'text-[#333333]'}`}>
                      {element.email}
                    </td>
                    <td className={`border border-slate-200 p-2 capitalize ${element.role === 'admin' ? 'text-[#145412]' : 'text-[#333333]'}`}>
                      {element.phone}
                    </td>
                    <td className={`border border-slate-200 p-2 capitalize ${element.role === 'admin' ? 'text-[#145412]' : 'text-[#333333]'}`}>
                      {element.role}
                    </td>
                    <td className='border border-slate-200 p-2'>
                      <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                        <button
                          onClick={() => {
                            setUserSelected(element);
                            setUserModal(true);
                          }}
                          className='bg-gray-800 hover:bg-gray-700 rounded-lg text-white px-4 py-2 w-full sm:w-auto text-xs sm:text-sm'
                        >
                          Detail
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

      {/* Modal Detail User */}
      <Modal
        isOpen={userModal}
        onRequestClose={() => setUserModal(false)}
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
        }}
      >
        <div className='bg-transparent rounded-xl p-2 min-w-[420px] min-h-[280px] text-black flex flex-col justify-between space-y-4'>
          <img src={userSelected.avatar === undefined || userSelected.avatar.length < 1 ? NoAvatar : userSelected.avatar} alt='/' className='self-center rounded-full w-[160px] h-[160px] mb-4' />
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Nama</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{userSelected.name}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>Email</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{userSelected.email}</p>
          </div>
          <div className='flex flex-row justify-between items-center space-x-8'>
            <p className='text-base font-medium text-[#333333] flex-1'>No. Whatsapp</p>
            <p className='text-base font-medium text-[#145412] flex-1'>{userSelected.phone}</p>
          </div>
          <div className='flex flex-row justify-end items-center space-x-4 pt-8'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setUserModal(false)}>Oke</button>
          </div>
        </div>
      </Modal>

      {/* Modal Dialog Error */}
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
            backgroundColor: '#000000CC',
            zIndex: '100',
          }
        }}
      >
        <div className='bg-transparent rounded-xl p-2 w-[360px] h-[280px] text-black flex flex-col justify-between space-y-6'>
          <h1 className='text-xl font-bold text-[#333333]'>{title}</h1>
          <p className='flex-1 text-base font-medium text-[#145412]'>{description}</p>
          <div className='flex flex-row justify-end items-center space-x-4'>
            <button className='bg-[#145412] px-4 py-2 rounded-lg text-white font-semibold text-base' onClick={() => setVisibleModal(false)}>Oke, Siap</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
