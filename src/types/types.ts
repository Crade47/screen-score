import { ThemeObjType } from "../../constants"

export interface IHeaderProps{
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

