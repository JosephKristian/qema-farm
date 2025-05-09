import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') != 'admin') {
      navigate('/', { replace: true });
    }
    return () => {

    }
  }, [])

  return (
    <div>
      {/* Navbar */}
      <NavbarAdmin />

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default HomeAdmin;