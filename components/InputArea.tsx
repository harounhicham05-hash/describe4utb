import React from 'react';
import { SparklesIcon } from './icons';
import type { Translations } from '../translations';

interface InputAreaProps {
  topic: string;
  setTopic: (topic: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  t: Translations;
}

export const InputArea: React.FC<InputAreaProps> = ({ topic, setTopic, onGenerate, isLoading, t }) => {
  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg border border-brand-primary">
      <label htmlFor="video-topic" className="block text-lg font-semibold mb-2 text-brand-text-primary">
        {t.inputLabel}
      </label>
      <textarea
        id="video-topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={t.inputPlaceholder}
        className="w-full h-20 p-3 bg-brand-bg border border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent focus:outline-none transition-all duration-300 text-brand-text-secondary placeholder-gray-500 text-start"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.analyzingButton}
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            {t.generateButton}
          </>
        )}
      </button>
    </div>
  );
};