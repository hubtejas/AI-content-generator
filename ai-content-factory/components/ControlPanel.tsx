import React from 'react';
import { GenerationMode, Article } from '../types';

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.5 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

const WrenchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-4.5-4.5a2.652 2.652 0 010-3.749l4.5-4.5a2.652 2.652 0 013.749 0l4.5 4.5a2.652 2.652 0 010 3.749l-4.5 4.5a2.652 2.652 0 01-3.749 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L4.5 19.5" />
    </svg>
);

const DocumentSearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25l-2.636 2.636m0 0l-2.636-2.636M16.864 16.886l2.636-2.636M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5H8.25v-1.5h7.5v1.5zM15.75 13.5H8.25v-1.5h7.5v1.5z" />
        <path d="M13.5 7.5H8.25v-1.5h5.25v1.5z" />
    </svg>
);


interface ControlPanelProps {
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  isLoading: boolean;
  handleGenerate: () => void;
  isModelTrained: boolean;
  isTraining: boolean;
  handleTrainModel: () => void;
  fineTuneData: string;
  setFineTuneData: (data: string) => void;
  ragContext: Article | null;
}

const TabButton: React.FC<{
  label: string;
  description: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, description, Icon, isActive, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`group relative text-left p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500
      ${isActive ? 'bg-slate-700/60 shadow-lg' : 'bg-slate-800/80 hover:bg-slate-700/40'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    <div className="flex items-center space-x-3">
        <Icon className={`w-7 h-7 transition-colors ${isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
        <span className={`font-semibold text-base transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{label}</span>
    </div>
    <p className={`mt-2 text-xs transition-colors pr-2 ${isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}`}>{description}</p>
  </button>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({
  mode, setMode, prompt, setPrompt, temperature, setTemperature,
  isLoading, handleGenerate, isModelTrained, isTraining,
  handleTrainModel, fineTuneData, setFineTuneData, ragContext
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col space-y-6 h-full border border-slate-700/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <TabButton label="Standard" description="General-purpose content generation." Icon={SparklesIcon} isActive={mode === GenerationMode.Standard} onClick={() => setMode(GenerationMode.Standard)} />
        <TabButton label="Fine-Tuned" description="Uses your custom-trained model." Icon={WrenchIcon} isActive={mode === GenerationMode.FineTuned} onClick={() => setMode(GenerationMode.FineTuned)} disabled={!isModelTrained} />
        <TabButton label="RAG" description="Answers from knowledge base." Icon={DocumentSearchIcon} isActive={mode === GenerationMode.RAG} onClick={() => setMode(GenerationMode.RAG)} />
      </div>

      <div className="flex-grow flex flex-col space-y-4">
        <div className="flex-grow flex flex-col">
           <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Your Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === GenerationMode.RAG 
              ? "Ask a question based on our knowledge base..."
              : "e.g., Write a blog post about the future of AI..."
            }
            className="w-full flex-grow p-3 bg-slate-700/50 border border-slate-600 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-200 resize-none placeholder-gray-500"
          />
        </div>
        
        {mode === GenerationMode.RAG && ragContext && (
          <div className="bg-slate-900/50 p-3 rounded-lg animate-fade-in text-sm border border-slate-700">
            <h4 className="font-semibold text-indigo-400">Context Found:</h4>
            <p className="text-gray-300">Using article: <span className="font-medium text-white">"{ragContext.title}"</span></p>
          </div>
        )}

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-300">
            Creativity (Temperature): <span className="font-bold text-indigo-400">{temperature.toFixed(1)}</span>
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
          />
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          {isModelTrained ? (
              <div className="text-center">
                  <h3 className="font-semibold text-lg text-green-400 mb-2">Training Complete!</h3>
                  <p className="text-sm text-gray-400">
                      Your custom model is ready. Select the 'Fine-Tuned' tab to generate specialized content.
                  </p>
              </div>
          ) : (
              <>
                  <h3 className="font-semibold text-lg text-indigo-400 mb-2">Train a Custom Model</h3>
                  <p className="text-sm text-gray-400 mb-3">Provide prompt-completion pairs in JSONL format to simulate fine-tuning.</p>
                  <textarea
                      value={fineTuneData}
                      onChange={(e) => setFineTuneData(e.target.value)}
                      placeholder="Paste your JSONL data here..."
                      rows={5}
                      className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-md shadow-inner text-sm text-gray-200 resize-y"
                  />
                  <button
                      onClick={handleTrainModel}
                      disabled={isTraining || !fineTuneData}
                      className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 disabled:opacity-50 disabled:cursor-wait"
                  >
                      {isTraining ? (
                          <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Training...
                          </>
                      ) : 'Train Model'}
                  </button>
              </>
          )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt}
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-100"
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </div>
  );
};