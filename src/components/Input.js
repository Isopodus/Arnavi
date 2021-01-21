import React from 'react';
import { TextInput, View } from 'react-native';

export default function Input(props) {
    const {
        value,
        setValue,
        placeholder,
        placeholderColor,
        style,
        onFocus,
        onBlur
    } = props;
    return(
        <TextInput
            style={style}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    )
}
