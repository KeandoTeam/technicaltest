import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { Colors } from '../utils/colors'

export interface MenuButtonProps {
  style?: object
  label:string
}

export default function MenuButton(props:MenuButtonProps) {
  return (<TouchableOpacity style={[styles.container,props.style]}>
      <View style={styles.squareView}></View>
      <Text style={styles.label}>{props.label}</Text>
  </TouchableOpacity>)
}

const styles = StyleSheet.create({
  container:{
      flexDirection: 'column',
      marginBottom: 20,
  },
  squareView:{
      borderColor: Colors.White,
      borderRadius: 15,
      padding: 15,
      backgroundColor:'rgba(255, 255, 255,0.3)',
      height: 75,
      width: 75,
      alignSelf: 'center'
  },
  label:{
      textAlign: 'center',
      color: Colors.White,
      fontWeight: '300',
      maxWidth: 90,
      fontSize: 12,
      marginTop: 10,
  }
})
