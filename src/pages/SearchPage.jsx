
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pages = [
  { title: 'Investasi', path: '/investasi' },
  { title: 'Portofolio', path: '/portofolio' },
  { title: 'Breeding', path: '/breeding' },
  { title: 'Artikel', path: '/artikel' },
  { title: 'Profil', path: '/profil' },
  { title: 'Admin', path: '/admin' },
  { title: 'Pengguna', path: '/pengguna' },
  { title: 'Kambing', path: '/kambing' },
  { title: 'Pakan', path: '/pakan' },
  { title: 'Perawatan', path: '/perawatan' },
  { title: 'Paket', path: '/paket' },
  { title: 'Transaksi', path: '/transaksi' },
  { title: 'Transaksi Paket', path: '/trans_paket' },
  { title: 'Profil Admin', path: '/profil_admin' },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(value)
    );
    setSuggestions(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = pages.find(page =>
      page.title.toLowerCase() === query.trim()
    );

    if (match) {
      navigate(match.path);
    } else {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cari halaman..."
          className="w-full border px-4 py-2 rounded-md"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full rounded-md mt-1 z-10">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => navigate(item.path)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
