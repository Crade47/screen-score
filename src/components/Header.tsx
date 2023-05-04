import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import mainLogo from "../../assets/logo-main.png";
import { Image } from "expo-image";
import { EvilIcons } from "@expo/vector-icons";
import type { IHeaderProps } from "../types/types";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

export default function Header({
  movieSearchString,
  setMovieSearchString,
}: IHeaderProps) {
  const theme = useAppSelector(selectTheme);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={mainLogo} style={styles.logo} />
          <View style={styles.searchContainer}>
            <TextInput
              cursorColor={theme.darkest}
              style={[
                styles.searchBar,
                { color: `${theme.lightest}`, borderColor: `${theme.lightest}`},
              ]}
              onChangeText={(newText) => setMovieSearchString(newText)}
            />
            <Pressable onPress={() => Alert.alert(movieSearchString)}>
              <EvilIcons name="search" size={40} color={theme.lightest} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop:40,
    
  },
  searchBar: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Monteserrat",
    maxHeight: 70,
    borderWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    width: "80%",
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 200,
  },
  searchContainer: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor:'black'
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 10,
    // backgroundColor:'pink'
  },
  logo: {
    flex: 1,
    alignSelf: "flex-end",
    height: 50,
    resizeMode: "contain",
  },
});
