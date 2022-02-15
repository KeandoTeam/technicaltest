import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import GlobalStackNavigator from './src/navigation/main-navigation';
import MessageAlert from './src/components/MessageAlert';
import { useAppSelector } from './src/redux/hooks';

export default function App() {

  const { error } = useAppSelector(state => state.app)

  return <NavigationContainer> 
      <StatusBar translucent/>
      <GlobalStackNavigator />
      <MessageAlert message={error || ''} />
    </NavigationContainer>
}
