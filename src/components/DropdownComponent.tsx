import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { IDropdownComponent } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectTheme } from '../features/theme/themeSlice';
import { ThemeObjType } from '../../constants';


  const DropdownComponent = ({ themeData ,currentSelection, setCurrentSelection, handleThemeChange }: IDropdownComponent) => {
    const [isFocus, setIsFocus] = useState(false);
    const theme = useAppSelector(selectTheme);
    

    return (
      <View style={styles.container}>
        
        <Dropdown
          style={[styles.dropdown, isFocus && [styles.dropdownFocus,{backgroundColor:`${theme.navigationBar}`}], {borderColor: `${theme.lightest}`}]}
          placeholderStyle={[styles.placeholderStyle, {color: `${theme.darkest}`}]}
          selectedTextStyle={[styles.selectedTextStyle, {color: `${theme.darkest}`}]}
          inputSearchStyle={[styles.inputSearchStyle, {color: `${theme.lightest}`}]}
          iconStyle={styles.iconStyle}
          data={themeData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={currentSelection}
          searchPlaceholder="Search..."
          value={currentSelection}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCurrentSelection(item?.label);
            handleThemeChange(item?.value);
            setIsFocus(false);
          }}
          containerStyle={[styles.listContainer, {backgroundColor:`${theme.navigationBar}`}]}
          fontFamily='Monteserrat'
          iconColor={`${theme.darkest}`}
          itemTextStyle={[styles.itemText, {color:`${theme.lightest}`}]}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      
      width:200,
      fontFamily:'Monteserrat'
    },
    dropdown: {
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 20,
      fontFamily:'Monteserrat',
      fontWeight:"bold",
      padding:0,
      // backgroundColor:'orange'
    },
    selectedTextStyle: {
      fontSize: 20,
      fontFamily:'Monteserrat',
      fontWeight:"bold",
    },
    iconStyle: {
      width: 30,
      height: 20,
      
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontFamily:'Monteserrat',
      fontWeight:'bold',
      backgroundColor:'transparent',
      borderWidth:0,
    },
    listContainer:{
      borderWidth:0,
      width:200,
      marginLeft:2,
      marginTop:-1.75,
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
    },
    itemText:{
      fontWeight:'bold',
    },
    dropdownFocus:{

    }
  });