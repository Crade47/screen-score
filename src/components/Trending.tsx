import React from "react";
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ITrendingProps, TrendingData } from "../types/types";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import * as Haptics from 'expo-haptics';


const TrendingComponent = ({ id, title, backdrop_path, vote_average }: TrendingData) => {
  
  const theme = useAppSelector(selectTheme)
  const rating = Math.ceil(vote_average) / 2


  return (
    <View style={styles.trendingContainer}>
      <View style={{position:'relative'}}>
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
        <FontAwesome name="star" size={17} color={theme.darkest} style={styles.ratingStar} />
        <Text style={[styles.rating, {color: `${theme.lightest}`}]}>{rating}</Text>
      </View>
    </View>
  );
};

export default function Trending({
  trendingData,
  isTrendingLoading,
}: ITrendingProps) {
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
        <Feather name="trending-up" style={styles.trendingIcon} size={27} color={theme.darkest} />
        <Text style={[styles.headingText, {color:theme.lightest}]}>Trending</Text>
      </View>
      {/* List */}
      <View style={styles.listContainer}>
        <FlashList
          data={trendingData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
                key={index}
                onLongPress={
                  () =>{ 
                    Haptics.impactAsync(
                      Haptics.ImpactFeedbackStyle.Medium
                    )
                  }
                }
              >
                <TrendingComponent
                  key={index}
                  id={item.id}
                  backdrop_path={item.backdrop_path}
                  title={item.title}
                  vote_average={item.vote_average}
                />
              </TouchableOpacity>

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
    paddingBottom:0,
    fontSize: 40,
    fontFamily: "Monteserrat",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 4,
  },
  trendingContainer: {
    padding: 20,
    paddingTop:0,
    position: "relative",
  },
  trendingImage: {
    height: 250,
    width: 250,
    borderRadius: 10,
    zIndex: 1,
  },
  trendingIcon:{
    paddingTop:20
  },
  trendingElementOverlay: {
    height: 250,
    width: 250,
    position: "absolute",
    zIndex: 5,
    bottom:0,
    borderRadius:10,

  },
  trendingText: {
    padding: 5,
    fontFamily: "Monteserrat",
    fontSize: 17,
    color: "white",
    fontWeight: "700",
    maxWidth: 250,
    position:'absolute',
    bottom:30,
    left:7,
    zIndex: 6,
  },
  ratingStar:{
    position:'absolute',
    bottom: 10,
    left:14,
    zIndex:6
  },
  rating:{
    position:'absolute',
    zIndex:6,
    bottom: 9.25,
    left:35,
    fontFamily:'Monteserrat',
    fontWeight:'bold'
  },
});
