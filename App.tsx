import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateSeoContent } from './services/geminiService';
import type { SeoResult } from './types';
import { translations } from './translations';
import type { Language } from './translations';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [topic, setTopic] = useState<string>('');
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = t.title;
  }, [language, t.title]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError(t.errorEmptyInput);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSeoResult(null);

    try {
      const result = await generateSeoContent(topic);
      setSeoResult(result);
    } catch (err) {
      console.error(err);
      setError(t.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  }, [topic, t.errorEmptyInput, t.errorGeneric]);

  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header 
          t={t}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <div className="mt-8 max-w-4xl mx-auto">
          <InputArea
            topic={topic}
            setTopic={setTopic}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            t={t}
          />
          <ResultsDisplay
            result={seoResult}
            isLoading={isLoading}
            error={error}
            t={t}
          />
        </div>
      </main>
    </div>
  );
};

export default App;