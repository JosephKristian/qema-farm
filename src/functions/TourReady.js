// src/utils/TourReady.js

export const setTourReady = () => {
    window.__isTourReady = true;
  };
  
  export const resetTourReady = () => {
    window.__isTourReady = false;
  };
  
  export const isTourReady = () => {
    return window.__isTourReady === true;
  };
  