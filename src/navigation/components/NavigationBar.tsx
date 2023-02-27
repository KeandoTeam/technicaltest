import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { useAppActions } from '../../data/app';
import { Colors } from '../../utils/colors';

export default function NavigationBar(props:{
    navigation:any
}) {

    const AppActions = useAppActions();

    return (<View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={()=>{
            AppActions.logOut();
        }}>
      <Image style={styles.icon} source={require('../../images/leftArrow.png')} />
    </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
    },
    icon:{
        width: 25,
        height: 25,
    }
})