import * as client from "./client.js"
import React, { useState, useEffect } from "react";

function SearchMovie  () {
    const [title, setTitle] = useState("");



    const fetchMovie = async() => {
        // 
        const results = await client.findWeather();
        console.log(result);
        setResult(results);
        
     }

    // useEffect(() => {
    //     fetchWeather()
    //   }, []);
    

    return(
        <div>
            <h1>SearchWeather</h1>
            <button onClick={fetchWeather}
        className="btn btn-primary float-end">search</button>
            
            <pre>{JSON.stringify(result, null, 2)}</pre>

        </div>

    );

}
export default SearchMovie;