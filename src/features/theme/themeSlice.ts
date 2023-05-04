import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ThemeObjType, defaultTheme } from "../../../constants";

interface ThemeState{
    value:ThemeObjType
}

const initialState:ThemeState ={
    value: defaultTheme
}

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state:RootState) => state.theme.value
export default themeSlice.reducer