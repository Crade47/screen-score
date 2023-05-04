import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import { useAppSelector } from '../app/hooks'
import { selectTheme } from '../features/theme/themeSlice'

export default function SettingsScreen() {
    const theme = useAppSelector(selectTheme);
    const [currentSelection, setCurrentSelection] = useState("Default")

    const DATA = []


  return (
    <SafeAreaView>
      <Text style={[styles.heading, {color: theme.darkest}]}>Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={[styles.settingName, {color: theme.lightest}]}>Theme</Text>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontFamily:'Monteserrat',
        fontWeight:'bold',
        fontSize:40,
        marginTop:50,
        marginLeft:20
    },
    settingName:{
        fontFamily:'Monteserrat',
        fontSize:20,
        fontWeight:'bold'
    },
    settingContainer:{
        paddingTop:40,
        paddingLeft:20,
        
    }
})
