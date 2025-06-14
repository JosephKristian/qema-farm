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
import SearchBar from './pages/SearchPage';
import FAQ from './pages/user/FAQ';

const routeList = [
  { path: '/', element: <Home /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/search', element: <SearchBar /> },
  { path: '/investasi', element: <Investasi /> },
  { path: '/portofolio', element: <Portofolio /> },
  { path: '/breeding', element: <Breeding /> },
  { path: '/artikel', element: <Article /> },
  { path: '/profil', element: <Profile /> },
  { path: '/admin', element: <HomeAdmin /> },
  { path: '/pengguna', element: <UsersAdmin /> },
  { path: '/kambing', element: <Goat /> },
  { path: '/pakan', element: <Food /> },
  { path: '/perawatan', element: <Maintenance /> },
  { path: '/paket', element: <Package /> },
  { path: '/transaksi', element: <Transaction /> },
  { path: '/trans_paket', element: <PackageTransaction /> },
  { path: '/profil_admin', element: <ProfileAdmin /> },
  { path: '/confirmation/:transaction', element: <Confirmation /> },
  { path: '/confirmation_package/:thepackage', element: <ConfirmationPackage /> },
];

export default routeList;
