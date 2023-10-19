import "./style.css";
import {AiFillCheckCircle} from "react-icons/ai"
import {AiOutlinePlus} from "react-icons/ai"
import {FaEllipsisVertical} from "react-icons/fa6"

function ButtonBoard() {
    const logCollapseAll = () => {
        console.log("Actually collapseALL");
    };
    const  viewProgress = () => {
        console.log("Actually View Progress");
    };
    const  publishAll = () => {
        console.log("Actually publish All");
    };
    const  module = () => {
        console.log("Actually add the module");
    };

        
    return (
        
        
        
              
        <div className="d-flex float-end">
            <button onClick={logCollapseAll} className="btn btn-secondary me-2">
                Collapse ALL
            </button>
            <button onClick={viewProgress} className="btn btn-secondary me-2">
                View Progress
            </button>
            <button onClick={publishAll} className="btn btn-secondary me-2">
                <AiFillCheckCircle className="me-2" style={{color:"green", width:"15px"}}/>
                Publish All
            </button>
            <button onClick={module} className="btn btn-danger me-2">
                <AiOutlinePlus className="me-2" style={{color:"white", width:"15px"}}/>
                module
            </button>
            <button onClick={module} className="btn btn-secondary me-2">
                <FaEllipsisVertical style={{color:"white", width:"15px"}}/>
            
            </button>

            

        </div>
   

    );
}

export default ButtonBoard;
