
import React from 'react';

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    <path d="M15.732 6.268a8.002 8.002 0 01-3.232 9.464A8.002 8.002 0 014.268 4.268a8.002 8.002 0 019.464-3.232c1.313.386 2.5 1.21 3.464 2.432.386 1.313.386 2.736 0 4.048a7.95 7.95 0 01-1.464 2.752zM10 2a8 8 0 100 16 8 8 0 000-16z" opacity="0.1" />
    <path d="M10 3.5a1.5 1.5 0 011.5 1.5v.562a2.5 2.5 0 00-3 0V5A1.5 1.5 0 0110 3.5zM12.5 6a2.5 2.5 0 00-5 0v4.085a4.5 4.5 0 004.5 4.414V10.5a.5.5 0 011 0v4a.5.5 0 01-1 0v-.5a5.5 5.5 0 01-5.5-5.5V6a2.5 2.5 0 005 0z" opacity="0.4"/>
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <div className="flex items-center justify-center gap-4">
        <LeafIcon />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            AI Gardening Assistant
          </h1>
          <p className="text-green-600 mt-1">Identify plants and get expert care advice instantly.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
