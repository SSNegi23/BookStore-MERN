import React, { useEffect } from 'react';

const Spinner = () => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      // Enable scrolling on unmount
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-ping w-16 h-16 rounded-full bg-sky-600"></div>
    </div>
  );
};

export default Spinner;
