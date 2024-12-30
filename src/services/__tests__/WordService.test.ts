import { container } from '../../di/container';
import { WordService } from '../WordService';

describe('WordService', () => {
  let wordService: WordService;

  beforeEach(() => {
    wordService = container.resolve(WordService);
  });

  it('Deve trazer detalhes de uma palavra', async () => {
    const result = await wordService.fetchWord('hello');
    expect(result.word).toBe('hello');
    expect(result.meanings).toBeDefined();
  });

  it('Deve lançar erro quando a palavra não existe', async () => {
    await expect(wordService.fetchWord('palavrainexistente123'))
      .rejects
      .toThrow();
  });
}); 