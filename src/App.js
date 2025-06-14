import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routeList from './RouteList';
import { TourProvider } from '@reactour/tour';
import TourStepsWrapper from './components/TourStepsWrapper';

const App = () => {
  return (
    <BrowserRouter>
      <TourProvider steps={[]} scrollSmooth>
        <TourStepsWrapper />
        <Routes>
          {routeList.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </TourProvider>
    </BrowserRouter>
  );
};

export default App;
