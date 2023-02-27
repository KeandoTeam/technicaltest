import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.White,
    },
    sheetContainer:{
        flex: 1
    },
    sheetHelper:{
        width: '40%', 
        opacity: 0.5, 
        height: 3, 
        borderRadius: 1.5, 
        backgroundColor: 'grey', 
        alignSelf:'center', 
        marginBottom: 20
    },
    sheetContent:{
        backgroundColor: Colors.ThirdBackground,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: 35,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bottomMenu:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position:'absolute', 
        backgroundColor: Colors.PrimaryBackground, 
        width: '100%', 
        bottom: 0, 
        paddingBottom: 40, 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30
    },
    icon:{height:'100%',width:30,resizeMode:'contain', margin: 20},
    indicator:{alignSelf:"center", marginTop: '50%', position: 'absolute'}
})

export default styles;