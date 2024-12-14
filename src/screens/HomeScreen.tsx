import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { container } from '../di/container';
import { WordService } from '../services/WordService';

// Constantes
const DEFAULT_WORDS = ["hello", "today", "great", "peace", "chair", "diary"];

// Types
type Word = {
  id: string;
  word: string;
  details: any;
};

// Componentes
const WordButton = ({ item, onPress }: { item: Word; onPress: () => void }) => (
  <TouchableOpacity style={styles.wordButton} onPress={onPress}>
    <Text style={styles.wordText}>{item.word}</Text>
  </TouchableOpacity>
);

const SearchBar = ({
  value,
  onChangeText,
  onSubmit,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Digite uma palavra..."
      onSubmitEditing={onSubmit}
    />
    <TouchableOpacity style={styles.searchButton} onPress={onSubmit}>
      <Text style={styles.searchButtonText}>Buscar</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const [words, setWords] = useState<Word[]>([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const wordService = container.resolve(WordService);

  const formatWordResponse = (response: any, index: number) => ({
    id: String(index + 1),
    word: response.word,
    details: response
  });

  const navigateToDetails = (
    word: string,
    wordList: Word[],
    currentIndex: number
  ) => {
    navigation.navigate("Details", {
      word,
      wordList,
      currentIndex,
    });
  };

  useEffect(() => {
    const fetchInitialWords = async () => {
      try {
        const responses = await wordService.fetchMultipleWords(DEFAULT_WORDS);
        const formattedWords = responses.map((response, index) => 
          formatWordResponse(response, index)
        );
        setWords(formattedWords);
      } catch (error) {
        alert(`Erro ao buscar palavras: ${error}`);
      }
    };

    fetchInitialWords();
  }, []);

  const handleSearch = async () => {
    const trimmedText = searchText.trim();
    if (!trimmedText) return;

    try {
      const response = await wordService.fetchWord(trimmedText);
      const newWord = formatWordResponse(response, words.length);
      const updatedWords = [...words, newWord];

      navigateToDetails(newWord.word, updatedWords, words.length);
      setSearchText("");
    } catch (error) {
      alert("Palavra não encontrada. Tente novamente.");
    }
  };

  const handleWordPress = (item: Word) => {
    navigateToDetails(item.word, words, words.indexOf(item));
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSubmit={handleSearch}
      />

      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <WordButton item={item} onPress={() => handleWordPress(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  wordButton: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderRadius: 5,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
