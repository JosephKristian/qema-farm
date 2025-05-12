import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routeList from './RouteList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
