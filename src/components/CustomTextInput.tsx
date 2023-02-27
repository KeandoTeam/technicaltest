import React from 'react'
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native'
import { Colors } from '../utils/colors'

export interface CustomTextInputProps extends TextInputProps {
  onSubmit: (value: string) => void
  handleOnChange?: (value: string) => void
  containerStyle?: object
  textStyle?: object
  labelStyle?: object
  label?:string
}

export default function CustomTextInput(props:CustomTextInputProps) {
  return (<View style={[styles.inputContainer, props.containerStyle]}>
      {props.label && <Text style={[styles.labelDefault, props.labelStyle]}>{props.label}</Text>}
      <TextInput
        placeholderTextColor={'rgba(255,255,255,0.55)'}
        {...props}
        numberOfLines={1}
        style={[styles.input, props.textStyle]}
      />
  </View>)
}

const styles = StyleSheet.create({
    input:{
        height: 30,
        color: Colors.White,
    },
    inputContainer:{
        borderBottomWidth: 0.5,
        borderColor: Colors.White,
    },
    labelDefault:{
        color: Colors.White,
        fontWeight: 'bold'
    }
})
