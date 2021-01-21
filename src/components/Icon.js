import React from 'react';
import { View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const iconsMaterialIcons = ['my-location', 'search', 'star-border'];

const selectIcon = (name) => {
  if (iconsMaterialIcons.includes(name)) return MaterialIcons;
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
