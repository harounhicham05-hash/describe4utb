import React from 'react';
import { YouTubeIcon, LanguageIcon } from './icons';
import type { Translations, Language } from '../translations';

interface HeaderProps {
    t: Translations;
    language: Language;
    toggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ t, language, toggleLanguage }) => {
  return (
    <header className="relative text-center pb-8 border-b border-brand-primary/20">
      <div className="absolute top-0 start-0">
         <button
          onClick={toggleLanguage}
          aria-label={t.languageAriaLabel}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-brand-surface text-brand-text-secondary hover:bg-brand-primary"
        >
          <LanguageIcon className="w-5 h-5" />
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <YouTubeIcon className="w-16 h-16 text-brand-accent"/>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-brand-accent to-pink-500">
          {t.headerTitle}
        </h1>
      </div>
      <p className="text-lg md:text-xl text-brand-text-secondary">
        {t.headerSubtitle}
      </p>
    </header>
  );
};