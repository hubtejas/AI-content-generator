import React, { useEffect, useRef, useState } from 'react';

interface OutputPanelProps {
  isLoading: boolean;
  output: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse p-4">
    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    <div className="h-4 bg-slate-700 rounded w-1/2 mt-6"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-4/5"></div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-600 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.5 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-slate-400">Content Awaits</h3>
        <p className="mt-1 text-sm text-slate-500">Your AI-generated text will appear here.</p>
    </div>
);

export const OutputPanel: React.FC<OutputPanelProps> = ({ isLoading, output }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (contentRef.current && window.marked && output) {
      contentRef.current.innerHTML = window.marked.parse(output);
    }
  }, [output]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const showInitialState = !isLoading && !output;
  const showLoadingState = isLoading && !output;
  const showOutput = !!output;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col min-h-[60vh] lg:h-full relative border border-slate-700/50">
      {showOutput && (
         <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 z-10
            ${isCopied ? 'bg-green-600 text-white' : ''}`}
        >
            {isCopied ? 'Copied!' : 'Copy'}
        </button>
      )}

      <h2 className="text-lg font-semibold text-gray-100 mb-4 border-b border-slate-700 pb-2">Generated Output</h2>
      <div className="flex-grow overflow-y-auto pr-2">
        {showLoadingState && <LoadingSkeleton />}
        {showInitialState && <InitialState />}
        {showOutput && (
          <div
            ref={contentRef}
            className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-white prose-blockquote:border-indigo-500 prose-blockquote:text-gray-400 prose-code:bg-slate-900/50 prose-code:rounded-md prose-code:px-1.5 prose-code:py-1 prose-code:text-indigo-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 max-w-none"
          />
        )}
      </div>
    </div>
  );
};