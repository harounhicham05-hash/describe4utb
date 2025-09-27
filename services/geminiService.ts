import { GoogleGenAI } from "@google/genai";
import type { SeoResult, Source, KeywordData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSeoContent = async (keyword: string): Promise<SeoResult> => {
  try {
    const prompt = `
      You are an expert in YouTube SEO and digital marketing with over 15 years of experience.
      Your task is to analyze the search trends for the main keyword provided and generate optimized SEO content.

      Main Keyword: "${keyword}"

      Based on your analysis of the latest search data for this keyword, provide a structured JSON response containing:
      1.  "keywords": A list of 15-20 powerful, highly relevant keywords, sorted by importance. For each keyword, provide an object with three properties:
          a. "keyword": The keyword phrase.
          b. "volume": A string representing the estimated monthly search volume (e.g., "10K - 100K", "500 - 2K", "< 100").
          c. "suitability": A brief assessment of its suitability (e.g., "High", "Medium", "Good for long-tail").
      2.  "hashtags": An object with three keys:
          a. "english": A list of 10 strong hashtags in English.
          b. "arabic": A list of 10 strong hashtags in Arabic.
          c. "french": A list of 10 strong hashtags in French.

      Do not include the '#' symbol in any of the hashtag strings.
      Your response MUST be a valid JSON object. Do not wrap it in markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.2,
      },
    });

    let jsonText = response.text.trim();
    
    // Sanitize the response: LLMs sometimes wrap JSON in markdown.
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7, -3).trim();
    } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3, -3).trim();
    }


    const parsedResult = JSON.parse(jsonText);

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources: Source[] = groundingChunks
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Unknown Source',
        uri: chunk.web?.uri || '#',
      }))
      .filter((source: Source) => source.uri !== '#');
    
    // Validation for the new, more complex structure
    if (
        parsedResult &&
        Array.isArray(parsedResult.keywords) &&
        parsedResult.keywords.every((k: any) => k.keyword && k.volume && k.suitability) &&
        parsedResult.hashtags &&
        Array.isArray(parsedResult.hashtags.english) &&
        Array.isArray(parsedResult.hashtags.arabic) &&
        Array.isArray(parsedResult.hashtags.french)
    ) {
        return {
            ...parsedResult,
            sources,
        } as SeoResult;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the AI's response. The format might be incorrect.");
    }
    throw new Error("An error occurred while communicating with the AI service.");
  }
};
