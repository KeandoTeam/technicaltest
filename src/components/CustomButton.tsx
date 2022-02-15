import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Colors } from '../utils/colors'

export interface CustomButtomProps {
  style?: object
  labelStyle?: object
  disabled?: boolean
  onPress:()=>void
  label:string
}

export default function CustomButton(props:CustomButtomProps) {
  return (<TouchableOpacity onPress={props.onPress} disabled={props.disabled} style={[styles.buttonDefaultStyle, props.style, {opacity: props.disabled ? 0.5 : 1.0}]}>
    <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
  </TouchableOpacity>)
}

const styles = StyleSheet.create({
  buttonDefaultStyle:{
    backgroundColor: Colors.SecondaryBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: Colors.White,
    borderWidth: 2,
  },
  label:{
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
})
