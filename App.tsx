import 'reflect-metadata';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import './src/di/container';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    word: string;
    wordList: {
      id: string;
      word: string;
      details: {
        word: string;
        phonetic: string;
        phonetics: {
          text: string;
          audio?: string;
        }[];
        origin?: string;
        meanings: {
          partOfSpeech: string;
          definitions: {
            definition: string;
            example?: string;
            synonyms: string[];
            antonyms: string[];
          }[];
        }[];
      };
    }[];
    currentIndex: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Lista de Palavras" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: `Detalhes: ${route.params.word}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
