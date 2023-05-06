import React, { useState } from "react";
import { API_KEY } from "@env";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Header from "../components/Header";
import { apiMovie } from "../utils/api";
import Trending from "../components/Trending";
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from "../types/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";


type Props = BottomTabScreenProps<RootStackParamList, 'Home'>
export default function MainScreen({navigation}:Props) {
  
  //https://api.themoviedb.org/3/search/movie?api_key=899dff295a0823b4548c164358516176&query=cars

  const fetchTrending = async () => {
    try {
      const response = await apiMovie.get(
        `/trending/movie/week?api_key=${API_KEY}`
        
      );
      return response.data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const { data: trendingData, isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  return (
    
      <View style={styles.container}>
        <Header
          navigation={navigation}
        />

        <Trending 
          trendingData={trendingData?.results}
          isTrendingLoading={isTrendingLoading}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
