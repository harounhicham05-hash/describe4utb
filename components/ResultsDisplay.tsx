import React from 'react';
import type { SeoResult, Source, KeywordData } from '../types';
import { CopyButton } from './CopyButton';
import { LoadingSpinner } from './LoadingSpinner';
import { LinkIcon, ExternalLinkIcon } from './icons';
import type { Translations } from '../translations';

interface ResultsDisplayProps {
  result: SeoResult | null;
  isLoading: boolean;
  error: string | null;
  t: Translations;
}

const KeywordsTable: React.FC<{ items: KeywordData[]; t: Translations }> = ({ items, t }) => {
  if (!items || items.length === 0) return null;

  const keywordsToCopy = items.map(item => item.keyword).join(', ');

  return (
    <div className="bg-brand-surface p-6 rounded-xl border border-brand-primary animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-brand-accent">{t.resultsKeywords}</h3>
        <CopyButton textToCopy={keywordsToCopy} t={t} />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-4 pb-2 border-b border-brand-primary/50 text-sm font-semibold text-brand-text-secondary">
            <div className="col-span-1">{t.keywordHeader}</div>
            <div className="col-span-1 text-center">{t.volumeHeader}</div>
            <div className="col-span-1 text-center">{t.suitabilityHeader}</div>
          </div>
          {/* Body */}
          <div className="divide-y divide-brand-primary/20">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                <div className="col-span-1 font-medium text-brand-text-primary">{item.keyword}</div>
                <div className="col-span-1 text-center text-brand-text-secondary">{item.volume}</div>
                <div className="col-span-1 text-center text-brand-text-secondary">{item.suitability}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const TagsSection: React.FC<{ title: string; items: string[]; t: Translations; direction?: 'ltr' | 'rtl' }> = ({ title, items, direction = 'ltr', t }) => {
  if (!items || items.length === 0) return null;

  const fullTextToCopy = items.map(item => `#${item}`).join(' ');

  return (
    <div className="bg-brand-surface p-6 rounded-xl border border-brand-primary animate-fade-in" dir={direction}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-brand-accent">{title}</h3>
        <CopyButton textToCopy={fullTextToCopy} t={t} />
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="bg-brand-primary text-brand-text-primary px-3 py-1 rounded-full text-sm font-medium">
            #{item}
          </span>
        ))}
      </div>
    </div>
  );
};

const SourcesSection: React.FC<{ sources: Source[]; t: Translations }> = ({ sources, t }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-brand-surface p-6 rounded-xl border border-brand-primary animate-fade-in">
      <h3 className="text-2xl font-bold text-brand-accent mb-4">{t.resultsSources}</h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-accent transition-colors group"
            >
              <LinkIcon className="w-5 h-5 flex-shrink-0 text-brand-primary group-hover:text-brand-accent" />
              <span className="truncate group-hover:underline">{source.title}</span>
              <ExternalLinkIcon className="w-4 h-4 text-brand-text-secondary/50 group-hover:text-brand-accent/80 ms-auto flex-shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error, t }) => {
  if (isLoading) {
    return <LoadingSpinner t={t} />;
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center animate-fade-in">
        <p className="font-semibold">{t.errorTitle}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mt-6 text-center text-brand-text-secondary p-8 bg-brand-surface rounded-xl border border-dashed border-brand-primary">
        <p>{t.resultsEmpty}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <KeywordsTable items={result.keywords} t={t} />
      <TagsSection title={t.resultsEnglishHashtags} items={result.hashtags.english} t={t} />
      <TagsSection title={t.resultsArabicHashtags} items={result.hashtags.arabic} direction="rtl" t={t} />
      <TagsSection title={t.resultsFrenchHashtags} items={result.hashtags.french} t={t} />
      <SourcesSection sources={result.sources} t={t} />
    </div>
  );
};
