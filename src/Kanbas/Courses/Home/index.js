import ModuleList from "../Modules/ModuleList";
import Status from "./Status";
import ButtonBoard from "../Modules/ButtonBoard";
import ToDoList from "./ToDoList";
import "./Stylee.css"
import {BiGlasses} from "react-icons/bi"


function Home() {
  return (
    <div className="d-flex">
        
              
              
        
        <div>
        <h2 className="mt-3">Home</h2>
        <ButtonBoard />
        <br/>
      <hr></hr>
        <ModuleList />

        
      </div>
    
      <div className="ms-5">
        <div>
        <h2 className="mt-3">Status</h2>
        
        <Status />
        </div>
        <div>
        <ToDoList />
        </div>
      </div>
      
    </div>
  );
}
export default Home;