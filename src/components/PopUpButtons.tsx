import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

type Props = {};

const PopUpButtons = (props: Props) => {
  const theme = useAppSelector(selectTheme);
  return (
    <TouchableWithoutFeedback style={styles.container}>
      {/* <Text style={styles.text} >PopUpButtons</Text> */}
      <Pressable
        onResponderRelease={() => console.log("lol")}
        onTouchStart={() => console.log("add button pressed")}
        style={[styles.addButton, { backgroundColor: theme.lightest }]}
      >
        <View style={styles.buttonContainer}>
          <Text style={[styles.text]}>+</Text>
        </View>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};

export default PopUpButtons;

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    zIndex: 999,
    fontSize: 30,
  },
  addButton: {
    borderRadius: 100,
    padding: 30,
    position: "relative",
  },
});
