import React, { useState } from "react";
import { API_KEY } from "@env";
import {
  StyleSheet,
  SafeAreaView
} from "react-native";
import Header from "../components/Header";
import { apiMovie } from "../utils/api";
import Trending from "../components/Trending";
import { useQuery } from "@tanstack/react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";



export default function MainScreen() {
  const [movieSearchString, setMovieSearchString] = useState("");
  //https://api.themoviedb.org/3/search/movie?api_key=899dff295a0823b4548c164358516176&query=cars
  
  const fetchTrending = async () => {
    try {
      const response = await apiMovie.get(
        `/trending/movie/week?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`${error}`)
    }
  };

  const { data: trendingData, isLoading: isTrendingLoading} = useQuery({ queryKey: ['trending'], queryFn: fetchTrending })
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        movieSearchString={movieSearchString}
        setMovieSearchString={setMovieSearchString}
      />

      <Trending
        trendingData ={trendingData?.results}
        isTrendingLoading={isTrendingLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#727474",
  },
});
