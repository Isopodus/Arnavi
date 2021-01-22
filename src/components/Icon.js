import React from 'react';
import { View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const iconsMaterialIcons = ['my-location', 'search', 'star-border', 'arrow-back'];
const iconFeatherIcons = ['arrow-up-left'];

const selectIcon = (name) => {
  if (iconsMaterialIcons.includes(name)) return MaterialIcons;
  if (iconFeatherIcons.includes(name)) return Feather;
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
