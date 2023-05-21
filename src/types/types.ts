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

export interface TrendingData {
    backdrop_path?: string,
    id: number,
    title: string,
    vote_average: number
}

export interface MovieData extends TrendingData {
    adult?: boolean;
    genre_ids?: number[]; // Assuming genre_ids is an array of numbers
    original_language?: string;
    original_title: string;
    overview?: string;
    popularity?: number;
    poster_path: string;
    release_date: string;
    video?: boolean;
    vote_count?: number;
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

