import React from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
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

  const removeFromFavorites = (tourSpot) => {
    // Remova o ponto turístico dos favoritos e atualize o AsyncStorage.
    const newFavorites = favorites.filter(item => item.id !== tourSpot.id);
    setFavorites(newFavorites);
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { tourSpot: item })}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                <Text>Remover dos Favoritos</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;