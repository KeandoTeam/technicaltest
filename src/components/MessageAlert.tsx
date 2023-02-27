import React from 'react'
import { Modal, StyleSheet, View, Text, Button } from 'react-native'
import { Strings } from '../utils/strings'
import { Colors } from '../utils/colors'
import { useAppActions } from '../data/app'

export interface MessageAlertProps {
    message:string
}

export default function MessageAlert(props:MessageAlertProps) {
    const appActions = useAppActions();
    return (
        <Modal
            visible={props.message!.length > 0}
            animationType='slide'
            transparent
        >
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.label}>{props.message}</Text>
                    <Button title={Strings.ok} onPress={()=>{
                        appActions.clearError();
                    }}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    },
  container:{
      backgroundColor: Colors.White,
      borderColor: Colors.lightGreen,
      borderWidth: 1,
      borderRadius: 10,
      maxHeight: '40%',
      minHeight: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
      margin: 20,
      padding:10,  },
  label:{
      textAlign: 'center',
      color: 'black',
      marginBottom: 10,
  }
})
