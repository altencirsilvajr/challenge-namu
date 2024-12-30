import 'reflect-metadata';
import '@testing-library/jest-native/extend-expect';

// Mock para o React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

// Mock global
global.fetch = jest.fn(); 