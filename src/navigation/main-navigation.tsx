import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/Login'
import HomeScreen from '../screens/Home'
import { useAppSelector } from '../redux/hooks'

const Stack = createStackNavigator()

const GlobalStackNavigator = () => {

    const { user } = useAppSelector(state => state.app);

    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? 
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            : <Stack.Screen name='LoginScreen' component={LoginScreen} />
        }
    </Stack.Navigator>
}
  
export default GlobalStackNavigator
  