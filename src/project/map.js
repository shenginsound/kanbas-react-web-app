import React,{ useState, useEffect } from "react";
import { APIProvider, Map, Marker} from "@vis.gl/react-google-maps";


function SportsMap() {
    

    const [position, setPosition] = useState(
        {lat:42.34028766368925, lng:-71.08991609747667}
        );

    return(
        
        <APIProvider apiKey="">
            <Map center= {position} zoom={16} style = {{height:"300pt"}}>
                <Marker position ={position}/>

            </Map>
        </APIProvider>
        
        

    );

}
export default SportsMap;
