import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import { ISearchProps } from "../types/types";
import { apiMovie } from "../utils/api";
import { API_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";

export default function SearchScreen() {
  const inputRef = useRef<TextInput | null>(null);
  const [movieSearchString, setMovieSearchString] = useState("");
  const theme = useAppSelector(selectTheme);

  const fetchSearchQuery = async () =>{
    try {
      const res = await apiMovie.get(`search/movie?api_key=${API_KEY}&query=${movieSearchString}`)
      return res.data;
    } catch (error) {
      Alert.alert('An error occured while searching.');
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  

  const { data: searchData, isLoading: isSearching } = useQuery({
    queryKey:['search', movieSearchString],
    queryFn:fetchSearchQuery,
  })
  
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
        {
          isSearching?
          <Text>Loading...</Text>
          :
          searchData?.results.map(item => <Text key={item.id}>{item.original_title}</Text>)
        }
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  searchContainer:{
    flex:1,
    flexDirection:'row',
    paddingTop:50,
    paddingHorizontal:30,
  },
  searchBar: {
    flex:1,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Monteserrat",
    maxHeight: 50,
    borderWidth: 0.5,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 200,
  },
  resultsContainer:{
    flex:9
  }
})