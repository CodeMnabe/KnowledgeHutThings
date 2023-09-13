
import React from 'react';
import { View, Text, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { tourSpot } = route.params;

  return (
    <View>
      <Text>{tourSpot.name}</Text>
      <Text>{tourSpot.description}</Text>
      {/* Adicione outros detalhes, como imagem, duração, preço, etc. */}
    </View>
  );
};

export default DetailsScreen;