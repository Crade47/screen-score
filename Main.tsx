
  import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import ScreenNavigation from './src/screens/ScreenNavigation';
import { useAppSelector } from './src/app/hooks';
import { selectTheme } from './src/features/theme/themeSlice';
  const Stack = createNativeStackNavigator();
  
  export default function Main():JSX.Element {
  
    const theme = useAppSelector(selectTheme);
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: `${theme.background}`,
      },
    };
  
    return (
          <NavigationContainer theme={MyTheme}>
              <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen
                  name='Main'
                  component={ScreenNavigation}
                />
              </Stack.Navigator>
          </NavigationContainer>
    );
  }
  