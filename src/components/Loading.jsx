import React from 'react';
import Modal from 'react-modal';

// Pastikan untuk mengatur style Modal jika digunakan
Modal.setAppElement('#root');

const Loading = ({ show }) => {
  return (
    <Modal
      isOpen={show}
      contentLabel="Loading Modal"
      className="flex justify-center items-center w-full h-full z-50"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
    >
      <div className="max-w-[95vh] bg-[#F8F8F8] rounded-lg flex flex-row items-center space-x-4 shadow-xl p-4">
        <div className="loader"></div>
        <div className="flex-1 text-[#333333] font-medium text-base">
          <p>Permintaan sedang diproses! Mohon tunggu!</p>
        </div>
      </div>
    </Modal>
  );
};

export default Loading;
