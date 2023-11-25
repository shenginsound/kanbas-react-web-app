import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
// import axios from "axios";
//import Map from "./map";
import SportsMap from "./map";
import SearchLocationInput from "./searchLocationInput";
import MapComponent from "./searchMap";


// class Search extends React.Component {
//     render() {
//       return (
//         <div>
//           <h1>Google Map with Search</h1>
//           <MapWithSearch />
//         </div>
//       );
//     }
//   }
  
//   export default Search;

function Search(){
    //const [searchTerm, setSearchTerm] = useState("");
    // const navigate = useNavigate();
     // const [results, setResults] = useState(null);
    // const fetchLifeguard = async () =>{
    //     const response = await client.findLifeguard(searchTerm);
    //     setResults(response);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 42.34028766368925,
        lng: -71.08991609747667,
      });

    
    return(
       
            <div style={{ height: "100vh", width: "80%" }}>
              <SearchLocationInput setSelectedLocation={setSelectedLocation} />
              <MapComponent selectedLocation={selectedLocation} />
            </div>
          
        // <>
        //     <h1>Search</h1>

        //     {/* {client.SPORTS_API} */}
        //     {/* () => navigate(`/project/search/${searchTerm}`) */}
        //     <button
        //     // onClick={fetchLifeguard}
        //     className="btn btn-primary float-end">
        //     Search
        //     </button>

        //     <input type="text"
        //     className="form-control w-75 mb-5"
        //     placeholder="Search..."
        //     value={searchTerm}
        //     onChange={(event) => {
        //     setSearchTerm(event.target.value);
        //     }}
        //     />
        //     {/* <pre> {JSON.stringify(results,null,2)}</pre>; */}
        //     {/* <Map/>; */}
        //     <SportsMap/>
            

        // </>

    );

}
export default Search;