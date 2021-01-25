import React from 'react';
import { View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const iconsMaterialIcons = ['my-location', 'search', 'star-border', 'arrow-back', 'access-time', 'close', 'star'];
const iconsFeather = ['arrow-up-left'];
const iconsFontAwesome5 = ['map-marker-alt'];

const selectIcon = (name) => {
  if (iconsMaterialIcons.includes(name)) return MaterialIcons;
  if (iconsFeather.includes(name)) return Feather;
  if (iconsFontAwesome5.includes(name)) return FontAwesome5;
};

export default function Icon(props) {
  const { name, color, size, style } = props;
  const Icon = selectIcon(name);
  return(
    <View style={style}>
      <Icon name={name} color={color} size={size} />
    </View>
  );
}
