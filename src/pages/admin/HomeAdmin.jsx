import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllPackage, getAllPackageTransaction, getAllTransaction, getAllUser } from '../../functions/Database';

const HomeAdmin = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPackages: 0,
    totalTransactions: 0,
    totalPackageTransactions: 0,
  });



  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      navigate('/', { replace: true });
    }

    const fetchStats = async () => {
      try {
        const [users, packages, transactions, packageTransactions] = await Promise.all([
          getAllUser(),
          getAllPackage(),
          getAllTransaction(),
          getAllPackageTransaction()
        ]);

        setStats({
          totalUsers: users.length,
          totalPackages: packages.length,
          totalTransactions: transactions.length,
          totalPackageTransactions: packageTransactions.length
        });
      } catch (error) {
        console.error('Gagal memuat data statistik:', error);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavbarAdmin />
      <Sidebar />

      <div className="flex flex-col flex-1">

        <main className="p-6 bg-gray-100 pt-20">
          <h1 className="text-2xl font-semibold mb-6">Dasbor</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Total Pengguna" value={stats.totalUsers} />
            <DashboardCard title="Paket" value={stats.totalPackages} />
            <DashboardCard title="Transaksi" value={stats.totalTransactions} />
            <DashboardCard title="Paket Transaksi" value={stats.totalPackageTransactions} />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <p className="text-gray-700 text-lg font-medium mb-2">{title}</p>
    <p className="text-4xl font-bold text-gray-900">{value}</p>
  </div>
);

export default HomeAdmin;
