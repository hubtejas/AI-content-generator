import React from 'react';

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.75c0 .907.034 1.79.096 2.652a1 1 0 00.998.921h2.812a1 1 0 00.998-.921c.062-.862.096-1.745.096-2.652 0-.907-.034-1.79-.096-2.652a1 1 0 00-.998-.921H10.5a1 1 0 00-.998.921c-.062.862-.096 1.745-.096 2.652z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12.75V15s0 1.5 1.5 1.5 1.5-1.5 1.5-1.5v-2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5V9s0-1.5 1.5-1.5 1.5 1.5 1.5 1.5v1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75c.877-1.14 1.34-2.5 1.34-3.938" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.41 14.812c0 1.438.463 2.798 1.34 3.938" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 5.25c.877 1.14 1.34 2.5 1.34 3.938" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.41 9.188c0-1.438.463-2.798 1.34-3.938" />
  </svg>
);


export const Header: React.FC = React.memo(() => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <BrainIcon />
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 text-transparent bg-clip-text">AI Content Factory</h1>
          </div>
          <div className="text-sm text-gray-400">Advanced Generation Suite</div>
        </div>
      </div>
    </header>
  );
});