import { ThemeObjType } from "../../constants"
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"


export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    List:undefined;
    Settings:undefined
  };


export interface ISearchProps{
    movieSearchString:string,
    setMovieSearchString: React.Dispatch<React.SetStateAction<string>>,
};

export type TrendingData = {
    backdrop_path: string,
    id: string,
    title: string,
    vote_average: number
}

export interface ITrendingProps{
    trendingData: TrendingData[],
    isTrendingLoading:boolean,
};

export interface IRatingStars{
    vote_average:number,
    size:number,
    style:{
        position: "absolute";
        bottom: number;
        left: number;
        zIndex: number;
    }
}

export interface IDropdownComponent{
    themeData:{label: string, value:ThemeObjType}[],
    currentSelection: string,
    setCurrentSelection: React.Dispatch<React.SetStateAction<string>>,
    handleThemeChange: (themeObj: ThemeObjType) => void
}

