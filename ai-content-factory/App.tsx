import React, { useState, useCallback } from 'react';
import { GenerationMode, Article } from './types';
import { generateContentStream } from './services/geminiService';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { OutputPanel } from './components/OutputPanel';
import { FINE_TUNE_SAMPLE_DATA } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.Standard);
  const [prompt, setPrompt] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModelTrained, setIsModelTrained] = useState<boolean>(false);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [fineTuneData, setFineTuneData] = useState<string>(FINE_TUNE_SAMPLE_DATA);
  
  const [ragContext, setRagContext] = useState<Article | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setOutput('');
    setRagContext(null);

    try {
      const { stream, relevantContext } = await generateContentStream({
        prompt,
        mode,
        temperature,
      });

      if (mode === GenerationMode.RAG) {
        setRagContext(relevantContext);
      }

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setOutput((prev) => prev + chunkText);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Generation failed:', errorMessage);
      setError(`Failed to generate content. Please check your API key and network connection. Details: ${errorMessage}`);
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, mode, temperature]);

  const handleTrainModel = useCallback(() => {
    setIsTraining(true);
    setError(null);
    setTimeout(() => {
      setIsTraining(false);
      setIsModelTrained(true);
    }, 3000); // Simulate training time
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-gray-200 flex flex-col">
      <Header />
      {error && (
        <div className="bg-red-900/80 backdrop-blur-sm border-l-4 border-red-500 text-red-100 p-4 mx-auto w-full max-w-7xl mt-4 rounded-r-lg" role="alert">
          <p className="font-bold">An Error Occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      <main className="flex-1 p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl mx-auto w-full">
        <ControlPanel
          mode={mode}
          setMode={setMode}
          prompt={prompt}
          setPrompt={setPrompt}
          temperature={temperature}
          setTemperature={setTemperature}
          isLoading={isLoading}
          handleGenerate={handleGenerate}
          isModelTrained={isModelTrained}
          isTraining={isTraining}
          handleTrainModel={handleTrainModel}
          fineTuneData={fineTuneData}
          setFineTuneData={setFineTuneData}
          ragContext={ragContext}
        />
        <OutputPanel isLoading={isLoading} output={output} />
      </main>
    </div>
  );
};

export default App;