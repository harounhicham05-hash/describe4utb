export interface Source {
  title: string;
  uri: string;
}

export interface KeywordData {
  keyword: string;
  volume: string;
  suitability: string;
}

export interface SeoResult {
  keywords: KeywordData[];
  hashtags: {
    english: string[];
    arabic: string[];
    french: string[];
  };
  sources: Source[];
}
