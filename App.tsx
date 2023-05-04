import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font"
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import ScreenNavigation from './src/screens/ScreenNavigation';
import Main from './Main';

const queryClient = new QueryClient()
const Stack = createNativeStackNavigator();

export default function App():JSX.Element {

  const [ loaded ] = useFonts({
    'Monteserrat': require("./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf")
  });


  if(!loaded){
    return(
      <Text>Loading Fonts...</Text>
    )
  }

  return (
    <Provider store={store}>

      <QueryClientProvider client={queryClient}>
        <Main/>
      </QueryClientProvider>
    </Provider>
  );
}
