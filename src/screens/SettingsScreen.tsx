import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeTheme, selectTheme } from "../features/theme/themeSlice";
import DropdownComponent from "../components/DropdownComponent";
import { ThemeObjType, defaultTheme, lavender, pastelTheme, solarizedDark } from "../../constants";

export default function SettingsScreen() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [currentSelection, setCurrentSelection] = useState("Default");
  const [currentThemeObject, setCurrentThemeObject] = useState(theme);
  const themeData = [
    { label: "Default", value: defaultTheme },
    { label: "Pastel", value: pastelTheme },
    { label: "Solarized", value: solarizedDark },
    { label: "Lavender", value: lavender },

  ];


  const handleThemeChange = (themeObj: ThemeObjType) => {
    dispatch(changeTheme(themeObj))

  };

  return (
    <SafeAreaView>
      <Text style={[styles.heading, { color: theme.darkest }]}>Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={[styles.settingName, { color: theme.lightest }]}>
          Theme
        </Text>
        <DropdownComponent
          themeData={themeData}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          handleThemeChange={handleThemeChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Monteserrat",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
    marginLeft: 20,
  },
  settingName: {
    fontFamily: "Monteserrat",
    fontSize: 25,
    fontWeight: "bold",
    // backgroundColor:'red',
    width: 200,
  },
  settingContainer: {
    paddingTop: 40,
    paddingLeft: 20,
  },
});
