import "../Modules/style.css";
import {AiFillCheckCircle} from "react-icons/ai"
import {AiOutlinePlus} from "react-icons/ai"
import {FaEllipsisVertical} from "react-icons/fa6"
import 'bootstrap/dist/css/bootstrap.css';

function AssignButtonBoard() {
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
        <div className="out float-end">
            <button onClick={publishAll} className="btn btn-secondary me-2 float-end">
            <AiOutlinePlus className="me-2" style={{color:"white", width:"15px"}}/>
                Group
            </button>

            
            <button onClick={module} className="btn btn-danger me-2 float-end">
                <AiOutlinePlus className="me-2 " style={{color:"white", width:"15px"}}/>
                Assignment
            </button>
            <button onClick={module} className="btn btn-secondary me-2 float-end">
                <FaEllipsisVertical  style={{color:"white", width:"15px"}}/>
            
            </button>
            
            
            
            

            

        </div>

    );
}

export default AssignButtonBoard;
