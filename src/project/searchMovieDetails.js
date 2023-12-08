import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import * as client from "./client";
import "./poster.css";

function SearchMovieDetails(){
    const [movieDetails, setMovieDetails] = useState(null)
    const {imdbID} = useParams();
    const fetchMovieDetails = async () => {
        const movieDetails = await client.findMovieById(imdbID);
        setMovieDetails(movieDetails);
    };
    useEffect(() => {
        fetchMovieDetails();
    }, []);


    return (
       <div>
        {movieDetails && <h1>{movieDetails.Title}</h1>}
        <ul className="list-group w-75">
                {movieDetails && 
                <oi className="list-group-item">
                { movieDetails && <div className="row">
                    <img
                  src={movieDetails.Poster}
                  alt={movieDetails.Title}
                  className="poster-img col-7"
                />
                <div className="col-5">
                Year : {movieDetails.Year}
                <br></br>
                Rated : {movieDetails.Rated}
                <br></br>
                Realeased : {movieDetails.Released}
                <br></br>
                Runtime : {movieDetails.Runtime}
                <br></br>
                Genre : {movieDetails.Genre}
                <br></br>
                Actors : {movieDetails.Actors}
                <br></br>
                Director : {movieDetails.Director}
                <br></br>
                Writer : {movieDetails.Writer}
                <br></br>
                Writer : {movieDetails.Writer}
                <br></br>
                Plot : {movieDetails.Plot}
                <br></br>
                Language : {movieDetails.Language}
                <br></br>
                Country : {movieDetails.Country}
                <br></br>
                Awards : {movieDetails.Awards}
                </div>
              

                </div>}</oi>
                }
                <oi>
                <ul className="list-group-item"> <h4>Movie Rating :</h4>
        {movieDetails && 

          movieDetails.Ratings.map((rating, index) => (
            <li key={index} className="list-group-item">
              
                <h5>{index + 1 }. {rating.Source} : {rating.Value}</h5>
              
            </li>

          ))}
      </ul>
                </oi>
                
                
            </ul>
        {/* <pre>{JSON.stringify(movieDetails, null, 2)}</pre> */}
    </div> 
    );
    

}

export default SearchMovieDetails;