import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ITrendingProps, TrendingData } from "../types/types";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import * as Haptics from "expo-haptics";
import PopUpButtons from "./PopUpButtons";

interface TrendingComponentProps extends TrendingData {
  setScrollState: React.Dispatch<React.SetStateAction<boolean>>
}

const TrendingComponent = ({
  id,
  title,
  backdrop_path,
  vote_average,
  setScrollState
}: TrendingComponentProps) => {
  const theme = useAppSelector(selectTheme);
  const rating = Math.ceil(vote_average) / 2;

  const [isPopUp, setIsPopUp] = useState(false);
  return (
    <>
      <TouchableOpacity
        onLongPress={() => {
          setScrollState(false)
          setIsPopUp(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onPressOut={() => {
          setIsPopUp(false);
          setScrollState(true)
        }}
      >
        <View style={styles.trendingContainer}>
          <View style={{ position: "relative" }}>
            <Image
              source={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
              style={styles.trendingImage}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(0,0,0,0)", "rgba(50,50,50,0.9)"]}
              style={styles.trendingElementOverlay}
            />
            <Text style={styles.trendingText}>{title}</Text>
            <FontAwesome
              name="star"
              size={17}
              color={theme.darkest}
              style={styles.ratingStar}
            />
            <Text style={[styles.rating, { color: `${theme.lightest}` }]}>
              {rating}
            </Text>
          </View>
          {/* <Button onPress={() => setIsPopUp((p) => !p)} title="Click"></Button> */}
        </View>
      </TouchableOpacity>
          {isPopUp && <View style={styles.popUp}><PopUpButtons/></View> }
    </>
  );
};

export default function Trending({
  trendingData,
  isTrendingLoading,
}: ITrendingProps) {
  const [scrollState, setScrollState] = useState(true)
  const theme = useAppSelector(selectTheme);
  if (isTrendingLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Content...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Feather
          name="trending-up"
          style={styles.trendingIcon}
          size={27}
          color={theme.darkest}
        />
        <Text style={[styles.headingText, { color: theme.lightest }]}>
          Trending
        </Text>
      </View>
      {/* List */}
      <View style={styles.listContainer}>
        <FlashList
          data={trendingData}
          scrollEnabled={scrollState}
          renderItem={({ item, index }) => (
            <>
              <TrendingComponent
                key={index}
                id={item.id}
                backdrop_path={item.backdrop_path}
                title={item.title}
                vote_average={item.vote_average}
                setScrollState={setScrollState}
              />
            </>
          )}
          estimatedItemSize={250}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    // backgroundColor:'orange'
  },
  headingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  headingText: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 30,
    fontSize: 40,
    fontFamily: "Monteserrat",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 4,
  },
  trendingContainer: {
    padding: 20,
    paddingTop: 0,
    position: "relative",
  },
  trendingImage: {
    height: 250,
    width: 250,
    borderRadius: 10,
    zIndex: 1,
  },
  trendingIcon: {
    paddingTop: 20,
  },
  trendingElementOverlay: {
    height: 250,
    width: 250,
    position: "absolute",
    zIndex: 5,
    bottom: 0,
    borderRadius: 10,
  },
  trendingText: {
    padding: 5,
    fontFamily: "Monteserrat",
    fontSize: 17,
    color: "white",
    fontWeight: "700",
    maxWidth: 250,
    position: "absolute",
    bottom: 30,
    left: 7,
    zIndex: 6,
  },
  ratingStar: {
    position: "absolute",
    bottom: 10,
    left: 14,
    zIndex: 6,
  },
  rating: {
    position: "absolute",
    zIndex: 6,
    bottom: 9.25,
    left: 35,
    fontFamily: "Monteserrat",
    fontWeight: "bold",
  },
  popUp:{
    position:'absolute',
    top:0,
    left:120,
    justifyContent:'center',
    aligntItems:'center'
  }
});
