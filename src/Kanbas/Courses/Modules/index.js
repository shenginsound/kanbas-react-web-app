import ModuleList from "./ModuleList";
import ButtonBoard from "./ButtonBoard";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {BiGlasses} from "react-icons/bi"

function Modules() {
  
  return (
    <div>
    
             
       
        
      <h2 className="mt-3">Modules</h2>
     
  
      
     
              
    
       
      
      <ButtonBoard/>
      <br/>
      <hr></hr>
  
      <ModuleList />
    </div>
  );
}
export default Modules;