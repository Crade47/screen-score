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
import type { RootStackParamList } from "../types/types";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type HeaderProps = {navigation:BottomTabScreenProps<RootStackParamList, 'Home'>['navigation']};
export default function Header({ navigation }: HeaderProps) {
  const theme = useAppSelector(selectTheme);
  const [isEditable, setisEditable] = useState(true);

  const searchBarTouch = () => {
    navigation.navigate("Search");
    setisEditable((prevState) => !prevState);
  };

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
                {
                  color: `${theme.lightest}`,
                  borderColor: `${theme.lightest}`,
                },
              ]}
              // editable={false}
              selectTextOnFocus={isEditable}
              onTouchStart={searchBarTouch}
            />
            <Pressable onPress={() => navigation.navigate("Search")}>
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
    marginTop: 40,
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
