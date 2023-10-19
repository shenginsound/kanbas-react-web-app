import {Link} from "react-router-dom";
import Nav from "../Nav";
import PathParameters from "./a3/PathParameters";

import Assignment3 from "./a3";
import JavaScript from "./a3/JavaScript";
import Classes from "./a3/Classes";
import Styles from "./a3/Styles";
import ConditionalOutput from "./a3/ConditionalOutput";


function Labs() {
    return(
       <div className="container">
        <ConditionalOutput/>
        <Nav/>
        <Styles/>
         <Assignment3/>
         <JavaScript/>
         <Classes/>
         
         <PathParameters/>
        

       </div>
    );
 }
 export default Labs;