import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import styles from './styles';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import NavigationBar from '../../navigation/components/NavigationBar';
import { Colors } from '../../utils/colors';
import { useAppSelector } from '../../redux/hooks';
import { getParkUsers, ParkUser, useUsersActions } from '../../data/users';
import { useAppActions } from '../../data/app';
import UserCell from '../../components/UserCell';
import { Strings } from '../../utils/strings';
import MenuButton from '../../components/MenuButton';
const MockMenuData:string[] = [Strings.addVechicle, Strings.history, Strings.reserva, Strings.myVehicles, Strings.myParqueaderos, Strings.configuration];

export default function HomeScreen({navigation}:any) {

  const UsersActions = useUsersActions();
  const AppActions = useAppActions();
  const { loading, user } = useAppSelector(state => state.app)
  const { parkUsers } = useAppSelector(state => state.users)
  const [ currentParkUser, setCurrentParkUser ] = useState<ParkUser>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['11%', '55%'], []);

  useEffect(()=>{
    AppActions.setLoading(true)
    getParkUsers().then((foundUsers)=>{
      UsersActions.setParkUsers(foundUsers);
      
      try{
        const currentUserData:ParkUser = foundUsers.filter(({email})=> email === user!.email)[0];
        currentUserData && setCurrentParkUser(currentUserData)
        currentUserData && console.log(`Soy el usuario ${currentUserData.firstName} ${currentUserData.lastName} y mi cédula es: ${currentUserData.uid}`)
      }catch(e){console.error(e)}
      
      AppActions.setLoading(false)
    }).catch((e)=>{
      AppActions.setError(`${e}`)
    })
  },[])


  return (<View style={styles.container}>
    <NavigationBar navigation={navigation}/>
    <FlatList 
      data={parkUsers || []}
      renderItem={({item,index})=><UserCell isSameUser={currentParkUser !== undefined ? item.email === currentParkUser.email : false} key={`pUser_${index}`} user={item}/>}
    />
    {loading ? <ActivityIndicator style={styles.indicator} color={Colors.pink} /> : null}
    <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleStyle={{display:'none'}}
      >
        <View style={styles.sheetContainer}>
          <View style={[styles.sheetHelper]}/>
          <View style={styles.sheetContent}>
            {MockMenuData.map((mockMenuItem,index)=><MenuButton key={`mockMenu_${index}`} label={mockMenuItem} />)}
          </View>
        </View>
    </BottomSheet>
    <View style={styles.bottomMenu}>
      <Image style={styles.icon} source={require('../../images/whiteHome.png')} />  
      <Image style={[styles.icon,{tintColor: Colors.White}]} source={require('../../images/blackMenu.png')} />
    </View>
  </View>)
}
