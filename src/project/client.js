import axios from "axios";
//import setupProxy from "../setupProxy";
// export const SPORTS_API = "https://isports.sa.gov.tw/Api/Rest/v1"; 
export const WEATHER_API ="http://dataservice.accuweather.com/forecasts/v1/daily/5day/34875"
export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export const MOVIE_API= "https://www.omdbapi.com/"
export const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY

export const findLifeguard = async (searchTerm) => {
    
    // axios.get('https://isports.sa.gov.tw/Api/Rest/v1/LifeguardLicense.svc/GetLicense?licenseType=OW&paging=false').then(response => {console.log('Response:', response);}).catch(error => {console.error('Error:', error);});
    
    console.log(searchTerm);
    
    // const response = await axios.get(
    //     `${SPORTS_API}/LifeguardLicense.svc/GetLicense?licenseType=${searchTerm}&paging=false`
    //   );
    //   console.log(response);
    //   return response.data;

};
 export const findWeather = async () => {
    const response = await axios.get(`${WEATHER_API}?apikey=${API_KEY}`);
    return  response.data;
 };

 export const findMovie = async (searchTitle) => {
    const response = await axios.get(`${MOVIE_API}?t=${searchTitle}&apikey=${MOVIE_API_KEY}`);
    return  response.data;

 };

 export const findMovieById = async (imdbID) => {
    const response = await axios.get(`${MOVIE_API}?i=${imdbID}&apikey=${MOVIE_API_KEY}`);
    return response.data;
 };