import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import ListScreen from './ListScreen';
import SettingsScreen from './SettingsScreen';
import SearchScreen from './SearchScreen';
//Icons
import { Entypo, Foundation, Ionicons, FontAwesome5 } from '@expo/vector-icons'; //Home, List
import { FontAwesome } from '@expo/vector-icons';
import { useAppSelector } from '../app/hooks';
import { selectTheme } from '../features/theme/themeSlice';


const Tab = createBottomTabNavigator();

export default function ScreenNavigation() {
  const theme = useAppSelector(selectTheme);
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string;

        if (route.name === 'Home') {
          iconName = focused
            ? 'md-home'
            : 'ios-home-outline';
          
        } else if(route.name ==='Search'){
          iconName = focused ? 'search' : 'search-outline';
        }else if(route.name ==='List'){
          iconName= focused ? "md-list" : "ios-list-outline"
        }else if (route.name === 'Settings') {
          iconName = focused ? 'md-settings' : 'md-settings-outline';
        }
        return(<Ionicons name={iconName} size={size} color={color}/>)

      },
      tabBarActiveTintColor: `${theme.darkest}`,
      tabBarInactiveTintColor: `${theme.lightest}`,
      headerShown:false,
      tabBarStyle:{
        backgroundColor:`${theme.navigationBar}`,
        borderTopWidth:0,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
      },
      tabBarShowLabel:false,
    })}
  > 
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={SearchScreen}/>
        <Tab.Screen name="List" component={ListScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  )
}
