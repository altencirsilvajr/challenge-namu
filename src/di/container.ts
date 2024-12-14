import "reflect-metadata";
import { container } from 'tsyringe';
import { WordService } from '../services/WordService';

container.registerSingleton(WordService);

export { container }; 