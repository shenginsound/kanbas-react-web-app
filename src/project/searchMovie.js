import * as client from "./client.js"
import React, { useState, useEffect } from "react";
import "./poster.css"
import { Link } from "react-router-dom";

function SearchMovie  () {
    const [title, setTitle] = useState("");
    const [results, setResults] = useState(null);



    const fetchMovie = async() => {
        const results = await client.findMovie(title);
        setResults(results);
        
     }

    // useEffect(() => {
    //     fetchWeather()
    //     fetchMovie()
    //   }, []);
    

    return(
        <div>
            <h1>SearchMovie</h1>
            <button onClick={fetchMovie} className="btn btn-primary float-end">Search</button>
            
            <input type="text"
            placeholder="Search Movie Title Name"
            className="form-control w-75"
            value={title}
            onChange={(event) => {
                setTitle(event.target.value);
            }

            }

            />
            <h2>Results</h2>
            <ul className="list-group w-75">
                {results && 
                
                <oi className="list-group-item">
                    <Link to={`/project/searchMovieDetails/${results.imdbID}`}>
                Title : {results.Title}</Link> </oi>
                }
                { results &&
                    <img
                  src={results.Poster}
                  alt={results.Title}
                  className="poster-img"
                />
                }
                
                
                {results && 
                <oi className="list-group-item"> Year : {results.Year}</oi>
                }
                {results && 
                <oi className="list-group-item"> Rated : {results.Rated}</oi>
                }
                {results && 
                <oi className="list-group-item"> Realeased : {results.Released}</oi>
                }
                {results && 
                <oi className="list-group-item"> Runtime : {results.Runtime}</oi>
                }
                {results && 
                <oi className="list-group-item"> Genre : {results.Genre}</oi>
                }
                
            </ul>



            {/* <pre>{JSON.stringify(results, null, 2)}</pre>  */}
            

        </div>

    );

}
export default SearchMovie;