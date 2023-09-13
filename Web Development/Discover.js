import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import axios from 'axios';

const DiscoverScreen = ({ navigation }) => {
  const [tourSpots, setTourSpots] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Obtenha os dados dos pontos turísticos usando axios.
    axios.get('https://tourspots.vercel.app/tours')
      .then(response => {
        setTourSpots(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Obtenha os favoritos do AsyncStorage.
    AsyncStorage.getItem('favorites')
      .then(data => {
        if (data) {
          setFavorites(JSON.parse(data));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const addToFavorites = (tourSpot) => {
    // Adicione o ponto turístico aos favoritos e atualize o AsyncStorage.
    const newFavorites = [...favorites, tourSpot];
    setFavorites(newFavorites);
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <View>
      <FlatList
        data={tourSpots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { tourSpot: item })}
          >
            <View>
              <Image
                source={{ uri: item.image }} // Certifique-se de que os dados contêm uma URL de imagem válida
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <TouchableOpacity onPress={() => addToFavorites(item)}>
                <Text>Adicionar aos Favoritos</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DiscoverScreen;