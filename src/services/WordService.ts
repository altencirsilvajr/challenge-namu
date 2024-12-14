import { injectable } from 'tsyringe';
import axios from 'axios';

export type WordResponse = {
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string;
    audio?: string;
  }>;
  origin?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }>;
  }>;
};

@injectable()
export class WordService {
  private readonly API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
  
  async fetchWord(word: string): Promise<WordResponse> {
    const response = await axios.get(`${this.API_BASE_URL}/${word}`);
    return response.data[0];
  }

  async fetchMultipleWords(words: string[]): Promise<WordResponse[]> {
    const responses = await Promise.all(
      words.map(word => this.fetchWord(word))
    );
    return responses;
  }
} 