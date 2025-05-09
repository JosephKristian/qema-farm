import React , {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/user/Home';
import Investasi from './pages/user/Investasi';
import Portofolio from './pages/user/Portofolio';
import Breeding from './pages/user/Breeding';
import Article from './pages/user/Article';
import Profile from './pages/user/Profile';
import HomeAdmin from './pages/admin/HomeAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';
import Goat from './pages/admin/Goat';
import Food from './pages/admin/Food';
import Maintenance from './pages/admin/Maintenance';
import Transaction from './pages/admin/Transaction';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import Confirmation from './pages/admin/Confirmation';
import ConfirmationPackage from './pages/admin/ConfirmationPackage';
import PackageTransaction from './pages/admin/PackageTransaction';
import Package from './pages/admin/Package';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/investasi' element={<Investasi />} />
        <Route path='/portofolio' element={<Portofolio />} />
        <Route path='/breeding' element={<Breeding />} />
        <Route path='/artikel' element={<Article />} />
        <Route path='/profil' element={<Profile />} />
        <Route path='/admin' element={<HomeAdmin />} />
        <Route path='/pengguna' element={<UsersAdmin />} />
        <Route path='/kambing' element={<Goat />} />
        <Route path='/pakan' element={<Food />} />
        <Route path='/perawatan' element={<Maintenance />} />
        <Route path='/paket' element={<Package />} />
        <Route path='/transaksi' element={<Transaction />} />
        <Route path='/trans_paket' element={<PackageTransaction />} />
        <Route path='/profil_admin' element={<ProfileAdmin />} />
        <Route path='/confirmation/:transaction' element={<Confirmation />} />
        <Route path='/confirmation_package/:thepackage' element={<ConfirmationPackage />} />
        {/* <Route element={<UsersAdmin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
