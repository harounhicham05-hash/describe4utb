import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';
import type { Translations } from '../translations';

interface CopyButtonProps {
  textToCopy: string;
  t: Translations;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
        copied
          ? 'bg-green-600 text-white'
          : 'bg-brand-primary text-brand-text-secondary hover:bg-brand-secondary'
      }`}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          {t.copiedButton}
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4" />
          {t.copyButton}
        </>
      )}
    </button>
  );
};