import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.PrimaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mailInput:{
        width: '80%'
    },
    passwordInput:{
        width: '80%',
        marginTop: 25,
    },
    buttonStyle:{
        marginTop: 25,
        width: '80%',
    },
    activityIndicator:{
        marginTop: 20,
    }
})

export default styles;