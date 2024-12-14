import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type WordDetails = {
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

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

export default function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { wordList, currentIndex } = route.params;
  const wordDetails: WordDetails = wordList[currentIndex].details;

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < wordList.length) {
      navigation.navigate('Details', {
        word: wordList[nextIndex].word,
        wordList,
        currentIndex: nextIndex
      });
    } else {
      alert('Você chegou ao final da lista!');
    }
  };

  const handleBack = () => {
    const backIndex = currentIndex - 1;
    if (backIndex >= 0) {
      navigation.navigate('Details', {
        word: wordList[backIndex].word,
        wordList,
        currentIndex: backIndex
      });
    } else {
      alert('Você chegou ao início da lista!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.word}>{wordDetails.word}</Text>
        <Text style={styles.phonetic}>{wordDetails.phonetic}</Text>

        {wordDetails.origin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Origem:</Text>
            <Text style={styles.text}>{wordDetails.origin}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Significados:</Text>
          {wordDetails.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaningContainer}>
              <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
              
              {meaning.definitions.map((def, defIndex) => (
                <View key={defIndex} style={styles.definitionContainer}>
                  <Text style={styles.definition}>{def.definition}</Text>
                  {def.example && (
                    <Text style={styles.example}>Exemplo: "{def.example}"</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={handleBack} />
          <Button title="Próximo" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phonetic: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  meaningContainer: {
    marginBottom: 15,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#444',
    marginBottom: 5,
  },
  definitionContainer: {
    marginLeft: 15,
    marginBottom: 10,
  },
  definition: {
    fontSize: 16,
    marginBottom: 5,
  },
  example: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
}); 