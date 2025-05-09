import React from 'react';
import Modal from 'react-modal';

const Loading = ({ show }) => {
  return (
    <div className={show ? 'max-w-[95vh] fixed bottom-4 left-4 rounded-lg bg-[#F8F8F8] flex flex-row items-center space-x-4 shadow-xl p-4 z-50' : 'hidden'}>
      <div className='loader'></div>
      <div className='flex-1 text-[#333333] font-medium text-base'>
        <p>Permintaan sedang diproses! Mohon tunggu!</p>
      </div>
    </div>
  );
}

export default Loading;