export interface Source {
  title: string;
  uri: string;
}

export interface SeoResult {
  keywords: string[];
  hashtags: {
    english: string[];
    arabic: string[];
    french: string[];
  };
  sources: Source[];
}