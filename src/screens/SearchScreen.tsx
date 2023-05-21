import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useRef, useEffect, useState, SetStateAction } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import { ISearchProps, MovieData, TrendingData } from "../types/types";
import { apiMovie } from "../utils/api";
import { API_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import placeholder_image from "../../assets/placeholder_search.png"
import { FontAwesome } from '@expo/vector-icons';


const SearchResultComponent =  ({
  title,
  poster_path,
  release_date,
  original_title,
  vote_average
}: MovieData) => {
  const theme = useAppSelector(selectTheme);
  const year = release_date.split("-")[0]
  const rating = Math.ceil(vote_average) / 2
  return (
    <View style={styles.resultsContainer}>
      <Image source={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : placeholder_image} style={styles.resultImage} />
      <View style={styles.titleContainer}>
        <Text style={[styles.resultTitle, {color: theme.darkest}]} >{title} {`(${year})`}</Text>
        <Text style={[styles.originalTitle, {color: theme.lightest}]}>{original_title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={[{color: `${theme.lightest}`}]}>{rating}</Text>
          <FontAwesome name="star" size={17} color={theme.darkest} />
        </View>
      </View>
    </View>
  );
};

export default function SearchScreen() {
  const inputRef = useRef<TextInput | null>(null);
  const [movieSearchString, setMovieSearchString] = useState("");

  const theme = useAppSelector(selectTheme);

  const fetchSearchQuery = async () => {
    try {
      const res = await apiMovie.get(
        `search/movie?api_key=${API_KEY}&query=${movieSearchString}`
      );
      return res.data;
    } catch (error) {
      Alert.alert("An error occured while searching.");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { data: searchData, isLoading: isSearching } = useQuery({
    queryKey: ["search", movieSearchString],
    queryFn: fetchSearchQuery,
  });
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          cursorColor={theme.darkest}
          style={[
            styles.searchBar,
            { color: `${theme.lightest}`, borderColor: `${theme.lightest}` },
          ]}
          onChangeText={(newText) => setMovieSearchString(newText)}
          autoFocus={true}
        />
      </View>
      <View style={styles.resultsContainer}>
        {isSearching ? (
          <Text>Loading...</Text>
        ) : (
          // searchData?.results.map(item => <Text key={item.id}>{item.original_title}</Text>)
          <FlashList
            data={searchData.results}
            renderItem={({
              item,
              index,
            }: {
              item: MovieData;
              index: number;
            }) => (
              <SearchResultComponent
                id={item.id}
                key={index}
                title={item.title}
                original_title={item.original_title}
                poster_path={item.poster_path}
                release_date={item.release_date}
                vote_average={item.vote_average}
              />
            )}
            estimatedItemSize={100}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Monteserrat",
    maxHeight: 50,
    borderWidth: 0.5,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 200,
  },
  resultsContainer: {
    flex: 9,
    flexDirection:"row",
    paddingLeft:10,
    paddingTop:15,
    paddingRight:10,
    alignItems:"flex-start"
  },
  resultImage:{
    width: 62.5,
    height: 125,
    resizeMode: 'contain',
    
  },
  titleContainer:{
    flex:1
  },
  resultTitle:{
    fontFamily:"Monteserrat",
    fontWeight:"bold",
    fontSize:17,
    paddingTop:12,
    paddingLeft:10,
    maxWidth:275,
  },
  originalTitle:{
    fontFamily:'Monteserrat',
    fontStyle:'italic',
    fontSize:13,
    paddingLeft:10,
  },
  ratingContainer:{
    flex:1,
    flexDirection:'row',
    paddingLeft:10,
    paddingTop:15,
    columnGap:2
  }
})
