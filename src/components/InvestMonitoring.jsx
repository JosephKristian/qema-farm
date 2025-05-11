import React from 'react';
import GreenRect from '../assets/green-rect.png';
import LeftBottomDecoration from '../assets/left-bottom-decoration.png';
import RightTopDecoration from '../assets/right-top-decoration.png';

const InvestMonitoring = () => {
  return (
    <div className="w-full relative">
      <img src={GreenRect} alt="/" className="w-full min-h-screen lg:h-auto object-cover z-0" />
      <img src={RightTopDecoration} alt="/" className="absolute top-0 right-0 z-10" />
      <img src={LeftBottomDecoration} alt="/" className="absolute left-0 bottom-0 z-10" />

      {/* Grid for content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between w-full h-full lg:px-16 px-8 space-x-4 z-20 absolute top-0">

        {/* Left Section with Text */}
        <div className="flex flex-col justify-center text-center lg:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Monitoring Investasimu
          </h1>
          <p className="text-sm md:text-base lg:text-xl text-white max-w-md mx-auto lg:mx-0">
            Monitoring pertumbuhan dan perkembangan kambingmu secara realtime melalui video CCTV yang telah kami siapkan disamping.
          </p>
        </div>

        {/* Right Section with Video */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="aspect-w-16 aspect-h-9 w-full lg:w-[80%] mx-auto">
            <iframe
              src="https://www.youtube.com/embed/-zM9Szhww_I"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestMonitoring;
