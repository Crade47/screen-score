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