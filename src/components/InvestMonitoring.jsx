import React from 'react';
import GreenRect from '../assets/green-rect.png';
import LeftBottomDecoration from '../assets/left-bottom-decoration.png';
import RightTopDecoration from '../assets/right-top-decoration.png';

const InvestMonitoring = () => {
  return (
    <div className='w-full relative'>
      <img src={GreenRect} alt='/' className='w-full z-0' />
      <img src={RightTopDecoration} alt='/' className='absolute top-0 right-0 z-10' />
      <img src={LeftBottomDecoration} alt='/' className='absolute left-0 bottom-0 z-0' />
      <div className='grid grid-cols-2 justify-between w-full h-full lg:px-16 px-8 space-x-4 z-20 absolute top-0'>
        <div className='flex flex-col items-start justify-between h-full relative'>
          <h1 className='md:text-[36px] text-3xl font-bold text-white absolute top-1/4'>Monitoring investasimu</h1>
          <p className='max-w-[500px] text-white md:text-xl text-base font-normal absolute top-2/4'>Monitoring pertumbuhan dan perkembangan kambingmu secara realtime melalui video CCTV yang telah kami siapkan disamping.</p>
        </div>
        <div className='h-full relative'>
          <iframe src="https://www.youtube.com/embed/-zM9Szhww_I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className='w-full lg:mx-0 mx-4 h-1/2 absolute top-1/3 rounded-2xl'></iframe>
        </div>
      </div>
    </div>
  );
}

export default InvestMonitoring;