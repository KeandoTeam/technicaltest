import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { Strings } from '../utils/strings'
import { ParkUser } from '../data/users'
import { Colors } from '../utils/colors'

export interface UserCellProps {
  user: ParkUser
  style?: object
  isSameUser: boolean
}

export default function UserCell({user, style, isSameUser}:UserCellProps) {
  return (<View style={[styles.container, style, isSameUser ? styles.currentUserContainer : {}]}>
      <View style={styles.rowContainer}>
        <Image style={styles.image} source={{uri:user.picture}} />
        <View style={styles.infoContainer}>
          {user.companyRol && <Text style={[styles.infoLabel,isSameUser ? styles.currentUserText : {}]}>{`${user.companyRol}`}</Text>}
          <Text style={[styles.titleLabel,isSameUser ? styles.currentUserText : {}]}>{`${user.firstName} ${user.lastName}`}{isSameUser ? Strings.you : ''}</Text>
          <Text style={[styles.infoLabel,isSameUser ? styles.currentUserText : {}]}>{`${user.birthday}`}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.rowContainer}>
        <View style={[styles.pinkDot, isSameUser ? styles.whiteDot : {}]} />
        <Text style={[styles.infoLabel,isSameUser ? styles.currentUserText : {}]}>{`${user.email}`}</Text>
      </View>
  </View>)
}

const styles = StyleSheet.create({
  currentUserContainer:{
    backgroundColor: Colors.pink,
  },
  currentUserText: {
    color: Colors.White,
  },
  container:{
    borderRadius: 20,
    backgroundColor: Colors.White,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  rowContainer:{
    flexDirection:'row'
  },
  infoContainer:{
    flexDirection: 'column',
    flex:4,
    marginLeft: 10,
  },
  image:{
    flex: 1,
    maxHeight: 110,
    borderRadius: 10,
  },
  divider:{
    backgroundColor: Colors.dark,
    opacity: 0.08,
    height: 1,
    marginVertical: 10,
  },
  pinkDot:{
    backgroundColor: Colors.pink,
    width:17,
    height: 17,
    borderRadius: 8.5,
    marginRight: 5
  },
  whiteDot:{
    backgroundColor: Colors.White,
  },
  infoLabel: {
    color: Colors.textColor,
    fontWeight: '300',
    fontSize: 13
  },
  titleLabel: {
    color: Colors.textColor,
    fontWeight: 'bold',
    fontSize: 17
  }
})
